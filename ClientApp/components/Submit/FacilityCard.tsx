import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

const imgStyle = {
    maxHeight: '150px',
    borderRadius: '10px',
    margin: '0 auto'
}

export default class FacilityCard extends React.Component<any, any> {
    public render() {
        const { select } = this.props

        return (
            <div className="container-fluid" key={this.props.oid}>
                <div className="row">
                    <div className="facility" id={this.props.name}>
                        <div className="panel">
                            <div className="panel-body text-center">
                                <div className="col-md-6">
                                    <img style={imgStyle} className="img-responsive" src={this.props.img} />
                                </div>
                                <div className="col-md-6">
                                    <br/>
                                    <h4>{this.props.name}</h4>
                                    <h5>{this.props.neighborhood}</h5>
                                    <button onClick={select} id={this.props.oid} className="btn btn-success">Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}