import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants";
import * as types from "./types";

const unloadedState = {
  newRequest: {
    requestType: "",
    description: "",
    department: "",
    phone: "",
    // maint request
    maintenanceType: "",
    maintenanceIssue: "",
    building: "",
    location: "",
    image: [],
    // office move
    originFacility: "",
    originLocation: "",
    destinationFacility: "",
    destinationLocation: "",
    name: ""
  } as types.newRequest
};

export const actionCreators = {
  updateRequest: (
    request: types.newRequest
  ): AppThunkAction<any> => dispatch => {
    dispatch({ type: constants.updateRequest, newRequest: request });
  },
  clearRequest: (): AppThunkAction<any> => dispatch => {
    dispatch({ type: constants.clearRequest });
  }
};

export const reducer: Reducer<any> = (
  state: types.newRequest,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.updateRequest:
      return { ...state, newRequest: action.newRequest };
    case constants.clearRequest:
      return unloadedState;
  }
  return state || unloadedState;
};
