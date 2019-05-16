import * as React from "react";
import * as types from "../../../store/types";

type props = {};

export default class RequestDescription extends React.Component<props, {}> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className='panel'>
        <div className='panel-body'>
          <h3>Please provide some additional details</h3>
        </div>
      </div>
    );
  }
}
