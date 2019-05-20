import * as React from "react";
import * as types from "../../../store/types";
import displayComponent from "../config/displayComponent";
const table = require("../../../images/table.png");
const map = require("../../../images/map.png");
const pin = require("../../../images/pin.png");

type props = {
  newRequest: types.newRequest;
  selectedType: string;
  setState: (parentState: object) => void;
};

const fontSize = {
  fontSize: "1.2em"
};

const buttonClicked = {
  border: "3px solid #4BC0C0"
};

export default class LocationSelectionType extends React.Component<props, {}> {
  render() {
    return (
      <div className="text-center">
        {displayComponent(this.props.newRequest, "facilitySelection") && (
          <button
            className="btn btn-secondary"
            style={
              this.props.selectedType == "facilityTable" ? buttonClicked : null
            }
            onClick={() =>
              this.props.setState({ selectionType: "facilityTable" })
            }
          >
            <img src={table} />
            <div style={fontSize}>Select facility from list</div>
          </button>
        )}
        {displayComponent(this.props.newRequest, "facilitySelection") && (
          <button
            className="btn btn-secondary"
            style={
              this.props.selectedType == "facilityMap" ? buttonClicked : null
            }
            onClick={() =>
              this.props.setState({ selectionType: "facilityMap" })
            }
          >
            <img src={map} />
            <div style={fontSize}>Select facility from map</div>
          </button>
        )}
        {displayComponent(this.props.newRequest, "geoLocate") && (
          <button
            className="btn btn-secondary"
            style={this.props.selectedType == "pin" ? buttonClicked : null}
            onClick={() => this.props.setState({ selectionType: "pin" })}
          >
            <img src={pin} />
            <div style={fontSize}>Drop a pin on a map</div>
          </button>
        )}
      </div>
    );
  }
}
