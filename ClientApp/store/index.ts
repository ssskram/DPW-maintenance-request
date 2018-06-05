import * as Facility from './facilities';

export interface ApplicationState {
    facility: Facility.FacilitiesState;
}

export const reducers = {
    facility: Facility.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
