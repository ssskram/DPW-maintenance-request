
// returns all projects to home map

import * as React from "react";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { Helmet } from "react-helmet"
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from './../../store/types'
import * as facilities from '../../store/facilities'

const mapStyle = require('./featurelessLight.json')

interface actionProps {
    loadFacilities: () => void
}

type props = types.facilities & actionProps

export class map extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            zoom: 13,
            center: { lat: 40.449801, lng: -79.994935 },
        }
    }

    componentDidMount() {
        this.props.loadFacilities()
    }

    render() {
        const {
            zoom,
            center
        } = this.state

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

export default connect(
    (state: ApplicationState) => ({
        ...state.facilities
    }),
    ({
        ...facilities.actionCreators
    })
)(map);