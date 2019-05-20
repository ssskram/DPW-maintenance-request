import * as React from "react";
const table = require("../../../images/table.png");
const map = require("../../../images/map.png");
const pin = require("../../../images/pin.png");

type props = {
  setState: (parentState: object) => void;
};

const fontSize = {
  fontSize: "1.2em"
};

export default class LocationSelectionType extends React.Component<props, {}> {
  render() {
    return (
      <div className="text-center">
        <button
          className="btn btn-secondary"
          onClick={() => this.setState({ selectionType: "facilityTable" })}
        >
          <img src={table} />
          <div style={fontSize}>Select facility from list</div>
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => this.setState({ selectionType: "facilityMap" })}
        >
          <img src={map} />
          <div style={fontSize}>Select facility from map</div>
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => this.setState({ selectionType: "pin" })}
        >
          <img src={pin} />
          <div style={fontSize}>Drop a pin on a map</div>
        </button>
      </div>
    );
  }
}
