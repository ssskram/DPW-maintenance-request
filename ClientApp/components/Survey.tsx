import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import * as MessagesStore from '../store/messages';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Select from 'react-select';

const marginTop = {
    marginTop: '20px'
}

type AllProps =
    MessagesStore.MessageState &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{}>;

export class Survey extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            name: '',
            department: '',
            body: '',
            futureUserTesting: '',
            clearable: false,
            redirect: false
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSelect = (futureUserTesting) => {
        if (futureUserTesting) {
            this.setState({ futureUserTesting: futureUserTesting.value });
        }
    }

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({ name: self.state.name, department: self.state.department, body: self.state.body, futureUserTesting: self.state.futureUserTesting })
        self.setState({ body: '' })
        fetch('/api/survey/post', {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        this.props.surveySubmitted()
        this.setState({ redirect: true })
    }

    public render() {
        const { name, department, body, futureUserTesting, clearable, redirect } = this.state
        const isEnabled =
            name.length > 0 &&
            department.length > 0 &&
            body.length > 0 &&
            futureUserTesting.length > 0;

        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className="form col-md-12">
                <div id="formfields">
                    <div className="form-group">
                        <div className="col-md-12">
                            <h3 className="form-h3">Name</h3>
                            <input name="name" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)}></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <h3 className="form-h3">Department</h3>
                            <input name="department" className="form-control" value={this.state.department} onChange={this.handleChange.bind(this)}></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <h3 className="form-h3">Thoughts, suggestions, etc.</h3>
                            <textarea name="body" className="form-control" rows={6} value={this.state.body} onChange={this.handleChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <h3 className="form-h3">Would you be willing to serve as a participant in user testing for other applications?</h3>
                            <Select
                                name="futureUserTesting"
                                clearable={clearable}
                                value={this.state.futureUserTesting}
                                onChange={this.handleSelect}
                                options={[
                                    { value: 'Yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="row col-md-12" style={marginTop}>
                    <div className="col-md-12 text-center">
                        <button disabled={!isEnabled} className="btn btn-success" onClick={this.post.bind(this)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.messages,
    MessagesStore.actionCreators
)(Survey as any) as typeof Survey;
