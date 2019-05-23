import * as React from "react";
import * as types from "../../../../store/types";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

const mapStyle = require("./featurelessLight.json");
const pin = require("../../../../images/colorfulPin.png");

type props = {
  newRequest: types.newRequest;
  updateRequest: (newData: object) => void;
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

  shouldComponentUpdate(nextProps: props) {
    if (nextProps.newRequest.latLng == this.state.center) {
      return false;
    } else return true;
  }

  componentWillMount() {
    if (window.innerWidth < 1000) {
      this.setState({ zoom: 12 });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newRequest.latLng) {
      this.setState({
        center: nextProps.newRequest.latLng,
        zoom: 16
      });
    }
  }

  setLatLng(point) {
    this.props.updateRequest({
      latLng: { lat: point.lat(), lng: point.lng() }
    });
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
        <Marker position={this.props.newRequest.latLng} defaultIcon={pin} />
        <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.MARKER}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.MARKER]
            }
          }}
          onMarkerComplete={props => this.setLatLng(props.position)}
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
