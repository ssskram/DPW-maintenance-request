import * as React from "react";
import Table from "react-table";
import * as types from "../../../../store/types";
import LoadingImage from "../../../utilities/loadingImage";
import pngOrJpg from "../../../../functions/facilityIsPng";
import Filter from "./facilityFilter";

type props = {
  facilities: types.facility[];
  setParentState: (selectedFacility: object) => void;
};

type state = {
  facilities: types.facility[];
};

export default class FacilityTable extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      facilities: props.facilities
    };
  }

  render() {
    const columns = [
      {
        Header: "",
        accessor: "name",
        Cell: props => (
          <button
            className="btn btn-secondary"
            onClick={() =>
              this.props.setParentState({ selectedFacility: props.original })
            }
          >
            Select
          </button>
        ),
        maxWidth: 125
      },
      {
        Header: "",
        accessor: "name",
        Cell: props => (
          <LoadingImage
            style={{ height: "50px", margin: "0 auto" }}
            src={
              "https://tools.wprdc.org/images/pittsburgh/facilities/" +
              props.value.replace(/ /g, "_") +
              pngOrJpg(props.value)
            }
          />
        ),
        maxWidth: 175
      },
      {
        Header: "Facility",
        accessor: "name"
      },
      {
        Header: "Neighborhood",
        accessor: "neighborhood"
      }
    ];
    return (
      <div>
        <Filter
          facilities={this.props.facilities}
          setParentState={this.setState.bind(this)}
        />
        <Table
          data={this.state.facilities}
          columns={columns}
          showPageSizeOptions={false}
          showPageJump={false}
          minRows={0}
          getTdProps={() => ({
            style: {
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }
          })}
        />
      </div>
    );
  }
}
