import * as React from "react";
import LoadingImage from "../utilities/loadingImage";
import pngOrJpg from "../functions/facilityIsPng";
import * as types from "../../store/types";

const imgStyle = {
  width: "150px",
  height: "150px",
  margin: "0 auto"
};

const feedback = {
  backgroundColor: "rgba(92, 184, 92, .2)",
  padding: "5px",
  margin: "5px",
  borderRadius: "10px"
};

type props = {
  request: types.request;
};

export default class RequestCard extends React.Component<props, {}> {
  public render() {
    const { request } = this.props;

    return (
      <div className="container-fluid">
        <div className="panel">
          <div className="panel-body text-center">
            <div className="col-md-6">
              <h4 className="oswald-header">
                <b>{request.building}</b>
              </h4>
              <h5>{request.location}</h5>
              <div style={{ margin: "10px" }} className="hidden-xs">
                <LoadingImage
                  style={imgStyle}
                  src={
                    "https://tools.wprdc.org/images/pittsburgh/facilities/" +
                    request.building.replace(/ /g, "_") +
                    pngOrJpg(request.building)
                  }
                />
                <p>Request ID: {request.cartegraphID}</p>
              </div>
            </div>
            <div className="col-md-6">
              <h5>
                <b>{request.submitted}</b>
              </h5>
              <h4 className="oswald">
                <b>{request.issue}</b>
              </h4>
              <h5>"{request.description}"</h5>
              <p className="hidden-sm hidden-md hidden-lg hidden-xl">
                Request ID: {request.cartegraphID}
              </p>
              <div style={feedback}>
                <h5 className="ubuntu">
                  <b>DPW Feedback</b>
                </h5>
                <h5 className="ubuntu">Status: {request.status}</h5>
                <h5 className="ubuntu">
                  Last activity: {request.lastModified}
                </h5>
                <h5 className="ubuntu">
                  <i>{request.notes}</i>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
