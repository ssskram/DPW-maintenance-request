import * as React from "react";
import * as types from "../../../store/types";

type props = {};

export default class Submit extends React.Component<props, {}> {
  render() {
    return (
      <div
        style={{ margin: "40px 0px" }}
        className="text-center"
      >
        <button
          className="btn btn-success"
          style={{ width: "80%", fontSize: "2em" }}
        >
          Submit
        </button>
      </div>
    );
  }
}
