import * as React from "react";
import * as types from "../../../store/types";
import SectionHeader from "../shared/sectionHeader";
import LocationSelectionOptions from "./locationSelectionOptions";
import FacilityTable from "./facilityTable";
import FacilityMap from "./facilityMap";
import PinMap from "./pinMap";
import ConfirmFacility from "./confirmFacility";
import SelectedFacility from "./selectedFacility";

type props = {
  newRequest: types.newRequest;
  facilities: types.facility[];
  requests: types.request[];
  updateRequest: (newData: object) => void;
  clearRequest: () => void;
};

type state = {
  selectionType: "facilityTable" | "facilityMap" | "pin";
  selectedLocation: types.facility;
  locationConfirmed: boolean;
};

export default class RequestLocation extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      selectionType: undefined,
      selectedLocation: undefined,
      locationConfirmed: false
    };
  }

  render() {
    const { selectionType, selectedLocation, locationConfirmed } = this.state;
    if (locationConfirmed) {
      return (
        <div>
          <SectionHeader header="Where is the problem located?" />
          <SelectedFacility
            facility={selectedLocation}
            setParentState={this.setState.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <SectionHeader header="Where is the problem located?" />
          <LocationSelectionOptions
            selectedType={selectionType}
            newRequest={this.props.newRequest}
            setState={this.setState.bind(this)}
          />
          {selectionType == "facilityTable" && (
            <FacilityTable
              facilities={this.props.facilities}
              setParentState={this.setState.bind(this)}
            />
          )}
          {selectionType == "facilityMap" && <FacilityMap />}
          {selectionType == "pin" && <PinMap />}
          {selectedLocation != undefined && locationConfirmed == false && (
            <ConfirmFacility
              facility={selectedLocation}
              requests={this.props.requests}
              clearRequest={this.props.clearRequest.bind(this)}
              setParentState={this.setState.bind(this)}
            />
          )}
        </div>
      );
    }
  }
}
