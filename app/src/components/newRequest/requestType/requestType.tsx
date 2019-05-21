import * as React from "react";
import * as types from "../../../store/types";
import * as constants from "./constants";
import * as config from "../config/settings";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};

export default class RequestTypes extends React.Component<props, {}> {
  render() {
    return (
      <div className="panel" style={{ marginBottom: "60px" }}>
        <div className="panel-body">
          {config.requestTypes.map((type, index) => {
            return (
              <div className="col-md-6" key={index}>
                <button
                  className="btn btn-secondary"
                  style={
                    type.value == this.props.newRequest.requestType
                      ? constants.buttonClicked
                      : constants.buttonWidth
                  }
                  onClick={() =>
                    this.props.updateRequest({ requestType: type.value })
                  }
                >
                  <h3 className="oswald">{type.label}</h3>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
