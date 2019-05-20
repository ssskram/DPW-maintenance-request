import * as React from "react";
import * as types from "../../../store/types";
import SectionHeader from "../shared/sectionHeader";

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
};


export default class OfficeMoveDescription extends React.Component<props, {}> {
  render() {
    return (
      <div>
        Office move form here
      </div>
    );
  }
}
