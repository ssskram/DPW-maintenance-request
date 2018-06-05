import * as Facility from './facilities';
import * as Requests from './requests';
import * as Issues from './issues';

export interface ApplicationState {
    facility: Facility.FacilitiesState;
    requests: Requests.RequestsState;
    issues: Issues.IssuesState;
}

export const reducers = {
    facility: Facility.reducer,
    requests: Requests.reducer,
    issues: Issues.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
