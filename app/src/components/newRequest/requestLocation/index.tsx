import * as React from "react";
import * as types from "../../../store/types";
import SectionHeader from "../shared/sectionHeader";
import LocationSelectionOptions from "./locationSelectionOptions";
import FacilityTable from "./facilityTable";
import FacilityMap from "./facilityMap";
import PinMap from "./pinMap";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};

type state = {
  selectionType: "facilityTable" | "facilityMap" | "pin" | undefined;
};

export default class RequestLocation extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      selectionType: undefined
    };
  }

  render() {
    return (
      <div>
        <SectionHeader header="Where is the problem located?" />
        <LocationSelectionOptions
          selectedType={this.state.selectionType}
          newRequest={this.props.newRequest}
          setState={this.setState.bind(this)}
        />
        {this.state.selectionType == "facilityTable" && <FacilityTable />}
        {this.state.selectionType == "facilityMap" && <FacilityMap />}
        {this.state.selectionType == "pin" && <PinMap />}
      </div>
    );
  }
}
