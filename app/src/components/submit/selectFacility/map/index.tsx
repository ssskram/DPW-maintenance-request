
// returns all projects to home map

import * as React from "react"
import { Helmet } from "react-helmet"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Polygon, InfoWindow } from "react-google-maps"
import randomcolor from 'randomcolor'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../../store'
import * as OpenRequest from '../../../../store/openRequest'
import * as AllRequests from '../../../../store/allRequests'
import setCenter from '../../../../functions/setCenter'
import * as types from '../../../../store/types'
import LoadingImage from '../../../utilities/loadingImage'
import Modal from 'react-responsive-modal'
import VerifyUnique from './../verifyUnique'

const mapStyle = require('./featurelessLight.json')
const imgStyle = {
    maxHeight: '150px',
    borderRadius: '10px',
    margin: '0 auto'
}

interface actionProps {
    updateRequest: (newRequest: types.newRequest) => void
}

type props =
    types.facilities &
    types.openRequest &
    types.allRequests &
    actionProps

type state = {
    zoom: number,
    center: any,
    selectedFacility: types.facility,
    showInfowindow: boolean,
    modalIsOpen: boolean
}

export class SelectFacility extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            zoom: 13,
            center: { lat: 40.437470539681442, lng: -79.987124601795273 },
            selectedFacility: {} as any,
            showInfowindow: false,
            modalIsOpen: false
        }
    }

    polygonSelection(facility) {
        this.setState({
            center: setCenter(facility.shape),
            zoom: 16,
            selectedFacility: facility,
            showInfowindow: true
        })
    }

    setBuilding() {
        const newRequest = {
            building: this.state.selectedFacility.name,
            department: this.props.openRequest.department,
            description: this.props.openRequest.description,
            issueType: this.props.openRequest.issueType,
            issue: this.props.openRequest.issue,
            location: this.props.openRequest.location,
            phone: this.props.openRequest.phone
        }
        this.props.updateRequest(newRequest)
    }

    closeWindow() {
        this.setState({
            showInfowindow: false,
            zoom: 13,
            center: { lat: 40.437470539681442, lng: -79.987124601795273 }
        })
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        })
    }

    render() {
        const {
            zoom,
            center,
            selectedFacility,
            showInfowindow,
            modalIsOpen
        } = this.state

        const {
            facilities,
            allRequests
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
                                        paths={[facility.shape]}
                                        onClick={() => this.polygonSelection(facility)}>
                                    </Polygon>
                                </div>

                            )
                        } else return
                    })
                }

                {showInfowindow == true &&
                    <InfoWindow position={center} options={{maxWidth: 1000}} onCloseClick={this.closeWindow.bind(this)}>
                        <div className='text-center'>
                            <LoadingImage style={imgStyle} src={"https://tools.wprdc.org/images/pittsburgh/facilities/" + selectedFacility.name.replace(/ /g, "_") + ".jpg"} />
                            <h4>{selectedFacility.name}</h4>
                            <button onClick={this.openModal.bind(this)} className='btn btn-success'>Select</button>
                        </div>
                    </InfoWindow>
                }

            </GoogleMap>
        )
        return (
            <div id='home-map'>
                <Helmet><style>{'.col-sm-9,body{padding:0!important}.col-sm-9{width:100%!important}body{overflow:hidden}'}</style></Helmet>
                <MapComponent />
                <Modal
                    open={modalIsOpen}
                    onClose={this.closeModal.bind(this)}
                    classNames={{
                        overlay: 'custom-overlay',
                        modal: 'custom-modal'
                    }}
                    center>
                    <VerifyUnique
                        facility={selectedFacility}
                        confirm={this.setBuilding.bind(this)}
                        allRequests={allRequests} />
                </Modal>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.openRequest,
        ...state.allRequests
    }),
    ({
        ...OpenRequest.actionCreators,
        ...AllRequests.actionCreators
    })
)(SelectFacility)