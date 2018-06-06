import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import * as IssuesStore from '../../../store/issues';
import { ApplicationState } from '../../../store';
import { connect } from 'react-redux';
import * as MessagesStore from '../../../store/messages';
declare var $: any;

const marginTop = {
    marginTop: '20px'
}

const red = {
    color: 'red'
}

type AllProps =
    IssuesStore.IssuesState &
    MessagesStore.MessageState &
    typeof IssuesStore.actionCreators &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{}>;

export class DescribeIssue extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            issue: '',
            description: '',
            location: '',
            phone: ''
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        this.props.requestAllIssues()
        $('.selectpicker').selectpicker("refresh")
    }

    submit(event) {
        event.preventDefault();
        // enter post here
        this.props.success()
    }

    public render() {
        const { issue, description, location, phone } = this.state
        const { next } = this.props;
        const { issues } = this.props;
        const isEnabled =
            issue.length > 0 &&
            description.length > 0 &&
            location.length > 0 &&
            phone.length > 0;

        return (
            <div className="form">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2>{this.props.name}</h2>
                        <h3 style={red}>{this.props.type}</h3>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h3 className="form-h3">Select an issue</h3>
                        <select id="Issue" name="issue" data-style="btn-info" value={this.state.issue} className="selectpicker btn-form-control" title="Issue" data-dropup-auto="false" onChange={this.handleChange.bind(this)}>
                            {issues.map(issue => {
                                if (issue.type == this.props.type)
                                    return <option key={issue.name}>{issue.name}</option>
                            })}
                        </select>
                        <label htmlFor="Issue" className="error" hidden></label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h3 className="form-h3">Describe the issue</h3>
                        <textarea name="description" className="form-control" value={this.state.description} placeholder="Description" rows={3} onChange={this.handleChange.bind(this)}></textarea>
                        <label htmlFor="Description" className="error" hidden />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h3 className="form-h3">Describe the location</h3>
                        <textarea name="location" className="form-control" value={this.state.location} placeholder="Room, floor, etc." rows={3} onChange={this.handleChange.bind(this)}></textarea>
                        <label htmlFor="LocationDescription" className="error" hidden />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <h3 className="form-h3">Enter your phone number</h3>
                        <input name="phone" className="form-control" value={this.state.phone} placeholder="Phone number" onChange={this.handleChange.bind(this)} />
                        <label htmlFor="Phone" className="error" hidden />
                    </div>
                </div>
                <div className="row col-md-12" style={marginTop}>
                    <div className="col-md-6 text-center">
                        <button value='issue' onClick={next.bind(this)} className="btn btn-danger">Back</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <Link to={'/'} disabled={!isEnabled} className="btn btn-success" onClick={this.submit.bind(this)}>Submit</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.messages, ...state.issues }),
    ({ ...MessagesStore.actionCreators, ...IssuesStore.actionCreators })
)(DescribeIssue as any) as typeof DescribeIssue;