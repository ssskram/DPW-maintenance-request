import * as React from "react";
import * as types from "../../../store/types";
import RequestTypes from "./requestType";
import MaintenanceTypes from "./maintenanceType";
import displayComponent from "../config/displayComponent";
import { SpeechBubble } from "react-kawaii";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};

export default class RequestType extends React.Component<props, {}> {
  render() {
    return (
      <div>
        <h1 className="text-center" style={{ color: "#fff" }}>
        <SpeechBubble size={170} mood="happy" color="#fff" />
          How can we help?
        </h1>
        <RequestTypes
          newRequest={this.props.newRequest}
          updateRequest={this.props.updateRequest.bind(this)}
        />
        {displayComponent(this.props.newRequest, "maintenanceTypes") && (
          <MaintenanceTypes
            newRequest={this.props.newRequest}
            updateRequest={this.props.updateRequest.bind(this)}
          />
        )}
      </div>
    );
  }
}
