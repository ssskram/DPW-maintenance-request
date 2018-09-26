import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from '../../../../store';
import { connect } from 'react-redux';
import * as MessagesStore from '../../../../store/messages';
import * as IssuesStore from '../../../../store/issues';
import TextArea from '../../../FormElements/textarea';
import Select from '../../../FormElements/select';
import Input from '../../../FormElements/input';
import Phone from '../../../FormElements/phone';
import AlternativePrompt from './AlternativePrompt'

const marginTop = {
    marginTop: '20px'
}

const red = {
    color: 'red'
}

const Departments = [
    { value: 'Animal Control', label: 'Animal Control', name: 'department' },
    { value: 'Bureau of Neighborhood Empowerment', label: 'Bureau of Neighborhood Empowerment', name: 'department' },
    { value: 'Citiparks', label: 'Citiparks', name: 'department' },
    { value: 'Citizen’s Police Review Board', label: 'Citizen’s Police Review Board', name: 'department' },
    { value: 'City Clerk', label: 'City Clerk', name: 'department' },
    { value: 'City Controller', label: 'City Controller', name: 'department' },
    { value: 'City Council', label: 'City Council', name: 'department' },
    { value: 'City Planning', label: 'City Planning', name: 'department' },
    { value: 'Commission on HR', label: 'Commission on HR', name: 'department' },
    { value: 'Community Affairs', label: 'Community Affairs', name: 'department' },
    { value: 'DOMI', label: 'DOMI', name: 'department' },
    { value: 'EMA', label: 'EMA', name: 'department' },
    { value: 'EMS', label: 'EMS', name: 'department' },
    { value: 'EORC', label: 'EORC', name: 'department' },
    { value: 'Ethics Hearing Board', label: 'Ethics Hearing Board', name: 'department' },
    { value: 'Finance', label: 'Finance', name: 'department' },
    { value: 'Fire', label: 'Fire', name: 'department' },
    { value: 'HR & Civil Service', label: 'HR & Civil Service', name: 'department' },
    { value: 'Innovation & Performance', label: 'Innovation & Performance', name: 'department' },
    { value: 'Law', label: 'Law', name: 'department' },
    { value: "Mayor's Office", label: "Mayor's Office", name: 'department' },
    { value: 'OMB', label: 'OMB', name: 'department' },
    { value: 'OMI', label: 'OMI', name: 'department' },
    { value: 'Pension', label: 'Pension', name: 'department' },
    { value: 'Pittsburgh Partnership', label: 'Pittsburgh Partnership', name: 'department' },
    { value: 'PLI', label: 'PLI', name: 'department' },
    { value: 'Police', label: 'Police', name: 'department' },
    { value: 'Public Safety', label: 'Public Safety', name: 'department' },
    { value: 'Public Works', label: 'Public Works', name: 'department' }
]

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
            department: '',
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

    handlePhone(number) {
        this.setState ({
            phone: number
        })
    }

    clearIssue() {
        this.setState({ issue: '' });
    }

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({
            issue: self.state.issue,
            building: self.state.building,
            description: self.state.description,
            department: self.state.department,
            location: self.state.location,
            phone: self.state.phone
        })
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
        const {
            issue,
            description,
            location,
            phone,
            redirect,
            department,
            options
        } = this.state

        const {
            next
        } = this.props;

        const isEnabled =
            issue != '' &&
            description != '' &&
            location != '' &&
            phone != ''

        const alternativePrompt =
            issue == 'Pest Control' ||
            issue == 'Elevators' ||
            issue == 'Tree Issues' ||
            issue == 'Masonry/Concrete Work' ||
            issue == 'Landscape Maintenance (Snow or Leaves)' ||
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
                        value={department}
                        name="department"
                        header="Select your department"
                        placeholder='Select department'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        options={Departments}
                    />

                    <Phone
                        value={phone}
                        name="phone"
                        header="Enter your phone number"
                        placeholder="Phone number"
                        callback={this.handlePhone.bind(this)}
                    />

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