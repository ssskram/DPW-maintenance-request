import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

const marginTop = {
    marginTop: '20px'
}

const red = {
    color: 'red'
}

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
                        <h2>{this.props.name}</h2>
                        <h3 style={red}>{this.props.type}</h3>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h3 className="form-h3">Select an issue</h3>
                        <select id="Issue" name="Issue" data-style="btn-info" className="selectpicker btn-form-control" title="Issue" data-dropup-auto="false">
                        </select>
                        <label htmlFor="Issue" className="error" hidden></label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h3 className="form-h3">Describe the issue</h3>
                        <textarea name="Description" className="form-control" placeholder="Description" rows={3} required></textarea>
                        <label htmlFor="Description" className="error" hidden />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h3 className="form-h3">Describe the location</h3>
                        <textarea name="LocationDescription" className="form-control" placeholder="Room, floor, etc." rows={3} required></textarea>
                        <label htmlFor="LocationDescription" className="error" hidden />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h3 className="form-h3">Enter your phone number</h3>
                        <input name="Phone" className="form-control" placeholder="Phone number" required />
                        <label htmlFor="Phone" className="error" hidden />
                    </div>
                </div>
                <div className="row col-md-12" style={marginTop}>
                    <div className="col-md-6 text-center">
                        <button value='issue' onClick={next.bind(this)} className="btn btn-danger">Back</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button className="btn btn-success">Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}