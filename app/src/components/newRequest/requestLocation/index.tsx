import * as React from "react";
import * as types from "../../../store/types";
import SectionHeader from "../shared/sectionHeader";
import LocationSelectionOptions from "./locationSelectionOptions";

type props = {};
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
        <LocationSelectionOptions setState={this.setState.bind(this)}/>
      </div>
    );
  }
}
