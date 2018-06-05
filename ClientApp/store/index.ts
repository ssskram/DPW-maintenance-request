import * as Facility from './facilities';
import * as Requests from './requests';

export interface ApplicationState {
    facility: Facility.FacilitiesState;
    requests: Requests.RequestsState;
}

export const reducers = {
    facility: Facility.reducer,
    requests: Requests.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
