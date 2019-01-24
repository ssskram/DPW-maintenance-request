
import * as React from "react";
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from './../../store/types'
import * as facilities from '../../store/facilities'
import * as openRequest from '../../store/openRequest'
import Spinner from './../utilities/spinner'
import HydrateStore from '../utilities/hydrateStore'
import Form from './form'

interface actionProps {
    clearRequest: () => void
}

type props =
    types.facilities &
    types.openRequest &
    actionProps

export class OfficeMove extends React.Component<props, any> {

    componentDidMount() {
        this.props.clearRequest()
    }

    render() {
        const {
            facilities,
        } = this.props

        return (
            <div>
                <HydrateStore />
                {facilities.length == 0 &&
                    <Spinner notice='...loading the facilities...' />
                }
                <Form />
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
)(OfficeMove)