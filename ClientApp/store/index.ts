import * as Facility from './facilities';
import * as allRequests from './allRequests';
import * as myRequests from './myRequests';
import * as Issues from './issues';

export interface ApplicationState {
    facility: Facility.FacilitiesState;
    allRequests: allRequests.AllRequestsState;
    myRequests: myRequests.MyRequestsState;
    issues: Issues.IssuesState;
}

export const reducers = {
    facility: Facility.reducer,
    allRequests: allRequests.reducer,
    myRequests: myRequests.reducer,
    issues: Issues.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
