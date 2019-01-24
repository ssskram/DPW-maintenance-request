
import * as React from "react";
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from './../../store/types'
import * as facilities from '../../store/facilities'
import * as openRequest from '../../store/openRequest'
import SelectFacility from './selectFacility'
import Spinner from './../utilities/spinner'
import SubmitRequest from './submitRequest'

interface actionProps {
    clearRequest: () => void
}

type props =
    types.facilities &
    types.openRequest &
    actionProps

export class MaintenanceRequest extends React.Component<props, {}> {

    componentDidMount() {
        this.props.clearRequest()
    }

    render() {
        const {
            facilities,
            openRequest
        } = this.props

        return (
            <div>
                {openRequest.building == '' &&
                    <SelectFacility facilities={facilities} />
                }
                {openRequest.building != '' &&
                    <SubmitRequest />
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
        ...state.openRequest
    }),
    ({
        ...facilities.actionCreators,
        ...openRequest.actionCreators
    })
)(MaintenanceRequest)