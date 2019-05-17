// hydrates the wholeeeeee store

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as facilities from "../../store/facilities";
import * as allRequests from "../../store/allRequests";
import * as issues from "../../store/issues";
import * as user from "../../store/user";
import { loadAllRequests } from "src/store/constants";

type props = {
  loadUser: () => void;
  loadFacilities: () => void;
  loadIssues: () => void;
  loadAllRequests: () => void;
};

class Hydrate extends React.Component<props, {}> {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadFacilities();
    this.props.loadIssues();
    this.props.loadAllRequests();
  }

  public render() {
    return null;
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.facilities,
    ...state.issues,
    ...state.user,
    ...state.allRequests
  }),
  {
    ...facilities.actionCreators,
    ...issues.actionCreators,
    ...user.actionCreators,
    ...allRequests.actionCreators
  }
)(Hydrate as any);
