import * as React from "react";
import * as constants from "./constants";
import * as types from "../../../store/types";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};

export default class MaintenanceTypes extends React.Component<props, {}> {
  render() {
    return (
      <div style={{ margin: "60px 0px" }}>
        <h3 className="text-center" style={{ color: "#fff" }}>
          What's giving you problems?
        </h3>
        <div className="panel">
          <div className="panel-body">
            {constants.maintenanceTypes.map((type, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <button
                    className="btn btn-secondary"
                    style={
                      type == this.props.newRequest.maintenanceType
                        ? constants.buttonClicked
                        : constants.buttonWidth
                    }
                    onClick={() =>
                      this.props.updateRequest({ maintenanceType: type })
                    }
                  >
                    <div style={{ fontSize: "1.2em" }}>{type}</div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
