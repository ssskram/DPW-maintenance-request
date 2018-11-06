
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


// maintenance requests
export interface requests {
    requests: myRequest[]
}
export interface myRequest {
    cartegraphID: string
    building: string
    location: string
    description: string
    submitted: string
    status: string
    lastModified: string
    notes: string
}

export interface openRequest {
    openRequest: newRequest
}
export interface newRequest {
    building: string
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