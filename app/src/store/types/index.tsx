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
  requestType: "Maintenance Request" | "Office Move" | "";
  maintenanceType: string;
  maintenanceIssue: string;
  building: string;
  description: string;
  department: string;
  location: string;
  phone: string;
}

// message
export interface messsage {
  message: string;
}
