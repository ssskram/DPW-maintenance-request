import * as React from "react";
import * as types from "../../../store/types";
import validate from './validate';

type props = {};

export default class Submit extends React.Component<props, {}> {
  render() {
    return (
      <div style={{ margin: "40px 0px" }} className="text-center">
        <button
          disabled={validate()}
          title="Please provide all required data"
          className="btn btn-success"
          style={{ width: "80%", fontSize: "2em" }}
        >
          <span
            className="oswald-header"
            style={{ color: "#383838", letterSpacing: "2px" }}
          >
            Submit
          </span>
        </button>
      </div>
    );
  }
}
