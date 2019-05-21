import * as React from "react";
import * as types from "../../../../store/types";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");
import setCenter from "../../../../functions/setCenter";
const mapStyle = require("./featurelessLight.json");

type props = {
  setParentState: (parentState: object) => void;
};

type state = {
  zoom: number;
  center: { lat: number; lng: number };
};

export default class PinMap extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      zoom: 13,
      center: { lat: 40.437470539681442, lng: -79.987124601795273 }
    };
  }

  componentWillMount() {
    if (window.innerWidth < 1000) {
      this.setState({ zoom: 12 });
    }
  }

  setLatLng(point) {
    console.log(point.lat());
    console.log(point.lng());
  }

  render() {
    const { zoom, center } = this.state;
    const key = process.env.REACT_APP_GOOGLE_API;
    const MapComponent = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=" +
          key +
          "&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={center}
        defaultOptions={{
          styles: mapStyle as any,
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: true,
          rotateControl: false,
          fullscreenControl: false
        }}
      >
        <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.MARKER}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.MARKER]
            }
          }}
          onMarkerComplete={props => this.setLatLng(props.map.center)}
        />
      </GoogleMap>
    ));
    return (
      <div className="home-map">
        <MapComponent />
      </div>
    );
  }
}
