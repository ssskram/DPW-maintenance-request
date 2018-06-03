import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { MemoryRouter, Link, NavLink, Redirect } from 'react-router-dom';

const imgStyle = {
    maxWidth: '300px',
    borderRadius: '10px',
    margin: '4px'
}

export default class selectMap extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-center">
            <img style={imgStyle} src={this.props.img}/>
            <h3>{this.props.name}</h3>
            <h4>{this.props.neighborhood}</h4>
            <MemoryRouter>
                <Link to={ '/Issue' } className="btn btn-default">Select</Link>
            </MemoryRouter>
        </div>
        );
    }
}