import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import HydrateStore from "../utilities/hydrateStore";
import * as types from "../../store/types";
import * as newRequest from "../../store/newRequest";
import RequestType from "./requestType";
import RequestLocation from "./requestLocation";
import RequestDescription from "./requestDescription";
import displayComponent from "./config/displayComponent";

type props = {
  newRequest: types.newRequest;
  updateRequest: (updatedOrder: types.newRequest) => void;
};

export class Request extends React.Component<props, {}> {
  componentDidMount() {
    window.scrollTo(0, 0);
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
      <div>
        <HydrateStore />
        <RequestType
          newRequest={this.props.newRequest}
          updateRequest={this.handleUpdate.bind(this)}
        />
        {displayComponent(this.props.newRequest, "location") && (
          <RequestLocation
            newRequest={this.props.newRequest}
            updateRequest={this.handleUpdate.bind(this)}
          />
        )}
        {displayComponent(this.props.newRequest, "dataFields") && (
          <RequestDescription
            newRequest={this.props.newRequest}
            updateRequest={this.handleUpdate.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.newRequest
  }),
  {
    ...newRequest.actionCreators
  }
)(Request as any);
