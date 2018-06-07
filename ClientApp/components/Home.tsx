import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FacilitiesStore from '../store/facilities';
import * as MyRequestsStore from '../store/myRequests';
import * as AllRequestsStore from '../store/allRequests';
import * as IssuesStore from '../store/issues';
import * as MessagesStore from '../store/messages';
import Messages from './Messages';
import Modal from 'react-modal';

const padding = {
    padding: '15px'
}

const iconPadding = {
    margin: '30px'
}

const iconSize = {
    fontSize: '45pt',
    color: 'rgb(44, 62, 80)'
}

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fffcf5',
        border: 'solid 1px rgba(160, 160, 160, 0.3)',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
        overflow: 'visible',
        maxWidth: '1300px',
        maxHeight: '100vh',
        overflowY: 'auto'
    }
};

type AllProps =
    MessagesStore.MessageState &
    MyRequestsStore.MyRequestsState &
    AllRequestsStore.AllRequestsState &
    FacilitiesStore.FacilitiesState &
    IssuesStore.IssuesState &
    typeof MessagesStore.actionCreators &
    typeof MyRequestsStore.actionCreators &
    typeof AllRequestsStore.actionCreators &
    typeof FacilitiesStore.actionCreators &
    typeof IssuesStore.actionCreators
    & RouteComponentProps<{}>;

export class Home extends React.Component<AllProps, any> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
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
                        <h3><i>Doors, Locks, & Windows</i></h3>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(electric)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Electrical & Lighting</i></h3>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(hvac)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Heating & Air Conditioning</i></h3>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(paint)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Carpentry & Painting</i></h3>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(plumbing)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Plumbing & Gas</i></h3>
                    </div>
                </div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-4">
                    <div className="col-md-12">
                        <img src={String(roofing)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Roofing</i></h3>
                    </div>
                </div>
                <div className="col-md-12"><h3>- or -</h3></div>
                <div style={padding} onClick={this.click.bind(this)} className="col-md-12">
                    <div className="col-md-12">
                        <img src={String(misc)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Miscellaneous</i></h3>
                    </div>
                </div>
                <Modal isOpen={this.state.modalIsOpen} style={modalStyles}>
                    <button className="topcorner btn-x" onClick={this.closeModal.bind(this)}>x</button>
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
    (state: ApplicationState) => ({ ...state.messages, ...state.myRequests, ...state.allRequests, ...state.facility, ...state.issues }),
    ({ ...MessagesStore.actionCreators, ...MyRequestsStore.actionCreators, ...AllRequestsStore.actionCreators, ...FacilitiesStore.actionCreators, ...IssuesStore.actionCreators })
)(Home as any) as typeof Home;