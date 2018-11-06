
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.issues = {
    issues: []
}

export const actionCreators = {
    loadIssues: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://cartegraphapi.azurewebsites.us/maintenanceRequests/allIssues", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadIssues, issues: data });
            })
    }
}

export const reducer: Reducer<types.issues> = (state: types.issues, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadIssues:
            return { ...state, issues: action.issues }
    }
    return state || unloadedState
}