
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.facilities = {
    facilities: []
}

export const actionCreators = {
    loadFacilities: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://cartegraphapi.azurewebsites.us/facilities/allFacilities", {
            method: 'get',
            headers: new Headers({
              'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
            })
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
            dispatch({ type: constants.loadFacilities, facilities: data });
        })
    }
}

export const reducer: Reducer<types.facilities> = (state: types.facilities, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadFacilities:
            return { ...state, facilities: action.facilities }
    }
    return state || unloadedState
}