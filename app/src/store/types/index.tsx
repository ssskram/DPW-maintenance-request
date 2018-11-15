
// user
export interface user {
    user: string
}

// facilities
export interface facilities {
    facilities: facility[]
}

export interface facility {
    cartegraphID: string
    name: string
    neighborhood: string
    shape: points
}

export interface points {
    lat: number
    lng: number
}

// all requests
export interface allRequests {
    allRequests: allRequest[]
}
export interface allRequest {
    cartegraphID: string
    building: string
    location: string
    description: string
    department: string
    submitted: string
    submittedBy: string
    status: string
    issue: string
    lastModified: string
    notes: string
}

// active request
export interface openRequest {
    openRequest: newRequest
}
export interface newRequest {
    building: string
    issueType: string
    issue: string
    description: string
    department: string
    location: string
    phone: string
}

// issue types
export interface issues { 
    issues: issue[]
}
export interface issue {
    cartegraphID: string
    name: string
    type: string
}

// department
export interface department {
    department: string
}

// message
export interface messsage { 
    message: string
}