import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FacilitiesStore from '../store/facilities';
import * as RequestsStore from '../store/requests';

type AllProps = RequestsStore.RequestsState & FacilitiesStore.FacilitiesState & typeof RequestsStore.actionCreators & typeof FacilitiesStore.actionCreators & RouteComponentProps<{}>; 

export class Home extends React.Component<AllProps, {}> {
    componentDidMount() {
        this.props.requestAllFacilities()
        this.props.requestAllRequests()
    }

    public render() {
        return (
            <div>
                <h1>make this nice</h1>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({...state.requests, ...state.facility }), 
    ({...RequestsStore.actionCreators, ...FacilitiesStore.actionCreators })     
  )(Home as any) as typeof Home;