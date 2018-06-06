import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FacilitiesStore from '../store/facilities';
import * as MyRequestsStore from '../store/myRequests';
import * as AllRequestsStore from '../store/allRequests';
import * as IssuesStore from '../store/issues';

const iconSize = {
    fontSize: '45pt',
    color: 'rgb(44, 62, 80)'
}
const or = {
    marginTop: '15px',
    marginBottom: '22px'
}

type AllProps =
    MyRequestsStore.MyRequestsState &
    AllRequestsStore.AllRequestsState &
    FacilitiesStore.FacilitiesState &
    IssuesStore.IssuesState &
    typeof MyRequestsStore.actionCreators &
    typeof AllRequestsStore.actionCreators &
    typeof FacilitiesStore.actionCreators &
    typeof IssuesStore.actionCreators & RouteComponentProps<{}>;

export class Home extends React.Component<AllProps, {}> {
    componentDidMount() {
        this.props.requestAllFacilities()
        this.props.requestMyRequests()
        this.props.requestAllRequests()
        this.props.requestAllIssues()
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
                <h1>DPW <strong>Maintenance Requests</strong></h1>
                <hr />
                <h1>Find your facility...</h1>
                <br />
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <span style={iconSize} className='glyphicon glyphicon-map-marker'></span>
                    </div>
                    <div className="col-md-2">
                        <h3 style={or}>- or -</h3>
                    </div>
                    <div className="col-md-2">
                        <span style={iconSize} className='glyphicon glyphicon-list'></span>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <br />
                <h1>...select an issue type...</h1>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <img src={String(door)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Doors, Locks, & Windows</i></h3>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper dolor. Fusce luctus luctus.</h4>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <img src={String(electric)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Eletrical & Lighting</i></h3>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper dolor. Fusce luctus luctus.</h4>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <img src={String(hvac)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Heating & Air Conditioning</i></h3>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper dolor. Fusce luctus luctus.</h4>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <img src={String(misc)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Miscellaneous</i></h3>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper dolor. Fusce luctus luctus.</h4>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <img src={String(paint)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Carpentry & Painting</i></h3>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper dolor. Fusce luctus luctus.</h4>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <img src={String(plumbing)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Plumbing & Gas</i></h3>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper dolor. Fusce luctus luctus.</h4>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <img src={String(roofing)}></img>
                    </div>
                    <div className="col-md-12">
                        <h3><i>Roofing</i></h3>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper dolor. Fusce luctus luctus.</h4>
                    </div>
                </div>  
                <br/>
                <div className="row">
                    <h1>...describe, submit, and track!</h1>
                </div>
                <br/>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.myRequests, ...state.allRequests, ...state.facility, ...state.issues }),
    ({ ...MyRequestsStore.actionCreators, ...AllRequestsStore.actionCreators, ...FacilitiesStore.actionCreators, ...IssuesStore.actionCreators })
)(Home as any) as typeof Home;