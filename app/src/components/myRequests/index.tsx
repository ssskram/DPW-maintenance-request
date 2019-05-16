import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import HydrateStore from "../utilities/hydrateStore";
import * as types from "../../store/types";
import Spinner from "../utilities/spinner";

type props = {};

export class MyRequests extends React.Component<props, {}> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <HydrateStore />
        <div className="panel">
          <div className="panel-body">
            <h1>My Requests here</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({}),
  {}
)(MyRequests as any);
