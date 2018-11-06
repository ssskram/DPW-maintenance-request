
import * as React from "react";
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from './../../store/types'
import * as facilities from '../../store/facilities'
import * as issues from '../../store/issues'
import * as myRequests from '../../store/myRequests'
import Map from './map'
import Spinner from './../utilities/spinner'
import HydrateStore from './../utilities/hydrateStore'

interface actionProps {
    loadFacilities: () => void
}

type props = types.facilities & actionProps

export class map extends React.Component<props, any> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    render() {
        const {
            facilities
        } = this.props

        return (
            <div>
                <HydrateStore />
                {facilities.length == 0 &&
                    <Spinner notice='...loading the facilities...' />
                }
                <Map facilities={facilities} />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.facilities,
        ...state.issues,
        ...state.myRequests
    }),
    ({
        ...facilities.actionCreators,
        ...issues.actionCreators,
        ...myRequests.actionCreators
    })
)(map)