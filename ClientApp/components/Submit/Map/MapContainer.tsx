import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as FacilitiesStore from '../../../store/facilities';
import * as Ping from '../../../store/ping';
import * as Key from '../../../store/keys';
import Map from './Map'

export class MapContainer extends React.Component<any, any> {

    componentDidMount() {
        // ping server
        this.props.ping()

        // hit facilities store
        this.props.requestAllFacilities()
    }

    public render() {
        return (
            <div>
                <Map facilities={this.props.facilities} key={this.props.key} />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.facility,
        ...state.ping,
        ...state.key
    }),
    ({
        ...FacilitiesStore.actionCreators,
        ...Ping.actionCreators,
        ...Key.actionCreators
    })
  )(MapContainer as any) as typeof MapContainer;