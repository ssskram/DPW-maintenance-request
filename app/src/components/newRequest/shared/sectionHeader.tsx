import * as React from "react";

type props = {
  header: string;
};

export default class MaintenanceTypes extends React.Component<props, {}> {
  render() {
    return (
      <h3 className="text-center" style={{ color: "#fff" }}>
        {this.props.header}
      </h3>
    );
  }
}
