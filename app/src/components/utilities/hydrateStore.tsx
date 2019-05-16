// hydrates the wholeeeeee store

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as user from "../../store/user";

type props = {
  loadUser: () => void;
};

class Hydrate extends React.Component<props, {}> {
  componentDidMount() {
    this.props.loadUser();
  }

  public render() {
    return null;
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.user
  }),
  {
    ...user.actionCreators
  }
)(Hydrate as any);
