
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const openRequest = {
    building: '',
    issueType: '',
    issue: '',
    description: '',
    department: '',
    location: '',
    phone: ''
}

const unloadedState = {
    openRequest: openRequest
} as types.openRequest

export const actionCreators = {
    updateRequest: (request): AppThunkAction<any> => (dispatch) => {
        dispatch({ type: constants.updateRequest, openRequest: request })
    },
    clearRequest: (): AppThunkAction<any> => (dispatch) => {
        dispatch({ type: constants.clearRequest })
    }
}

export const reducer: Reducer<types.openRequest> = (state: types.openRequest, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.updateRequest:
            return { ...state, openRequest: action.openRequest }
        case constants.clearRequest:
            return { ...state, openRequest: openRequest }
    }
    return state || unloadedState
}