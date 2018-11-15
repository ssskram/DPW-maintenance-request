import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as OpenRequest from '../../../store/openRequest'
import * as AllRequests from '../../../store/allRequests'
import * as Issues from '../../../store/issues'
import * as User from '../../../store/user'
import * as Messages from '../../../store/messages'
import * as types from '../../../store/types'
import Fields from './fields'
import LoadingImage from '../../utilities/loadingImage'
import Modal from 'react-responsive-modal'
import SelectType from '../selectType'
import PostRequest from '../../../functions/postRequest'
import * as moment from 'moment'

const imgStyle = {
    maxHeight: '350px',
    borderRadius: '10px',
    margin: '0 auto'
}

interface actionProps {
    successMessage: () => void,
    errorMessage: () => void,
    updateRequest: (newRequest: types.newRequest) => void,
    clearRequest: () => void,
    addRequest: (request: types.allRequest) => void
}

type props =
    types.openRequest &
    types.issues &
    types.user &
    actionProps

export class Form extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    setType(type) {
        const newRequest = {
            building: this.props.openRequest.building,
            department: this.props.openRequest.department,
            description: this.props.openRequest.description,
            issueType: type,
            issue: this.props.openRequest.issue,
            location: this.props.openRequest.location,
            phone: this.props.openRequest.phone
        }
        this.props.updateRequest(newRequest)
    }

    clearType() {
        const newRequest = {
            building: this.props.openRequest.building,
            department: this.props.openRequest.department,
            description: this.props.openRequest.description,
            issueType: '',
            issue: this.props.openRequest.issue,
            location: this.props.openRequest.location,
            phone: this.props.openRequest.phone
        }
        this.props.updateRequest(newRequest)
    }
    
    postRequest(request, images) {
        PostRequest(request, images, this.props.user)
        // add to store
        this.props.successMessage()
        const storeLoad = {
            cartegraphID: '...loading...',
            building: request.building,
            location: request.location,
            description: request.description,
            department: request.department,
            submitted: moment().format('MM/DD/YYYY'),
            submittedBy: this.props.user,
            status: 'Planned',
            issue: request.issue,
            lastModified: moment().format('MM/DD/YYYY'),
            notes: ''
        }
        this.props.addRequest(storeLoad)
        this.setState({
            redirect: true
        })
    }

    render() {
        const {
            openRequest,
            issues,
            clearRequest
        } = this.props

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
                        <h2>Maintenance request</h2>
                        <hr />
                        <br />
                        <LoadingImage style={imgStyle} src={"https://tools.wprdc.org/images/pittsburgh/facilities/" + openRequest.building.replace(/ /g, "_") + ".jpg"} />
                    </div>
                    <div className='col-md-12 text-center'>
                        <h2>{openRequest.building}</h2>
                        <button className='btn' style={{ fontSize: '18px' }} onClick={this.clearType.bind(this)}>
                            <i>{openRequest.issueType}</i>
                        </button>
                    </div>
                    <div className='col-md-6 col-md-offset-3'>
                        <br />
                        <Fields
                            openRequest={openRequest}
                            issues={issues}
                            clearRequest={clearRequest}
                            postRequest={this.postRequest.bind(this)}
                        />
                    </div>
                </div>
                {openRequest.issueType == '' &&
                    <Modal
                        open={true}
                        onClose={() => clearRequest()}
                        classNames={{
                            overlay: 'custom-overlay',
                            modal: 'custom-modal'
                        }}
                        center>
                        <SelectType setType={this.setType.bind(this)} />
                    </Modal>
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.openRequest,
        ...state.issues,
        ...state.allRequests,
        ...state.user,
        ...state.messages
    }),
    ({
        ...OpenRequest.actionCreators,
        ...Issues.actionCreators,
        ...AllRequests.actionCreators,
        ...User.actionCreators,
        ...Messages.actionCreators
    })
)(Form)