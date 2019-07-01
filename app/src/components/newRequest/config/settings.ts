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

// defines the required data components that are necessary per type
export const config = {
  "Maintenance Request": {
    maintenanceTypes: true, // types of maint request
    location: true, // location selection
    facilitySelection: true, // tied to specific facility
    geoLocate: false, // geolocate (point on map)
    dataFields: true // free text/add'l info fields
  },
  "Office Move": {
    maintenanceTypes: false,
    location: false,
    facilitySelection: false,
    geoLocate: false,
    dataFields: true
  },
  Construction: {
    maintenanceTypes: false,
    location: true,
    facilitySelection: false,
    geoLocate: true,
    dataFields: true
  }
};
