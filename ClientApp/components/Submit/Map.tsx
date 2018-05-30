import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import Select from './Select';

const imgStyle= {
    maxWidth: '300px',
    borderRadius: '10px',
    margin: '4px'
  }

export class selectMap extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            center: {
                lat: '40.437470539681442',
                lng: '-79.987124601795273'
            },
            zoom: 13,
            showingInfoWindow: true,
            facilities: [],
            activeMarker: {},
            selectedPlace: {}
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/api/facilities/map', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ facilities: data }));
    }
    componentWillMount() {
        document.body.style.backgroundColor = "rgb(44, 62, 80)";
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = null;
    }

    onMapClicked() {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    passToForm() {
        alert("test")
    }

    markerClick(props, marker) {
        this.setState({
            showingInfoWindow: true,
            selectedPlace: props,
            activeMarker: marker
        });
    }

    render() {
        const { facilities } = this.state;
        const { showingInfoWindow } = this.state;
        const { activeMarker } = this.state;

        return (
            <div id="map">
                <Map
                    className="map"
                    google={this.props.google}
                    initialCenter={this.state.center}
                    zoom={this.state.zoom}
                    onClick={this.onMapClicked.bind(this)}>
                    {facilities.map(facility =>
                        <Marker
                            oid={facility.oid}
                            name={facility.name}
                            neighborhood={facility.neighborhood}
                            img={facility.imgSrc}
                            lat={facility.lat}
                            lng={facility.lng}
                            position={{ lat: facility.lat, lng: facility.lng }}
                            onClick={this.markerClick.bind(this)}
                            icon={{
                                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                            }}
                        />,
                    )}
                    <InfoWindow
                        marker={activeMarker}
                        visible={showingInfoWindow}>
                        <div className="text-center">
                            <img style={imgStyle} src={this.state.selectedPlace.img}/>
                            <h3>{this.state.selectedPlace.name}</h3>
                            <h4>{this.state.selectedPlace.neighborhood}</h4>
                            <Select />
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDnUmaTY-ZQfPybWpoeLjonYMfHHK46uPg')
})(selectMap)