import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as OpenRequest from '../../../store/openRequest'
import * as Issues from '../../../store/issues'
import * as types from '../../../store/types'
import Fields from './fields'
import LoadingImage from '../../utilities/loadingImage'
import Modal from 'react-responsive-modal'
import SelectType from '../selectType'

const imgStyle = {
    maxHeight: '350px',
    borderRadius: '10px',
    margin: '0 auto'
}

interface actionProps {
    updateRequest: (newRequest: types.newRequest) => void,
    clearRequest: () => void
}

type props =
    types.openRequest &
    types.issues &
    actionProps

export class Form extends React.Component<props, {}> {

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
    
    render() {
        const {
            openRequest,
            issues,
            updateRequest,
            clearRequest
        } = this.props

        return (
            <div>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <h1>Maintenance request</h1>
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
                            updateRequest={updateRequest}
                            clearRequest={clearRequest}
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
        ...state.issues
    }),
    ({
        ...OpenRequest.actionCreators,
        ...Issues.actionCreators
    })
)(Form)