
// returns all projects to home map

import * as React from "react"
import { Helmet } from "react-helmet"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Polygon } from "react-google-maps"
import randomcolor from 'randomcolor'
import * as types from './../../store/types'

const mapStyle = require('./featurelessLight.json')

type props = types.facilities

export default class map extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            zoom: 13,
            center: { lat: 40.449801, lng: -79.994935 },
        }
    }

    render() {
        const {
            zoom,
            center
        } = this.state

        const {
            facilities
        } = this.props

        const key = process.env.REACT_APP_GOOGLE_API
        const MapComponent = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + key + "&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%`, }} />,
                containerElement: <div style={{ height: `100%` }} />,
                mapElement: <div style={{ height: `100%` }} />
            }),
            withScriptjs,
            withGoogleMap
        )((props) =>
            <GoogleMap
                defaultZoom={zoom}
                defaultCenter={center}
                defaultOptions={{ styles: mapStyle as any }}
            >
                {facilities &&
                    facilities.map((facility, index) => {
                        let color = randomcolor()
                        if (facility.shape) {
                            return (
                                <div key={index}>
                                    <Polygon
                                        options={{ fillColor: color, strokeColor: color, strokeWeight: 3, fillOpacity: 0.4 }}
                                        paths={[facility.shape]}>
                                    </Polygon>
                                </div>

                            )
                        } else return
                    })
                }


            </GoogleMap>
        )
        return (
            <div id='home-map'>
                <Helmet><style>{'.col-sm-9,body{padding:0!important}.col-sm-9{width:100%!important}body{overflow:hidden}'}</style></Helmet>
                <MapComponent />
            </div>
        )
    }
}