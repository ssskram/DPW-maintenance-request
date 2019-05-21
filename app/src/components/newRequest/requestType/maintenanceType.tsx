import * as React from "react";
import * as constants from "./constants";
import * as types from "../../../store/types";
import SectionHeader from "../shared/sectionHeader";

type props = {
  newRequest: types.newRequest;
  issues: types.issue[];
  updateRequest: (newData: object) => void;
};

export default class MaintenanceTypes extends React.Component<props, {}> {
  render() {
    const unique = [...new Set(this.props.issues.map(item => item.type))];
    return (
      <div style={{ margin: "60px 0px" }}>
        <SectionHeader header="What's giving you problems?" />
        <div className="panel">
          <div className="panel-body">
            {unique
              .filter(i => i != "")
              .map((type, index) => {
                return (
                  <div className="col-md-6" key={index}>
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
