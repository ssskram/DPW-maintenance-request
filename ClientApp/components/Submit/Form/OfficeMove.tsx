import * as React from 'react';
import { ApplicationState } from '../../../store';
import { connect } from 'react-redux';
import * as MessagesStore from '../../../store/messages';
import Select from '../../FormElements/select';
import Input from '../../FormElements/input';
import Number from '../../FormElements/numbers'

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

const ExistingorNew = [
    { value: 'Yes', label: 'Yes', name: 'newEmployee' },
    { value: 'No', label: 'No', name: 'newEmployee' }
]

export class OfficeMove extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            department: '',
            newEmployee: '',
            countPersonnel: 0,
            currentLocation: '',
            desiredLocation: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    handleNumber(event, maskedvalue, floatvalue) {
        this.setState({
            countPersonnel: floatvalue
        })
    }

    post() {
        this.props.success()
        this.props.closeModal()
    }

    public render() {
        const {
            name,
            phone,
            department,
            newEmployee,
            countPersonnel,
            currentLocation,
            desiredLocation
        } = this.state

        return (
            <div>
                <div className="form-group">
                    <Input
                        value={name}
                        name="name"
                        header="Enter your name"
                        placeholder="Name"
                        required={true}
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Input
                        value={phone}
                        name="phone"
                        header="Enter your phone number"
                        placeholder="Phone number"
                        required={true}
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Select
                        value={department}
                        name="department"
                        header="Select your department"
                        placeholder='Select department'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        required={true}
                        options={Departments}
                    />

                    <Number
                        value={countPersonnel}
                        name="countPersonnel"
                        header="Number of personnel"
                        required={true}
                        placeholder="Count personnel"
                        callback={this.handleNumber.bind(this)}
                    />

                    <Select
                        value={newEmployee}
                        name="newEmployee"
                        header="Is this for a new employee?"
                        placeholder='Yes or no'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        required={true}
                        options={ExistingorNew}
                    />

                    {newEmployee != '' &&
                        <div>
                            {newEmployee == 'No' &&
                                <Input
                                    value={currentLocation}
                                    name="currentLocation"
                                    header="What is the current location?"
                                    placeholder="Building, floor, room, etc."
                                    required={true}
                                    callback={this.handleChildChange.bind(this)}
                                />
                            }
                            <Input
                                value={desiredLocation}
                                name="desiredLocation"
                                header="What is the desired location?"
                                placeholder="Building, floor, room, etc."
                                required={true}
                                callback={this.handleChildChange.bind(this)}
                            />
                        </div>
                    }
                </div>

                <div className="row col-md-12 text-center">
                    <button className="btn btn-success" onClick={this.post.bind(this)}>Submit</button>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages
    }),
    ({
        ...MessagesStore.actionCreators
    })
)(OfficeMove as any) as typeof OfficeMove;