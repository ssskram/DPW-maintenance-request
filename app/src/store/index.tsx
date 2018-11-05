import * as user from './user'
import * as types from './types'

export interface ApplicationState {
    user: types.user
}

export const reducers = {
    user: user.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}