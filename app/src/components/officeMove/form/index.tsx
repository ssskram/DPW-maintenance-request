import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as User from '../../../store/user'
import * as Messages from '../../../store/messages'
import * as AllRequests from '../../../store/allRequests'
import * as Facilities from '../../../store/facilities'
import * as types from '../../../store/types'
import Fields from './fields'
import PostRequest from '../../../functions/postRequest'
import * as moment from 'moment'

interface actionProps {
    successMessage: () => void,
    errorMessage: () => void,
    addRequest: (request: types.allRequest) => void
}

type props =
    types.facilities &
    types.user &
    actionProps

export class Form extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    async postRequest(request, image) {
        const success = await PostRequest(request, image, this.props.user)
        if (success == true) {
            this.props.successMessage()
            // add to store
            const storeLoad = {
                cartegraphID: '...loading...',
                building: request.building,
                location: request.location,
                description: request.description,
                department: request.department,
                submitted: moment().format('MM/DD/YYYY'),
                submittedBy: this.props.user,
                status: 'Planned',
                issue: 'Office Move',
                lastModified: moment().format('MM/DD/YYYY'),
                notes: ''
            }
            this.props.addRequest(storeLoad)
            this.setState({
                redirect: true
            })
        } else {
            this.props.errorMessage()
            this.setState({
                redirect: true
            })
        }
    }

    render() {

        const {
            redirect
        } = this.state

        if (redirect) {
            return <Redirect push to={'/MyRequests'} />
        }

        return (
            <div>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <h2>Request an Office Move</h2>
                        <hr />
                    </div>
                    <div className='col-md-12'>
                        <br />
                        <Fields
                            facilities={this.props.facilities}
                            postRequest={this.postRequest.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.messages,
        ...state.allRequests,
        ...state.facilities
    }),
    ({
        ...User.actionCreators,
        ...Messages.actionCreators,
        ...AllRequests.actionCreators,
        ...Facilities.actionCreators
    })
)(Form)