
import * as React from "react";
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from './../../store/types'
import * as facilities from '../../store/facilities'
import Map from './map'

interface actionProps {
    loadFacilities: () => void
}

type props = types.facilities & actionProps

export class map extends React.Component<props, any> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadFacilities()
    }

    render() {
        const {
            facilities
        } = this.props

        return (
            <div>
                <Map facilities={facilities} />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.facilities
    }),
    ({
        ...facilities.actionCreators
    })
)(map);