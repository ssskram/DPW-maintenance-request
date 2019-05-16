import * as React from "react";
import Select from "react-select";

type props = {
  value: string;
  placeholder: string;
  header: string;
  required: boolean;
  options: Array<object>;
  multi: boolean;
  onChange: (selects: any) => void;
};

export default class SelectElement extends React.Component<props, {}> {
  public render() {
    return (
      <div className="form-group">
        <div className="col-md-12 form-element">
          <h5 className="form-h4">
            {this.props.header}
            {this.props.required == true && (
              <span style={{ color: "red", fontSize: "20" }}>*</span>
            )}
          </h5>
          <Select
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            options={this.props.options}
            closeMenuOnSelect={!this.props.multi}
            blurInputOnSelect={!this.props.multi}
            simpleValue={this.props.multi}
            removeSelected={this.props.multi}
            isMulti={this.props.multi}
            clearable={this.props.multi}
          />
        </div>
      </div>
    );
  }
}
