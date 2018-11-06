
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState = {
    openRequest: {
        building: '',
        issue: '',
        description: '',
        department: '',
        location: '',
        phone: ''
    }
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
            return { ...state, openRequest: unloadedState }
    }
    return state || unloadedState
}