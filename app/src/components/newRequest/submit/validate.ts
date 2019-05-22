import * as types from "../../../store/types";

export default function validate(request: types.newRequest) {
  switch (request.requestType) {
    case "":
      return false;
    case "Maintenance Request":
      return false;
    case "Office Move":
      return false;
    case "Construction":
      return true;
  }
}
