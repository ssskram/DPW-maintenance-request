import * as React from "react";
import * as types from "../../../store/types";
import SectionHeader from "../shared/sectionHeader";
import MaintenanceRequest from "./maintenanceRequest";
import OfficeMove from "./officeMoves";

type props = {
  newRequest: types.newRequest;
  issues: types.issue[]
  updateRequest: (newData: object) => void;
};

export default class RequestDescription extends React.Component<props, {}> {
  render() {
    return (
      <div style={{ margin: "60px 0px" }}>
        <SectionHeader header="Please provide additional information" />
        <div className="panel">
          <div className="panel-body">
            {this.props.newRequest.requestType == "Maintenance Request" && (
              <MaintenanceRequest
                newRequest={this.props.newRequest}
                issues={this.props.issues}
                updateRequest={this.props.updateRequest}
              />
            )}
            {this.props.newRequest.requestType == "Office Move" && (
              <OfficeMove
                newRequest={this.props.newRequest}
                updateRequest={this.props.updateRequest}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
