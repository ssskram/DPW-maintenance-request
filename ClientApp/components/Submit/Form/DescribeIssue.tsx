import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export default class DescribeIssue extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        $('.selectpicker').selectpicker();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.selectpicker').selectpicker('mobile');
        }
    }

    public render() {
        const { next } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2>Enter facility image & issue icon here</h2>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h2 className="form-h2">Select an issue</h2>
                        <select id="Issue" name="Issue" data-style="btn-info" className="selectpicker btn-form-control" title="Issue" data-dropup-auto="false">
                        </select>
                        <label htmlFor="Issue" className="error" hidden></label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h2 className="form-h2">Describe the issue</h2>
                        <textarea name="Description" className="form-control" placeholder="Description" rows={3} required></textarea>
                        <label htmlFor="Description" className="error" hidden />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h2 className="form-h2">Describe the location</h2>
                        <textarea name="LocationDescription" className="form-control" placeholder="Room, floor, etc." rows={3} required></textarea>
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
                <div className="row col-md-12">
                    <div className="col-md-4">
                        <button value='confirm' onClick={next.bind(this)} className="btn btn-danger">Back</button>
                    </div>
                    <div className="col-md-4" />
                    <div className="col-md-4">
                        <button className="btn btn-success">Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}