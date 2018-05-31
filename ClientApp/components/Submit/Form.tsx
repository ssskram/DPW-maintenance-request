import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

export default class Form extends React.Component<RouteComponentProps<{}>, any> {
    constructor() {
        super();
        this.state = {
        }
    }

    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2>Enter facility image & issue icon here</h2>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h2 className="form-h2">Describe the issue</h2>
                        <textarea name="Description" className="form-control" placeholder="Description" rows={4} required></textarea>
                        <label htmlFor="Description" className="error" hidden />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h2 className="form-h2">Describe the location</h2>
                        <textarea name="LocationDescription" className="form-control" placeholder="Room, floor, etc." rows={4} required></textarea>
                        <label htmlFor="LocationDescription" className="error" hidden />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h2 className="form-h2">Enter your phone number</h2>
                        <input name="Phone" className="form-control" placeholder="Phone number" required />
                        <label htmlFor="Phone" className="error" hidden />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12 text-center">
                        <Link to={ '/MyRequests' } className="btn btn-submit">Submit</Link>
                    </div>
                </div>
            </div>
        );
    }
}