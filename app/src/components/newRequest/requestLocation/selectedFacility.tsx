import * as React from "react";
import * as types from "../../../store/types";
import LoadingImage from "../../utilities/loadingImage";
import pngOrJpg from "../../../functions/facilityIsPng";

type props = {
  facility: types.facility;
  setParentState: (parentState: object) => void;
};

const imgStyle = {
  maxHeight: "150px",
  borderRadius: "10px",
  margin: "0 auto"
};

export default class SelectedFacility extends React.Component<props, {}> {
  render() {
    const facility = this.props.facility;
    return (
      <div className="panel">
        <div className="panel-body text-center">
          <h3>{facility.name}</h3>
          <h4>{facility.neighborhood}</h4>
          <LoadingImage
            style={imgStyle}
            src={
              "https://tools.wprdc.org/images/pittsburgh/facilities/" +
              facility.name.replace(/ /g, "_") +
              pngOrJpg(facility.name)
            }
          />
          <button
            className="btn btn-warning"
            style={{
              fontSize: ".9em",
              marginTop: "20px"
            }}
            onClick={() =>
              this.props.setParentState({
                selectionType: undefined,
                selectedLocation: undefined,
                locationConfirmed: false
              })
            }
          >
            <span
              style={{ marginRight: "5px" }}
              className="glyphicon glyphicon-remove"
            />
            Change location
          </button>
        </div>
      </div>
    );
  }
}
