import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

export default class Issue extends React.Component<RouteComponentProps<{}>, any> {
  constructor() {
    super();
    this.state = {
    }
  }

  public render() {

    const door = require('../../icons/door.png');
    const electric = require('../../icons/electric.png');
    const hvac = require('../../icons/hvac.png');
    const misc = require('../../icons/misc.png');
    const paint = require('../../icons/paint.png');
    const plumbing = require('../../icons/plumbing.png');
    const roofing = require('../../icons/roofing.png');

    return (
      <div>
        <div className="text-center">
          <h2>Select an issue type</h2>
        </div>
        <div className="col-md-12">
          <div className='col-md-6 text-center'>
            <Link to={'/'} type="button" className="btn btn-big">
              <img src={String(door)} /><br />
              <div>Doors, Locks, & Windows</div>
            </Link>
          </div>
          <div className='col-md-6 text-center'>
            <Link to={'/'} type="button" className="btn btn-big">
              <img src={String(electric)} /><br />
              <div>Electrical & Lighting</div>
            </Link>
          </div>
          <div className='col-md-6 text-center'>
            <Link to={'/'} type="button" className="btn btn-big">
              <img src={String(hvac)} /><br />
              <div>Heating & Air Conditioning</div>
            </Link>
          </div>
          <div className='col-md-6 text-center'>
            <Link to={'/'} type="button" className="btn btn-big">
              <img src={String(misc)} /><br />
              <div>Miscellaneous</div>
            </Link>
          </div>
          <div className='col-md-6 text-center'>
            <Link to={'/'} type="button" className="btn btn-big">
              <img src={String(paint)} /><br />
              <div>Carpentry & Painting</div>
            </Link>
          </div>
          <div className='col-md-6 text-center'>
            <Link to={'/'} type="button" className="btn btn-big">
              <img src={String(plumbing)} /><br />
              <div>Plumbing & Gas</div>
            </Link>
          </div>
          <div className='col-md-6 text-center'>
            <Link to={'/'} type="button" className="btn btn-big">
              <img src={String(roofing)} /><br />
              <div>Roofing</div>
            </Link>
          </div>        
        </div>
      </div>
    );
  }
}