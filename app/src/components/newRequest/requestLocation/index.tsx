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
      selectedFacility: undefined, // maint requests
      locationConfirmed: false
    };
  }

  componentDidMount() {
    // if store contains building, set and confirm facility
    if (this.props.newRequest.building != "") {
      this.setState({
        selectedFacility: this.props.facilities.find(
          f => f.name == this.props.newRequest.building
        ),
        locationConfirmed: true
      });
      // store contains latlng, display pin map
    } else if (this.props.newRequest.latLng != undefined) {
      this.setState({
        selectionType: "pin"
      });
    }
  }

  componentWillUpdate(nextProps: props, nextState: state) {
    // clear location when requestType changes
    if (this.props.newRequest.requestType != nextProps.newRequest.requestType) {
      this.setState({
        selectionType: undefined,
        selectedFacility: undefined,
        locationConfirmed: false
      });
    }
    switch (this.props.newRequest.requestType) {
      case "Maintenance Request":
        // write building to store when location is confirmed
        if (
          this.state.locationConfirmed == false &&
          nextState.locationConfirmed == true
        ) {
          this.props.updateRequest({
            building: nextState.selectedFacility.name
          });
        }
    }
  }

  render() {
    const { selectionType, selectedFacility, locationConfirmed } = this.state;
    const header = (
      <SectionHeader
        header={
          this.props.newRequest.requestType == "Construction"
            ? "Where will the work be performed?"
            : "Where is the problem located?"
        }
      />
    );
    if (locationConfirmed) {
      return (
        <div>
          {header}
          <SelectedFacility
            facility={selectedFacility}
            setParentState={this.setState.bind(this)}
            updateRequest={this.props.updateRequest.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div>
          {header}
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
          {selectionType == "pin" && (
            <PinMap
              newRequest={this.props.newRequest}
              updateRequest={this.props.updateRequest.bind(this)}
            />
          )}
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
