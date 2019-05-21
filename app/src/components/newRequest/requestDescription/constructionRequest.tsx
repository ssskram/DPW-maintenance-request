import * as React from "react";
import * as types from "../../../store/types";
import TextArea from "../../formElements/textarea";
import Select from "../../formElements/select";
import Phone from "../../formElements/phone";
import ImageUploader from "react-images-upload";
import constants from "./constants";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};

export default class ConstructionRequest extends React.Component<props, {}> {
  render() {
    let imgButton;
    if (this.props.newRequest.image.length == 0) {
      imgButton = { display: "block" };
    } else {
      imgButton = { display: "none" };
    }
    return (
      <div>
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
