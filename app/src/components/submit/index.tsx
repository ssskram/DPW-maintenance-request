
import * as React from "react";
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from './../../store/types'
import * as facilities from '../../store/facilities'
import * as issues from '../../store/issues'
import * as allRequests from '../../store/allRequests'
import * as openRequest from '../../store/openRequest'
import SelectFacility from './selectFacility/map'
import Spinner from './../utilities/spinner'
import HydrateStore from './../utilities/hydrateStore'
import SubmitRequest from './submitRequest/form'

type props = types.facilities & types.allRequests & types.openRequest

export class submit extends React.Component<props, any> {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(props) {
        console.log(props)
    }

    render() {
        const {
            facilities,
            openRequest
        } = this.props

        return (
            <div>
                <HydrateStore />
                {openRequest.building == '' &&
                    <SelectFacility facilities={facilities} />
                }
                {openRequest.building != '' &&
                    <SubmitRequest openRequest={openRequest} />
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
        ...state.issues,
        ...state.openRequest,
        ...state.allRequests
    }),
    ({
        ...facilities.actionCreators,
        ...issues.actionCreators,
        ...openRequest.actionCreators,
        ...allRequests.actionCreators
    })
)(submit)