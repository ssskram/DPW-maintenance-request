import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class selectMap extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            lat: '40.445982',
            lng: '-79.997847'
        }
    }

    componentWillMount(){
        document.body.style.backgroundColor = "rgb(44, 62, 80)";
    }
    
    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }

    render() {
        return (
            <div id="map">
                <Map
                    className="map"
                    google={this.props.google}
                    zoom={13}
                    initialCenter={{
                        lat: this.state.lat,
                        lng: this.state.lng
                    }}>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDnUmaTY-ZQfPybWpoeLjonYMfHHK46uPg')
})(selectMap)