
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.allRequests = {
    allRequests: []
}

export const actionCreators = {
    loadAllRequests: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://cartegraphapi.azurewebsites.us/maintenanceRequests/allRequests", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadAllRequests, allRequests: data })
            })
    }
}

export const reducer: Reducer<types.allRequests> = (state: types.allRequests, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadAllRequests:
            return { ...state, allRequests: action.allRequests }
    }

    return state || unloadedState
}