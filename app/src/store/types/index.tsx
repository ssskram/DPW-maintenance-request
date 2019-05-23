// user
export interface user {
  email: string;
  organization: string;
  name: string;
}

// facilities
export interface facilities {
  facilities: facility[];
}
export interface facility {
  cartegraphID: string;
  name: string;
  neighborhood: string;
  shape: points;
}
export interface points {
  lat: number;
  lng: number;
}

// all requests
export interface allRequests {
  allRequests: request[];
}
export interface request {
  cartegraphID: string;
  building: string;
  location: string;
  description: string;
  department: string;
  submitted: string;
  submittedBy: string;
  status: string;
  issue: string;
  lastModified: string;
  notes: string;
}

// issue types
export interface issues {
  issues: issue[];
}
export interface issue {
  cartegraphID: string;
  name: string;
  type: string;
}

// active request
export interface newRequest {
  requestType: "Maintenance Request" | "Office Move" | "Construction" | "";
  description: string;
  department: select;
  phone: string;
  image: Array<any>;
  location: string;

  // maintenance requests
  maintenanceType: string;
  maintenanceIssue: select;
  building: string;

  // office moves
  originFacility: select;
  originLocation: string;
  destinationFacility: select;
  destinationLocation: string;
  name: string;

  // construction request
  latLng: { lat: number; lng: number };
}

// select
export type select = {
  value: string;
  label: string;
};

// message
export interface messages {
  message: message;
}
export type message = string