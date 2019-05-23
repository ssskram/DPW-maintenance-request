import * as types from "../../../store/types";

export default function validate(request: types.newRequest) {
  switch (request.requestType) {
    case "":
      return false;
    case "Maintenance Request":
      // disable for issues that throw contact prompts
      if (request.maintenanceIssue) {
        const alternativePrompt =
          request.maintenanceIssue.value == "Pest Control" ||
          request.maintenanceIssue.value == "Elevators" ||
          request.maintenanceIssue.value == "Tree Issues" ||
          request.maintenanceIssue.value == "Masonry/Concrete Work" ||
          request.maintenanceIssue.value ==
            "Landscape Maintenance (Snow or Leaves)" ||
          request.maintenanceIssue.value == "Office Renovation";
        if (alternativePrompt) {
          return false;
        }
      }

      const maintValid =
        request.description != "" &&
        request.department != undefined &&
        request.phone != "" &&
        request.location != "" &&
        request.maintenanceIssue != undefined &&
        request.building != "";

      return maintValid;

    case "Office Move":
      const officeValid =
        request.description != "" &&
        request.department != undefined &&
        request.name != "" &&
        request.originFacility != undefined &&
        request.originLocation != "" &&
        request.destinationFacility != undefined &&
        request.destinationLocation != "";

      return officeValid;
    case "Construction":
      const constructionValid =
        request.latLng != undefined &&
        request.department != undefined &&
        request.phone != "" &&
        request.description != "" &&
        request.location != "";

      return constructionValid;
  }
}
