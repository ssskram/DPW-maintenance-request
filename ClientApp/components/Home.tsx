import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FacilitiesStore from '../store/facilities';
import * as MyRequestsStore from '../store/myRequests';
import * as Ping from '../store/ping';
import * as AllRequestsStore from '../store/allRequests';
import * as IssuesStore from '../store/issues';
import * as MessagesStore from '../store/messages';
import * as User from '../store/user';
import * as Key from '../store/keys';
import Messages from './Messages';
import Modal from 'react-responsive-modal'

const padding = {
    padding: '15px'
}

const iconSize = {
    fontSize: '45pt',
    color: 'rgb(44, 62, 80)'
}

export class Home extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // hit stores
        this.props.getGoogleKey()
        this.props.requestAllFacilities()
        this.props.requestMyRequests()
        this.props.requestAllRequests()
        this.props.requestAllIssues()
    }

    componentWillUnmount() {
        this.props.clear()
    }

    click() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    public render() {
        const door = require('../icons/door.png');
        const electric = require('../icons/electric.png');
        const hvac = require('../icons/hvac.png');
        const misc = require('../icons/misc.png');
        const paint = require('../icons/paint.png');
        const plumbing = require('../icons/plumbing.png');
        const roofing = require('../icons/roofing.png');

        const { modalIsOpen } = this.state;

        return (
            <div className="text-center">
                <h2>DPW <strong>Maintenance Requests</strong></h2>
                <hr />
                <Messages messages={this.props.messages} />
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(door)}></img>
                    </div>
                    <div className="col-md-12">
                        <h4><i>Doors, Locks, & Windows</i></h4>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(electric)}></img>
                    </div>
                    <div className="col-md-12">
                        <h4><i>Electrical & Lighting</i></h4>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(hvac)}></img>
                    </div>
                    <div className="col-md-12">
                        <h4><i>Heating & Air Conditioning</i></h4>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(paint)}></img>
                    </div>
                    <div className="col-md-12">
                        <h4><i>Carpentry & Painting</i></h4>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(plumbing)}></img>
                    </div>
                    <div className="col-md-12">
                        <h4><i>Plumbing & Gas</i></h4>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(roofing)}></img>
                    </div>
                    <div className="col-md-12">
                        <h4><i>Roofing</i></h4>
                    </div>
                </div>
                <div className="col-md-12"><h4>- or -</h4></div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-12">
                    <div className="col-md-12">
                        <img src={String(misc)}></img>
                    </div>
                    <div className="col-md-12">
                        <h4><i>Miscellaneous</i></h4>
                    </div>
                </div>
                <Modal
                    open={modalIsOpen}
                    onClose={this.closeModal.bind(this)}
                    classNames={{
                        transitionEnter: 'transition-enter',
                        transitionEnterActive: 'transition-enter-active',
                        transitionExit: 'transition-exit-active',
                        transitionExitActive: 'transition-exit-active',
                        overlay: 'custom-overlay',
                        modal: 'custom-modal'
                    }}
                    animationDuration={1000}
                    center>
                    <div className="row text-center">
                        <div className="col-md-6">
                            <Link style={padding} to={'/Map'} className="btn btn-big"><span style={iconSize} className='glyphicon glyphicon-map-marker'></span><br />Select facility from map</Link>
                        </div>
                        <div className="col-md-6">
                            <Link style={padding} to={'/Search'} className="btn btn-big"><span style={iconSize} className='glyphicon glyphicon-list'></span><br />Select facility from list</Link>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.myRequests,
        ...state.allRequests,
        ...state.facility,
        ...state.issues,
        ...state.user,
        ...state.ping,
        ...state.key
    }),
    ({
        ...MessagesStore.actionCreators,
        ...MyRequestsStore.actionCreators,
        ...AllRequestsStore.actionCreators,
        ...FacilitiesStore.actionCreators,
        ...IssuesStore.actionCreators,
        ...User.actionCreators,
        ...Ping.actionCreators,
        ...Key.actionCreators
    })
)(Home as any) as typeof Home;