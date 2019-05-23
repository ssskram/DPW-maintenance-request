import * as React from "react";
import * as types from "../../../store/types";
import Spinner from "../../utilities/spinner";
import validate from "./validate";
import post from "./post";
import storeLoad from "./storeLoad";

type props = {
  newRequest: types.newRequest;
  addRequest: (storeLoad: types.request) => void;
  clearRequest: () => void;
  success: () => void;
  failure: () => void;
};

type state = {
  spinner: boolean;
};

export default class Submit extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  submit(): void {
    this.setState({ spinner: true }, async () => {
      const success = await post(this.props.newRequest);
      if (success == true) {
        const newReq = await storeLoad(this.props.newRequest);
        // await this.props.addRequest(newReq);
        this.props.clearRequest();
        this.props.success();
        window.scrollTo(0, 0);
      } else {
        this.setState({ spinner: false });
        this.props.failure();
        window.scrollTo(0, 0);
      }
    });
  }

  render() {
    return (
      <div style={{ margin: "40px 0px" }} className="text-center">
        <button
          disabled={!validate(this.props.newRequest)}
          title="Please provide all required data"
          className="btn btn-success"
          style={{ width: "80%", fontSize: "2em" }}
          onClick={() => this.submit()}
        >
          <span
            className="oswald-header"
            style={{ color: "#fff", letterSpacing: "2px" }}
          >
            Submit
          </span>
        </button>
        {this.state.spinner == true && (
          <Spinner notice="...submitting your request..." />
        )}
      </div>
    );
  }
}
