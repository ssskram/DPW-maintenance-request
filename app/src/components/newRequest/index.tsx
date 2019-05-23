import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import HydrateStore from "../utilities/hydrateStore";
import * as types from "../../store/types";
import * as newRequest from "../../store/newRequest";
import * as facilities from "../../store/facilities";
import * as allRequests from "../../store/allRequests";
import * as issues from "../../store/issues";
import * as messages from "../../store/messages";
import RequestType from "./requestType";
import RequestLocation from "./requestLocation";
import RequestDescription from "./requestDescription";
import displayComponent from "./config/displayComponent";
import Submit from "./submit";

type props = {
  newRequest: types.newRequest;
  facilities: types.facility[];
  allRequests: types.request[];
  issues: types.issue[];
  message: types.message;
  updateRequest: (updatedOrder: types.newRequest) => void;
  addRequest: (storeLoad: types.request) => void;
  clearRequest: () => void;
  successMessage: () => void;
  errorMessage: () => void;
  clearMessage: () => void;
};

export class Request extends React.Component<props, {}> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // reset data here when certain fields change
  componentDidUpdate(nextProps: props) {
    const prevReq = this.props.newRequest;
    const newReq = nextProps.newRequest;
    // clear maintenance issue when maintenance type changes
    if (
      prevReq.maintenanceType != "" &&
      prevReq.maintenanceType != newReq.maintenanceType
    ) {
      this.handleUpdate({ maintenanceIssue: "" });
    }
    // clear state when request type changes
    if (
      prevReq.requestType != "" &&
      prevReq.requestType != newReq.requestType
    ) {
      this.handleUpdate({
        description: "",
        department: "",
        phone: "",
        location: "",
        image: [],
        // maint request
        maintenanceType: "",
        maintenanceIssue: "",
        building: "",
        // office move
        originFacility: "",
        originLocation: "",
        destinationFacility: "",
        destinationLocation: "",
        name: "",
        // construction request
        latLng: undefined
      });
    }
  }

  handleUpdate(data) {
    // first, make a copy of the current store
    let state: types.newRequest = Object.assign({}, this.props.newRequest);
    // mutate with new data
    Object.assign(state, data);
    // update store
    this.props.updateRequest(state);
  }

  render() {
    return (
      <div style={{ marginBottom: "100px" }}>
        <HydrateStore />
        <RequestType
          newRequest={this.props.newRequest}
          issues={this.props.issues}
          updateRequest={this.handleUpdate.bind(this)}
          message={this.props.message}
        />
        {displayComponent(this.props.newRequest, "location") && (
          <RequestLocation
            newRequest={this.props.newRequest}
            facilities={this.props.facilities}
            requests={this.props.allRequests}
            updateRequest={this.handleUpdate.bind(this)}
            clearRequest={this.props.clearRequest.bind(this)}
          />
        )}
        {displayComponent(this.props.newRequest, "dataFields") && (
          <RequestDescription
            newRequest={this.props.newRequest}
            issues={this.props.issues}
            facilities={this.props.facilities}
            updateRequest={this.handleUpdate.bind(this)}
          />
        )}
        {this.props.newRequest.requestType != "" && (
          <Submit
            newRequest={this.props.newRequest}
            addRequest={this.props.addRequest.bind(this)}
            success={this.props.successMessage.bind(this)}
            failure={this.props.errorMessage.bind(this)}
            clearRequest={this.props.clearRequest.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.newRequest,
    ...state.facilities,
    ...state.allRequests,
    ...state.issues,
    ...state.messages
  }),
  {
    ...newRequest.actionCreators,
    ...facilities.actionCreators,
    ...allRequests.actionCreators,
    ...issues.actionCreators,
    ...messages.actionCreators
  }
)(Request as any);
