import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as allRequests from "../../store/allRequests";
import * as types from "./../../store/types";
import * as user from "../../store/user";
import Requests from "./requests";

type props = {
  allRequests: types.request[];
  user: types.user;
};

export class MyRequests extends React.Component<props, {}> {
  render() {
    return (
      <Requests
        collection="My"
        allRequests={this.props.allRequests}
        user={this.props.user}
      />
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.allRequests,
    ...state.user
  }),
  {
    ...allRequests.actionCreators,
    ...user.actionCreators
  }
)(MyRequests);
