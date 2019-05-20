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
      <div className="panel">
        <div className="panel-body">
          {constants.maintenanceTypes.map(issue => {
            return (
              <div className="col-md-4">
                <button
                  className="btn btn-secondary"
                  style={constants.buttonWidth}
                  onClick={() =>
                    this.props.updateRequest({ maintenanceType: issue })
                  }
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
