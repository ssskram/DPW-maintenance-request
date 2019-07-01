/*
 * Certain request types aren't taken into Cartegraph
 * For those, return a specific prompt for user's to follow
 * to resolve issue
 */

import * as React from "react";

type props = {
  issue: string;
  updateRequest: (newData: object) => void;
};

const fontSize = {
  fontSize: "1.5em"
};

export default class AlternativePrompt extends React.Component<props, {}> {
  public render() {
    const { issue, updateRequest } = this.props;

    return (
      <div className="row col-md-12 text-center">
        <h2>{issue}</h2>
        {issue == "Elevators" && (
          <div style={fontSize}>
            Please contact John Sibbet at <br />
            <b>412-600-6106</b>
          </div>
        )}
        {issue == "Pest Control" && (
          <div style={fontSize}>
            Please contact John Sibbet at <br />
            <b>412-600-6106</b>
          </div>
        )}
        {issue == "Tree Issues" && (
          <div style={fontSize}>
            Please contact DPW Forestry at <br />
            <b>412-665-3625</b>
          </div>
        )}
        {issue == "Masonry/Concrete Work" && (
          <div style={fontSize}>
            Please contact DPW Construction at <br />
            <b>412-782-7631</b>
          </div>
        )}
        {issue == "Landscape Maintenance (Snow or Leaves)" && (
          <div style={fontSize}>
            Please contact the DPW Parks division that services your area:{" "}
            <br />
            <b>
              <a href="http://pittsburghpa.gov/dpw/park-maintenance/index.html">
                Maintenance Regions
              </a>
            </b>
          </div>
        )}
        {issue == "Office Renovation" && (
          <div style={fontSize}>
            Please contact Chris Hornstein at <br />
            <b>412-255-2498</b> or at <br />
            chirs.hornstein@pittsburghpa.gov
          </div>
        )}
        <button
          onClick={() => updateRequest({ maintenanceIssue: undefined })}
          value="issue"
          className="btn btn-danger"
        >
          Back
        </button>
      </div>
    );
  }
}
