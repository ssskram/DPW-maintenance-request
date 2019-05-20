import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import HydrateStore from "../utilities/hydrateStore";
import * as types from "../../store/types";
import * as newRequest from "../../store/newRequest";
import Spinner from "../utilities/spinner";
import RequestType from "./requestType";
import RequestLocation from "./requestLocation";
import RequestDescription from "./requestDescription";

type props = {
  newRequest: types.newRequest;
  updateRequest: (updatedOrder: types.newRequest) => void;
};

export class NewRequest extends React.Component<any, {}> {
  componentWillMount() {
    console.log(this.props)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleUpdate(data) {
    // first, make a copy of the current store
    let requestState: types.newRequest = this.props.newRequest;
    // get the key of the data being modified
    const key = Object.keys(data);
    // mutate as necessary
    requestState[key[0]] = data[key[0]];
    // update store
    this.props.updateRequest(requestState);
  }

  render() {
    return (
      <div>
        <HydrateStore />
        <RequestType
          newRequest={this.props.newRequest}
          updateRequest={this.handleUpdate.bind(this)}
        />
        <RequestLocation />
        <RequestDescription />
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
)(NewRequest as any);
