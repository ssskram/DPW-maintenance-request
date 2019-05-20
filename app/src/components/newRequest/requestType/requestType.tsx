import * as React from "react";
import * as types from "../../../store/types";
import * as constants from "./constants";
const maintenance = require("../../../images/maintenance.png");
const officeMove = require("../../../images/move.png");

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};

export default class RequestTypes extends React.Component<props, {}> {

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
          {constants.requestTypes.map(type => {
            return (
              <div className="col-md-6">
                <button
                  className="btn btn-secondary"
                  style={
                    type == this.props.newRequest.requestType
                      ? constants.buttonClicked
                      : constants.buttonWidth
                  }
                  onClick={() =>
                    this.props.updateRequest({ requestType: type })
                  }
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
