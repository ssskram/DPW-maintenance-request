import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { MemoryRouter, Link, NavLink, Redirect } from 'react-router-dom';

const imgStyle= {
    maxWidth: '300px',
    borderRadius: '10px',
    margin: '4px'
  }

export class selectMap extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
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

    markerClick(props, marker) {
        this.setState({
            showingInfoWindow: true,
            selectedPlace: props,
            activeMarker: marker
        });
    }

    onMapClicked() {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
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
                    initialCenter={{
                        lat: '40.437470539681442',
                        lng: '-79.987124601795273'
                    }}
                    zoom={12}
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
                            <MemoryRouter>
                                <Link to={ '/Issue' } className="btn btn-default">Select</Link>
                            </MemoryRouter>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA89-c5tGTUcwg5cbyoY9QX1nFwATbvk6g')
})(selectMap)