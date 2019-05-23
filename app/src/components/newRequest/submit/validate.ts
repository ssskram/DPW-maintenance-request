import * as types from "../../../store/types";

export default function validate(request: types.newRequest) {
  switch (request.requestType) {
    case "":
      return false;
    case "Maintenance Request":
      // disable for issues that throw contact prompts
      const alternativePrompt =
        request.maintenanceIssue.value == "Pest Control" ||
        request.maintenanceIssue.value == "Elevators" ||
        request.maintenanceIssue.value == "Tree Issues" ||
        request.maintenanceIssue.value == "Masonry/Concrete Work" ||
        request.maintenanceIssue.value ==
          "Landscape Maintenance (Snow or Leaves)" ||
        request.maintenanceIssue.value == "Office Renovation";

      const valid =
        request.description != "" &&
        request.department != "" &&
        request.phone != "" &&
        request.location != "" &&
        request.maintenanceIssue != "" &&
        request.building != "";

      if (alternativePrompt) {
        return false;
      } else return valid;

    case "Office Move":
      return false;
    case "Construction":
      return true;
  }
}
