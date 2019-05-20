import * as React from "react";
import * as types from "../../../store/types";
import * as constants from "./constants";
const maintenance = require("../../../images/maintenance.png");
const officeMove = require("../../../images/move.png");

type props = {};

export default class PrimaryType extends React.Component<props, {}> {
  setIcon = type => {
    if (type == "Maintenance Request") {
      return maintenance;
    } else if (type == "Office Move") {
      return officeMove;
    } else return null;
  };

  render() {
    return (
      <div className="panel">
        <div className="panel-body">
          {constants.types.map(type => {
            return (
              <div className="col-md-6">
                <button
                  className="btn btn-secondary"
                  style={constants.buttonWidth}
                >
                  <h3 className="oswald">{type}</h3>
                  <img src={this.setIcon(type)} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
