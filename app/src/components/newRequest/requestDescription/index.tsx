import * as React from "react";
import * as types from "../../../store/types";
import SectionHeader from "../shared/sectionHeader";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};


export default class RequestDescription extends React.Component<props, {}> {
  render() {
    return (
      <div style={{ margin: "60px 0px" }}>
        <SectionHeader header="Please provide additional information" />
        <div className="panel">
          <div className="panel-body">
            <h3>Please provide some additional details</h3>
          </div>
        </div>
      </div>
    );
  }
}
