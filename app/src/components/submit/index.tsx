
import * as React from "react";
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from './../../store/types'
import * as facilities from '../../store/facilities'
import * as allRequests from '../../store/allRequests'
import * as openRequest from '../../store/openRequest'
import SelectFacility from './selectFacility/map'
import Spinner from './../utilities/spinner'
import SubmitRequest from './submitRequest'
import SelectType from './selectType'

type props =
    types.facilities &
    types.allRequests &
    types.openRequest

type state = {
    issueType: string
}

export class Submit extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            issueType: ''
        }
    }

    setType(type) {
        console.log('here')
        console.log('type')
        this.setState({
            issueType: type
        })
    }

    render() {
        const {
            facilities,
            openRequest
        } = this.props

        const {
            issueType
        } = this.state

        return (
            <div>
                {openRequest.building == '' &&
                    <SelectFacility facilities={facilities} />
                }
                {openRequest.building != '' && issueType == '' &&
                    <SelectType setType={this.setType.bind(this)} />
                }
                {openRequest.building != '' && issueType != '' &&
                    <SubmitRequest issueType={issueType} />
                }
                {facilities.length == 0 &&
                    <Spinner notice='...loading the facilities...' />
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.facilities,
        ...state.openRequest,
        ...state.allRequests
    }),
    ({
        ...facilities.actionCreators,
        ...openRequest.actionCreators,
        ...allRequests.actionCreators
    })
)(Submit)