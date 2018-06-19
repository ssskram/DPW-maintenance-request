import * as React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Modal from 'react-responsive-modal';
import Overlay from '../Form/Overlay';

export class selectMap extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            selectedPlace: {}
        }
    }

    componentDidMount() {

        // ping server
        fetch('/api/ping/pong', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data == 0) {
                    window.location.reload();
                }
            });
    }

    componentWillMount() {
        document.body.style.backgroundColor = "rgb(44, 62, 80)";
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = null;
    }

    markerClick(props) {
        let self = this;
        self.setState({
            modalIsOpen: true,
            selectedPlace: props,
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        const { modalIsOpen } = this.state;
        const place = require('../../../icons/place.png');

        return (
            <div id="map">
                <Map
                    className="map"
                    google={this.props.google}
                    initialCenter={{
                        lat: '40.437470539681442',
                        lng: '-79.987124601795273'
                    }}
                    zoom={13}>
                    {this.props.facilities.map(facility =>
                        <Marker
                            issues={this.props.issues}
                            key={facility.oid}
                            oid={facility.oid}
                            name={facility.name}
                            neighborhood={facility.neighborhood}
                            img={facility.img}
                            lat={facility.lat}
                            lng={facility.lng}
                            position={{ lat: facility.lat, lng: facility.lng }}
                            onClick={this.markerClick.bind(this)}
                            icon={{
                                url: place,
                            }}
                        />,
                    )}
                </Map>
                <Modal
                    open={modalIsOpen}
                    onClose={this.closeModal.bind(this)}
                    classNames={{
                        transitionEnter: 'transition-enter',
                        transitionEnterActive: 'transition-enter-active',
                        overlay: 'custom-overlay',
                        modal: 'custom-modal'
                    }}
                    animationDuration={1000}
                    center>
                    <Overlay
                        img={this.state.selectedPlace.img}
                        name={this.state.selectedPlace.name}
                        neighborhood={this.state.selectedPlace.neighborhood} />
                </Modal>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA89-c5tGTUcwg5cbyoY9QX1nFwATbvk6g')
})(selectMap)