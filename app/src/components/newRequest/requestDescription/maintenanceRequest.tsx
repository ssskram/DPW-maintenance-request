import * as React from "react";
import * as types from "../../../store/types";
import TextArea from "../../formElements/textarea";
import Select from "../../formElements/select";
import Phone from "../../formElements/phone";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};

export default class MaintenanceRequestDescription extends React.Component<
  props,
  {}
> {
  render() {
    return (
      <div>
        <Select
          value={this.props.newRequest.maintenanceIssue}
          header="Select an issue"
          placeholder="Select..."
          onChange={issue =>
            this.props.updateRequest({ maintenanceIssue: issue })
          }
          multi={false}
          required={false}
          options={[]}
        />
        <Phone
          value={this.props.newRequest.phone}
          header="Enter your phone number"
          placeholder="Phone number"
          callback={e => this.props.updateRequest({ phone: e })}
        />
        <TextArea
          value={this.props.newRequest.description}
          header="Describe the issue"
          placeholder="Description"
          callback={e =>
            this.props.updateRequest({ description: e.target.value })
          }
          required={false}
        />
        <TextArea
          value={this.props.newRequest.location}
          header="Describe the location"
          placeholder="Room, floor, etc."
          callback={e => this.props.updateRequest({ location: e.target.value })}
          required={false}
        />
      </div>
    );
  }
}
