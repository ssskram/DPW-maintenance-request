import * as user from './user'
import * as types from './types'
import * as facilities from './facilities'

export interface ApplicationState {
    user: types.user,
    facilities: types.facilities
}

export const reducers = {
    user: user.reducer,
    facilities: facilities.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}