import * as user from './user'
import * as types from './types'
import * as facilities from './facilities'
import * as myRequests from './myRequests'
import * as activeRequest from './activeRequest'
import * as issues from './issues'

export interface ApplicationState {
    user: types.user,
    facilities: types.facilities,
    myRequests: types.requests,
    activeRequest: types.newRequest,
    issues: types.issues
}

export const reducers = {
    user: user.reducer,
    facilities: facilities.reducer,
    myRequests: myRequests.reducer,
    activeRequest: activeRequest.reducer,
    issues: issues.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}