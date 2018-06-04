import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import ConfirmFacility from './Form/ConfirmFacility';

export default class Floater extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
        }
    }

    render() {
        return (
            <div>
                <ConfirmFacility
                    img={this.props.img}
                    name={this.props.name}
                    neighborhood={this.props.neighborhood}
                    />
            </div>
        );
    }
}