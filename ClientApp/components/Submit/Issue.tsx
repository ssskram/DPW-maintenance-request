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
    return (
      <div>
        <div className="text-center">
          <h2>Select an issue type</h2>
        </div>
        <div className='col-md-6 text-center'>
            <Link to={ '/' } type="button" className="btn btn-big">
                <img src='/Submit/icons/door.png'/><br/>
                <div className="hidden-md">Doors, Locks, & Windows</div>
            </Link>
        </div>
      </div>
    );
  }
}