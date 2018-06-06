import * as Facility from './facilities';
import * as allRequests from './allRequests';
import * as myRequests from './myRequests';
import * as Issues from './issues';
import * as Messages from './messages';

export interface ApplicationState {
    facility: Facility.FacilitiesState;
    allRequests: allRequests.AllRequestsState;
    myRequests: myRequests.MyRequestsState;
    issues: Issues.IssuesState;
    messages: Messages.MessageState;
}

export const reducers = {
    facility: Facility.reducer,
    allRequests: allRequests.reducer,
    myRequests: myRequests.reducer,
    issues: Issues.reducer,
    messages: Messages.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
