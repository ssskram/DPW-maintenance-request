
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.department = {
    department: ''
}

export const actionCreators = {
    setDepartment: (dept): AppThunkAction<any> => (dispatch) => {
        dispatch({ type: constants.loadDepartment, department: dept });
    }
}

export const reducer: Reducer<types.department> = (state: types.department, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadDepartment:
            return { ...state, department: action.department }
    }
    return state || unloadedState
}