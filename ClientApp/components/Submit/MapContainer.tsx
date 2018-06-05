import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as FacilitiesStore from '../../store/facilities';
import Map from './Map'

type AllProps = FacilitiesStore.FacilitiesState & typeof FacilitiesStore.actionCreators & RouteComponentProps<{}>; 

export class MapContainer extends React.Component<AllProps, any> {
    componentDidMount() {
        this.props.requestAllFacilities()
    }

    public render() {
        return (
            <div>
                <Map facilities={this.props.facilities} />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.facility, 
    FacilitiesStore.actionCreators    
  )(MapContainer as any) as typeof MapContainer;