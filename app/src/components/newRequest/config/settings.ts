// top level request types
export const requestTypes = [
  {
    value: "Maintenance Request",
    label: "Submit a maintenance request"
  },
  {
    value: "Office Move",
    label: "Request an office move"
  }
  // not ready for this one yet
  // also, not wired up to cartegraph yet
  // {
  //   value: "Construction",
  //   label: "Request construction work"
  // }
];

export const config = {
  "Maintenance Request": {
    maintenanceTypes: true,
    location: true,
    facilitySelection: true,
    geoLocate: false,
    dataFields: true
  },
  "Office Move": {
    maintenanceTypes: false,
    location: false,
    facilitySelection: false,
    geoLocate: false,
    dataFields: true
  },
  "Construction": {
    maintenanceTypes: false,
    location: true,
    facilitySelection: false,
    geoLocate: true,
    dataFields: true
  }
};
