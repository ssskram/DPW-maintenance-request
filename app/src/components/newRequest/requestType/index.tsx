import * as React from "react";
import * as types from "../../../store/types";
import RequestTypes from "./requestType";
import MaintenanceTypes from "./maintenanceType";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};

export default class RequestType extends React.Component<props, {}> {
  render() {
    return (
      <div>
        <h1 className="text-center" style={{ color: "#fff" }}>
          What can we help you with?
        </h1>
        <RequestTypes
          newRequest={this.props.newRequest}
          updateRequest={this.props.updateRequest.bind(this)}
        />
        {this.props.newRequest.requestType == "Maintenance Request" && (
          <MaintenanceTypes
            newRequest={this.props.newRequest}
            updateRequest={this.props.updateRequest.bind(this)}
          />
        )}
      </div>
    );
  }
}
