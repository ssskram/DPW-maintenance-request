import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FacilitiesStore from '../store/facilities';
import * as MyRequestsStore from '../store/myRequests';
import * as AllRequestsStore from '../store/allRequests';
import * as IssuesStore from '../store/issues';

type AllProps = 
MyRequestsStore.MyRequestsState & 
AllRequestsStore.AllRequestsState &
FacilitiesStore.FacilitiesState & 
IssuesStore.IssuesState & 
typeof MyRequestsStore.actionCreators & 
typeof AllRequestsStore.actionCreators & 
typeof FacilitiesStore.actionCreators & 
typeof IssuesStore.actionCreators & RouteComponentProps<{}>; 

export class Home extends React.Component<AllProps, {}> {
    componentDidMount() {
        this.props.requestAllFacilities()
        this.props.requestMyRequests()
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
    (state: ApplicationState) => ({...state.myRequests, ...state.allRequests, ...state.facility, ...state.issues }), 
    ({...MyRequestsStore.actionCreators, ...AllRequestsStore.actionCreators, ...FacilitiesStore.actionCreators, ...IssuesStore.actionCreators })     
  )(Home as any) as typeof Home;