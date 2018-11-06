
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.newRequest = {
    building: '',
    issue: '',
    description: '',
    department: '',
    location: '',
    phone: ''
}

export const actionCreators = {
    updateRequest: (request): AppThunkAction<any> => (dispatch) => {
        dispatch({ type: constants.updateRequest, request: request })
    },
    clearRequest: (): AppThunkAction<any> => (dispatch) => {
        dispatch({ type: constants.clearRequest })
    }
}

export const reducer: Reducer<types.newRequest> = (state: types.newRequest, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.updateRequest:
            return { ...state, request: action.request }
        case constants.addRequest:
            return { ...state, request: unloadedState }
    }
    return state || unloadedState
}