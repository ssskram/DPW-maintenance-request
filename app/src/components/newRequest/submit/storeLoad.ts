import * as types from "../../../store/types";
import * as moment from "moment";

export default function storeLoad(
  request: types.newRequest,
  user: types.user
): types.request {
  switch (request.requestType) {
    case "Maintenance Request":
      const maintLoad = {
        cartegraphID: "...loading...",
        building: request.building,
        location: request.location,
        description: request.description,
        department: request.department.value,
        submitted: moment().format("MM/DD/YYYY"),
        submittedBy: user.email,
        status: "Planned",
        issue: request.maintenanceIssue.value,
        lastModified: moment().format("MM/DD/YYYY"),
        notes: ""
      };
      return maintLoad;
    case "Office Move":
      const omLoad = {
        cartegraphID: "...loading...",
        building: request.originFacility.value,
        location:
          "Office move from " +
          request.originFacility.value +
          " (" +
          request.originLocation +
          ") to " +
          request.destinationFacility.value +
          " (" +
          request.destinationLocation +
          ")",
        description:
          "Office move for " +
          request.name +
          ". Additional information: " +
          request.description,
        department: request.department.value,
        submitted: moment().format("MM/DD/YYYY"),
        submittedBy: user.email,
        status: "Planned",
        issue: "Office Move",
        lastModified: moment().format("MM/DD/YYYY"),
        notes: ""
      };
      return omLoad;
    case "Construction":
  }
  return undefined;
}
