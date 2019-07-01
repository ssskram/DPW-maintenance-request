/*
 * Form fields for maint. requests
 */

import * as React from "react";
import * as types from "../../../store/types";
import TextArea from "../../formElements/textarea";
import Select from "../../formElements/select";
import Phone from "../../formElements/phone";
import ImageUploader from "react-images-upload";
import AlternativePrompt from "./alternativePrompts";
import constants from "./constants";

type props = {
  newRequest: types.newRequest;
  issues: types.issue[];
  updateRequest: (newData: object) => void;
};

export default class MaintenanceRequest extends React.Component<props, {}> {
  setIssues() {
    const issues = this.props.issues.filter(
      i => i.type == this.props.newRequest.maintenanceType
    );
    return issues.map(i => {
      return { value: i.name, label: i.name };
    });
  }

  render() {
    let imgButton;
    if (this.props.newRequest.image.length == 0) {
      imgButton = { display: "block" };
    } else {
      imgButton = { display: "none" };
    }
    const issues = this.props.issues
      .filter(
        i => i.type != "" && i.type == this.props.newRequest.maintenanceType
      )
      .map(i => {
        return { value: i.name, label: i.name };
      });

    if (this.props.newRequest.maintenanceIssue) {
      const alternativePrompt =
        this.props.newRequest.maintenanceIssue.value == "Pest Control" ||
        this.props.newRequest.maintenanceIssue.value == "Elevators" ||
        this.props.newRequest.maintenanceIssue.value == "Tree Issues" ||
        this.props.newRequest.maintenanceIssue.value ==
          "Masonry/Concrete Work" ||
        this.props.newRequest.maintenanceIssue.value ==
          "Landscape Maintenance (Snow or Leaves)" ||
        this.props.newRequest.maintenanceIssue.value == "Office Renovation";

      if (alternativePrompt) {
        return (
          <AlternativePrompt
            issue={this.props.newRequest.maintenanceIssue.value}
            updateRequest={this.props.updateRequest.bind(this)}
          />
        );
      }
    }

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
          options={issues}
        />
        <Select
          value={this.props.newRequest.department}
          header="Select your department"
          placeholder="Select department"
          onChange={department => this.props.updateRequest({ department })}
          multi={false}
          options={constants.Departments}
          required={false}
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
        <div className="col-md-12">
          <ImageUploader
            buttonStyles={imgButton}
            withIcon={true}
            buttonText="Attach an image"
            onChange={image => this.props.updateRequest({ image })}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
            withLabel={false}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
          />
        </div>
      </div>
    );
  }
}
