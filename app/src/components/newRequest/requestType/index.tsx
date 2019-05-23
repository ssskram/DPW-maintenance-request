import * as React from "react";
import * as types from "../../../store/types";
import RequestTypes from "./requestType";
import MaintenanceTypes from "./maintenanceType";
import displayComponent from "../config/displayComponent";
import { SpeechBubble } from "react-kawaii";
import Messages from "../../utilities/messages";

type props = {
  newRequest: types.newRequest;
  issues: types.issue[];
  updateRequest: (newData: object) => void;
  message: types.message;
};

export default class RequestType extends React.Component<props, {}> {
  mood() {
    switch (true) {
      case this.props.message.includes("Oops"):
        return "ko";
      case this.props.message.includes("Success"):
        return "excited";
      default:
        return "happy";
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-center" style={{ color: "#fff" }}>
          <SpeechBubble size={170} mood={this.mood()} color="#fff" />
          {this.props.message ? <Messages /> : <div>How can we help?</div>}
        </h1>
        <RequestTypes
          newRequest={this.props.newRequest}
          updateRequest={this.props.updateRequest.bind(this)}
        />
        {displayComponent(this.props.newRequest, "maintenanceTypes") && (
          <MaintenanceTypes
            newRequest={this.props.newRequest}
            issues={this.props.issues}
            updateRequest={this.props.updateRequest.bind(this)}
          />
        )}
      </div>
    );
  }
}
