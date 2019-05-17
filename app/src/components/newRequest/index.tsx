import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import HydrateStore from "../utilities/hydrateStore";
import * as types from "../../store/types";
import Spinner from "../utilities/spinner";
import RequestType from "./requestType";
import RequestLocation from "./requestLocation";
import RequestDescription from "./requestDescription";

type props = {};

export class Home extends React.Component<props, {}> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <HydrateStore />
        <RequestType />
        <RequestLocation />
        <RequestDescription />
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({}),
  {}
)(Home as any);