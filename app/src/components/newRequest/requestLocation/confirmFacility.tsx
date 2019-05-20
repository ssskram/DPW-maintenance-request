import * as React from "react";
import Modal from "react-responsive-modal";
import * as types from "../../../store/types";
import LoadingImage from "../../utilities/loadingImage";
import pngOrJpg from "../../../functions/facilityIsPng";

type props = {
  facility: types.facility;
  requests: types.request[];
  setParentState: (parentState: object) => void;
  clearRequest: () => void;
};

type state = {
  relevantRequests: types.request[];
};

const imgStyle = {
  maxHeight: "150px",
  borderRadius: "10px",
  margin: "0 auto"
};

export default class ConfirmFacility extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      relevantRequests: []
    };
  }

  componentDidMount() {
    const relevantRequests = this.props.requests
      .filter(request => request.building == this.props.facility.name)
      .sort((a, b) => +new Date(b.submitted) - +new Date(a.submitted))
      .slice(0, 20);
    if (relevantRequests.length == 0) {
      this.props.setParentState({ locationConfirmed: true });
    } else {
      this.setState({ relevantRequests });
    }
  }

  render() {
    const { relevantRequests } = this.state;
    const { facility } = this.props;

    const recentlySubmitted = relevantRequests.map(request => {
      return (
        <div className="container-fluid" key={request.cartegraphID}>
          <div
            className="panel"
            style={{ backgroundColor: "rgba(75,192,192,.02)" }}
          >
            <div className="panel-body text-center">
              <div className="col-md-12">
                <h5>{request.submitted}</h5>
                <h5 className="ubuntu">
                  <b>{request.issue}</b>
                </h5>
                <h5>Status: {request.status}</h5>
                <h5>Location: {request.location}</h5>
                <h5>
                  <i>"{request.description}"</i>
                </h5>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <Modal
        open={true}
        onClose={() => {}}
        showCloseIcon={false}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        center
      >
        <div className="text-center">
          <h3 className="ubuntu">Has your issue already been reported?</h3>
          <div className="text-center">
            <LoadingImage
              style={imgStyle}
              src={
                "https://tools.wprdc.org/images/pittsburgh/facilities/" +
                facility.name.replace(/ /g, "_") +
                pngOrJpg(facility.name)
              }
            />
          </div>
          <div style={{ margin: "20px 0px" }}>
            <button
              onClick={() => this.props.clearRequest()}
              className="btn btn-secondary"
            >
              <div className='oswald-header'>Yes</div>
              <div>My issue has already been reported</div>
            </button>
            <button
              onClick={() =>
                this.props.setParentState({ locationConfirmed: true })
              }
              className="btn btn-secondary"
            >
              <div className='oswald-header'>No</div>
              <div>I'd like to continue with reporting this issue</div>
            </button>
          </div>
          <div className="row">{recentlySubmitted}</div>
        </div>
      </Modal>
    );
  }
}
