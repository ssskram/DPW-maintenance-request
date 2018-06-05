import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

const imgStyle = {
    maxWidth: '300px',
    borderRadius: '10px',
    margin: '7px'
}

export default class FacilityCard extends React.Component<any, any> {
    public render() {
        const {select} = this.props

        return (
            <div className="container-fluid" key={this.props.oid}>
                <div className="row">
                    <div className="facility" id={this.props.name}>
                        <div className="panel">
                            <div className="panel-body text-center">
                                <img style={imgStyle} src={this.props.img} />
                                <h3>{this.props.name}</h3>
                                <h4>{this.props.neighborhood}</h4>
                                <button onClick={select} id={this.props.oid} className="btn btn-success">Select</button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}