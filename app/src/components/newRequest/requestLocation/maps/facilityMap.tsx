import * as React from "react";
import * as types from "../../../../store/types";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon,
  InfoWindow
} from "react-google-maps";
import randomcolor from "randomcolor";
import setCenter from "../../../../functions/setCenter";
import pngOrJpg from "../../../../functions/facilityIsPng";
import LoadingImage from "../../../utilities/loadingImage";
const mapStyle = require("./featurelessLight.json");

type props = {
  facilities: types.facility[];
  setParentState: (parentState: object) => void;
};

type state = {
  zoom: number;
  center: { lat: number; lng: number };
  selectedFacility: types.facility;
  showInfowindow: boolean;
};

const imgStyle = {
  maxHeight: "150px",
  borderRadius: "10px",
  margin: "0 auto"
};

export default class FacilityMap extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      zoom: 13,
      center: { lat: 40.437470539681442, lng: -79.987124601795273 },
      selectedFacility: undefined,
      showInfowindow: false
    };
  }

  componentWillMount() {
    if (window.innerWidth < 1000) {
      this.setState({ zoom: 12 });
    }
  }

  polygonSelection(facility) {
    this.setState({
      center: setCenter(facility.shape),
      zoom: 16,
      selectedFacility: facility,
      showInfowindow: true
    });
  }

  closeWindow() {
    this.setState({
      showInfowindow: false,
      zoom: 13,
      center: { lat: 40.437470539681442, lng: -79.987124601795273 }
    });
  }

  render() {
    const { zoom, center, selectedFacility, showInfowindow } = this.state;
    const { facilities } = this.props;
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
        {facilities &&
          facilities.map((facility, index) => {
            let color = randomcolor();
            if (facility.shape) {
              return (
                <div key={index}>
                  <Polygon
                    options={{
                      fillColor: color,
                      strokeColor: color,
                      strokeWeight: 3,
                      fillOpacity: 0.4
                    }}
                    paths={[facility.shape]}
                    onClick={() => this.polygonSelection(facility)}
                  />
                </div>
              );
            } else return null;
          })}

        {showInfowindow == true && (
          <InfoWindow
            position={center}
            options={{ maxWidth: 1000 }}
            onCloseClick={this.closeWindow.bind(this)}
          >
            <div className="text-center">
              <LoadingImage
                style={imgStyle}
                src={
                  "https://tools.wprdc.org/images/pittsburgh/facilities/" +
                  selectedFacility.name.replace(/ /g, "_") +
                  pngOrJpg(selectedFacility.name)
                }
              />
              <h4>{selectedFacility.name}</h4>
              <button
                onClick={() => this.props.setParentState({ selectedFacility })}
                className="btn btn-success"
              >
                Select
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    ));
    return (
      <div className="home-map">
        <MapComponent />
      </div>
    );
  }
}
