import * as React from "react";
import * as types from "../../../store/types";
import Types from "./selectType";
import Issues from "./selectIssue";

type props = {};

export default class RequestType extends React.Component<props, {}> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <h1 className="text-center" style={{ color: "#fff" }}>
          What can we help you with?
        </h1>
        <Types />
        <Issues />
      </div>
    );
  }
}
