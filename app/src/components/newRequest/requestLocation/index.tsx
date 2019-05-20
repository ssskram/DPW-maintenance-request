import * as React from "react";
import * as types from "../../../store/types";
import SectionHeader from "../shared/sectionHeader";
import LocationSelectionOptions from "./locationSelectionOptions";
import FacilityTable from "./table/facilityTable";
import FacilityMap from "./maps/facilityMap";
import PinMap from "./maps/pinMap";
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
  selectedFacility: types.facility;
  locationConfirmed: boolean;
};

export default class RequestLocation extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      selectionType: undefined,
      selectedFacility: undefined,
      locationConfirmed: false
    };
  }

  render() {
    const { selectionType, selectedFacility, locationConfirmed } = this.state;
    if (locationConfirmed) {
      return (
        <div>
          <SectionHeader header="Where is the problem located?" />
          <SelectedFacility
            facility={selectedFacility}
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
          {selectionType == "facilityMap" && (
            <FacilityMap
              facilities={this.props.facilities}
              setParentState={this.setState.bind(this)}
            />
          )}
          {selectionType == "pin" && <PinMap />}
          {selectedFacility != undefined && locationConfirmed == false && (
            <ConfirmFacility
              facility={selectedFacility}
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
