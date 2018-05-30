import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const imgStyle= {
    maxWidth: '300px',
    borderRadius: '10px',
    margin: '4px'
  }

export class selectMap extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            facilities: [],
            showingInfoWindow: true,
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

    markerClick(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
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
                    zoom={13}
                    onClick={this.onMapClicked.bind(this)}
                    initialCenter={{
                        lat: '40.445982',
                        lng: '-79.997847'
                    }}>
                    {facilities.map(facility =>
                        <Marker
                            oid={facility.oid}
                            name={facility.name}
                            neighborhood={facility.neighborhood}
                            img={facility.imgSrc}
                            position={{ lat: facility.lat, lng: facility.lng }}
                            onClick={this.markerClick.bind(this)}
                        />,
                    )}
                    <InfoWindow
                        marker={activeMarker}
                        visible={showingInfoWindow}>
                        <div className="text-center">
                            <img style={imgStyle} src={this.state.selectedPlace.img}/>
                            <h3>{this.state.selectedPlace.name}</h3>
                            <h4>{this.state.selectedPlace.neighborhood}</h4>
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