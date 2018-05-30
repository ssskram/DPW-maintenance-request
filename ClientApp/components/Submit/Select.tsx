import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

export default class Select extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
    }
  }

  public render() {
    return (
      <div>
        <a href="/Form" className="btn btn-default">Select</a>
      </div>
    );
  }
}