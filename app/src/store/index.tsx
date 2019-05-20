import * as user from "./user";
import * as types from "./types";
import * as facilities from "./facilities";
import * as allRequests from "./allRequests";
import * as newRequest from "./newRequest";
import * as issues from "./issues";
import * as messages from "./messages";

export interface ApplicationState {
  user: types.user;
  facilities: types.facilities;
  allRequests: types.allRequests;
  newRequest: types.newRequest;
  issues: types.issues;
  messages: types.messsage;
}

export const reducers = {
  user: user.reducer,
  facilities: facilities.reducer,
  allRequests: allRequests.reducer,
  newRequest: newRequest.reducer,
  issues: issues.reducer,
  messages: messages.reducer
};

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
