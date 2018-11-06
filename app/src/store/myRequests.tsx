
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.requests = {
    requests: []
}

export const actionCreators = {
    loadMyRequests: (user): AppThunkAction<any> => (dispatch) => {
        fetch("https://cartegraphapi.azurewebsites.us/maintenanceRequests/myRequests?user=" + user, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadRequests, requests: data })
            })
    },
    addRequest: (request): AppThunkAction<any> => (dispatch) => {
        dispatch({ type: constants.addRequest, request: request })
    }
}

export const reducer: Reducer<types.requests> = (state: types.requests, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadRequests:
            return { ...state, requests: action.requests }
        case constants.addRequest:
            return { ...state } // concat request to store here
    }
    return state || unloadedState
}