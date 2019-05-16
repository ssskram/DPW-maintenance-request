import * as React from "react";

type props = {
  value: string;
  placeholder: string;
  header: string;
  required: boolean;
  callback: (value: any) => void;
};

export default class Input extends React.Component<props, {}> {
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
          <input
            type="search"
            className="form-control"
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.props.callback.bind(this)}
          />
        </div>
      </div>
    );
  }
}
