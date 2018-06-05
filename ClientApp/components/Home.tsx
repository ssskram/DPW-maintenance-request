import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FacilitiesStore from '../store/facilities';
import * as RequestsStore from '../store/requests';
import * as IssuesStore from '../store/issues';

type AllProps = RequestsStore.RequestsState & FacilitiesStore.FacilitiesState & IssuesStore.IssuesState & typeof RequestsStore.actionCreators & typeof FacilitiesStore.actionCreators & typeof IssuesStore.actionCreators & RouteComponentProps<{}>; 

export class Home extends React.Component<AllProps, {}> {
    componentDidMount() {
        this.props.requestAllFacilities()
        this.props.requestAllRequests()
        this.props.requestAllIssues()
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
    (state: ApplicationState) => ({...state.requests, ...state.facility, ...state.issues }), 
    ({...RequestsStore.actionCreators, ...FacilitiesStore.actionCreators, ...IssuesStore.actionCreators })     
  )(Home as any) as typeof Home;