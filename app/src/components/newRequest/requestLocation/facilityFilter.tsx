import * as React from "react";
import * as types from "../../../store/types";

type props = {
  facilities: types.facility[];
  setParentState: (parentState: object) => void;
};

type state = {
  filter: string;
};

export default class FilterFacilities extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      filter: ""
    };
  }

  filter = filter => {
    this.setState({ filter });
    this.props.setParentState({
      facilities: this.props.facilities.filter(f =>
        f.name.toLowerCase().includes(filter.toLowerCase())
      )
    });
  };

  render() {
    return (
      <div style={{ margin: "15px 0px" }}>
        <input
          type="search"
          className="form-control"
          value={this.state.filter}
          placeholder="Search for facility by name"
          onChange={e => this.filter(e.target.value)}
        />
      </div>
    );
  }
}
