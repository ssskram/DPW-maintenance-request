import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as allRequests from "../../store/allRequests";
import * as types from "./../../store/types";
import * as user from "../../store/user";
import * as messages from "../../store/messages";
import Requests from "./requests";
import Messages from "../utilities/messages";

type props = {
  allRequests: types.request[];
  user: types.user;
  clearMessage: () => void;
};


export class MyRequests extends React.Component<props, {}> {

  render() {
    return (
      <div>
        <Messages />
        <Requests
          collection="My"
          allRequests={this.props.allRequests}
          user={this.props.user}
        />
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.allRequests,
    ...state.user,
    ...state.messages
  }),
  {
    ...allRequests.actionCreators,
    ...user.actionCreators,
    ...messages.actionCreators
  }
)(MyRequests);
