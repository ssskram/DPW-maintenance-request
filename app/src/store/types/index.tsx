
export interface user {
    user: string
}


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