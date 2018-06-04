import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

const iconStyle = {
    height: '75px',
}

export default class SelectIssue extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    public render() {
        const door = require('../../../icons/door.png');
        const electric = require('../../../icons/electric.png');
        const hvac = require('../../../icons/hvac.png');
        const misc = require('../../../icons/misc.png');
        const paint = require('../../../icons/paint.png');
        const plumbing = require('../../../icons/plumbing.png');
        const roofing = require('../../../icons/roofing.png');

        return (
            <div>
                <div className="text-center">
                    <h1>Select an issue type</h1>
                </div>
                <div>
                    <div className='col-md-4 text-center'>
                        <Link to={'/Form'} type="button" className="btn btn-big">
                            <img src={String(door)} style={iconStyle} /><br />
                            <div>Doors, Locks, & Windows</div>
                        </Link>
                    </div>
                    <div className='col-md-4 text-center'>
                        <Link to={'/Form'} type="button" className="btn btn-big">
                            <img src={String(electric)} style={iconStyle} /><br />
                            <div>Electrical & Lighting</div>
                        </Link>
                    </div>
                    <div className='col-md-4 text-center'>
                        <Link to={'/Form'} type="button" className="btn btn-big">
                            <img src={String(hvac)} style={iconStyle} /><br />
                            <div>Heating & Air Conditioning</div>
                        </Link>
                    </div>
                    <div className='col-md-4 text-center'>
                        <Link to={'/Form'} type="button" className="btn btn-big">
                            <img src={String(misc)} style={iconStyle} /><br />
                            <div>Miscellaneous</div>
                        </Link>
                    </div>
                    <div className='col-md-4 text-center'>
                        <Link to={'/Form'} type="button" className="btn btn-big">
                            <img src={String(paint)} style={iconStyle} /><br />
                            <div>Carpentry & Painting</div>
                        </Link>
                    </div>
                    <div className='col-md-4 text-center'>
                        <Link to={'/Form'} type="button" className="btn btn-big">
                            <img src={String(plumbing)} style={iconStyle} /><br />
                            <div>Plumbing & Gas</div>
                        </Link>
                    </div>
                    <div className='col-md-4 text-center'>
                        <Link to={'/Form'} type="button" className="btn btn-big">
                            <img src={String(roofing)} style={iconStyle} /><br />
                            <div>Roofing</div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}