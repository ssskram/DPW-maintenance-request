import * as React from "react";
import * as types from "../../../store/types";
import TextArea from "../../formElements/textarea";
import Input from "../../formElements/input";
import Select from "../../formElements/select";
import Phone from "../../formElements/phone";
import constants from "./constants";

type props = {
  newRequest: types.newRequest;
  facilities: types.facility[];
  updateRequest: (newData: object) => void;
};

export default class OfficeMoveDescription extends React.Component<props, {}> {
  render() {
    const facilities = this.props.facilities
      .filter(f => f.name != "")
      .map(f => {
        return { value: f.name, label: f.name };
      });
    return (
      <div>
        <div className="sectionHeader">
          Employee information
          <span className="glyphicon glyphicon-user pull-right" />
        </div>
        <div className="panel-body">
          <Input
            value={this.props.newRequest.name}
            header="Employee name"
            placeholder="Name of employee being moved"
            callback={e => this.props.updateRequest({ name: e.target.value })}
            required={false}
          />

          <Select
            value={this.props.newRequest.department}
            header="Department"
            placeholder="Select department"
            onChange={department => this.props.updateRequest({ department })}
            multi={false}
            options={constants.Departments}
            required={false}
          />

          <Phone
            value={this.props.newRequest.phone}
            header="Phone number"
            placeholder="Enter phone number"
            callback={e => this.props.updateRequest({ phone: e })}
          />
        </div>
        <div className="sectionHeader">
          Move origin
          <span className="glyphicon glyphicon-arrow-right pull-right" />
          <span
            style={{ marginRight: "5px" }}
            className="glyphicon glyphicon-home pull-right"
          />
        </div>
        <div className="panel-body">
          <Select
            value={this.props.newRequest.originFacility}
            header="Select facility of origin"
            placeholder="Select facility"
            onChange={originFacility =>
              this.props.updateRequest({ originFacility })
            }
            multi={false}
            options={facilities}
            required={false}
          />

          <TextArea
            value={this.props.newRequest.originLocation}
            header="Specific location"
            placeholder="Floor, room, etc."
            callback={e =>
              this.props.updateRequest({ originLocation: e.target.value })
            }
            required={false}
          />
        </div>
        <div className="sectionHeader">
          Move destination
          <span className="glyphicon glyphicon-home pull-right" />
          <span
            style={{ marginRight: "5px" }}
            className="glyphicon glyphicon-arrow-right pull-right"
          />
        </div>
        <div className="panel-body">
          <Select
            value={this.props.newRequest.destinationFacility}
            header="Select facility of destination"
            placeholder="Select facility"
            onChange={destinationFacility =>
              this.props.updateRequest({ destinationFacility })
            }
            multi={false}
            options={facilities}
            required={false}
          />

          <TextArea
            value={this.props.newRequest.destinationLocation}
            header="Specific location"
            placeholder="Floor, room, etc."
            callback={e =>
              this.props.updateRequest({
                destinationLocation: e.target.value
              })
            }
            required={false}
          />
        </div>
        <div className="sectionHeader">
          Additional Information
          <span className="glyphicon glyphicon-info-sign pull-right" />
        </div>
        <div className="panel-body">
          <TextArea
            value={this.props.newRequest.description}
            header=""
            placeholder="Anything else we need to know?"
            callback={e => this.setState({ description: e.target.value })}
            required={false}
          />
        </div>
      </div>
    );
  }
}
