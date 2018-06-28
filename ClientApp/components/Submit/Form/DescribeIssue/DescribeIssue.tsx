import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from '../../../../store';
import { connect } from 'react-redux';
import * as MessagesStore from '../../../../store/messages';
import * as IssuesStore from '../../../../store/issues';
import TextArea from '../../../FormElements/textarea';
import Select from '../../../FormElements/select';
import Input from '../../../FormElements/input';
import AlternativePrompt from './AlternativePrompt'

const marginTop = {
    marginTop: '20px'
}

const red = {
    color: 'red'
}

export class DescribeIssue extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            options: [{ "value": '...loading...', "label": '...loading...' }],
            building: this.props.name,
            issue: '',
            description: '',
            location: '',
            phone: '',
            clearable: false,
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.requestAllIssues()
    }

    componentWillReceiveProps() {
        let self = this
        // add options to select
        var futureOptions: any[] = [];
        this.props.issues.forEach(function (element) {
            if (element.type == self.props.type) {
                var json = { "value": element.name, "label": element.name, "name": 'issue' };
                futureOptions.push(json)
            }
        })
        self.setState({
            options: futureOptions
        })
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    clearIssue() {
        this.setState({ issue: '' });
    }

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({ issue: self.state.issue, building: self.state.building, description: self.state.description, location: self.state.location, phone: self.state.phone })
        let cleaned_data = data.replace(/'/g, '');
        self.setState({ description: '' })
        fetch('/api/requests/post', {
            method: 'POST',
            body: cleaned_data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        this.props.success()
        this.setState({ redirect: true })
    }

    public render() {
        const { issue, description, location, phone } = this.state
        const { next } = this.props;
        const { redirect } = this.state;
        const { options } = this.state;
        const isEnabled =
            issue != '' &&
            description.length > 0 &&
            location.length > 0 &&
            phone.length > 0;
        const alternativePrompt =
            issue == 'Pest Control' ||
            issue == 'Elevators' ||
            issue == 'Tree Issues' ||
            issue == 'Masonry/Concrete Work' ||
            issue == 'Landscape Maintenance (Snow or Leaves)' ||
            issue == 'Door Name Lettering' ||
            issue == 'Office Renovation'

        if (redirect) {
            return <Redirect to='/' />;
        }

        if (alternativePrompt) {
            return <AlternativePrompt issue={issue} clear={this.clearIssue.bind(this)} />
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3>{this.props.name}</h3>
                        <h4 style={red}>{this.props.type}</h4>
                    </div>
                </div>
                <div className="form-group">
                    <Select
                        value={issue}
                        name="issue"
                        header='Select an issue'
                        placeholder='Select...'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        options={options}
                    />

                    <TextArea
                        value={description}
                        name="description"
                        header="Describe the issue"
                        placeholder="Description"
                        callback={this.handleChildChange.bind(this)}
                    />

                    <TextArea
                        value={location}
                        name="location"
                        header="Describe the location"
                        placeholder="Room, floor, etc."
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Input
                        value={phone}
                        name="phone"
                        header="Enter your phone number"
                        placeholder="Phone number"
                        callback={this.handleChildChange.bind(this)}
                    />
                </div>

                <div className="row col-md-12" style={marginTop}>
                    <div className="col-md-6 text-center">
                        <button value='issue' onClick={next.bind(this)} className="btn btn-danger">Back</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button disabled={!isEnabled} className="btn btn-success" onClick={this.post.bind(this)}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.issues
    }),
    ({
        ...MessagesStore.actionCreators,
        ...IssuesStore.actionCreators
    })
)(DescribeIssue as any) as typeof DescribeIssue;