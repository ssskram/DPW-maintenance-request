import * as React from "react";
import * as constants from "./constants";

type props = {};

export default class SubType extends React.Component<props, {}> {
  render() {
    return (
      <div className="panel">
        <div className="panel-body">
          {constants.issues.map(issue => {
            return (
              <div className="col-md-4">
                <button
                  className="btn btn-secondary"
                  style={constants.buttonWidth}
                >
                  <div style={{ fontSize: "1.2em" }}>{issue}</div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
