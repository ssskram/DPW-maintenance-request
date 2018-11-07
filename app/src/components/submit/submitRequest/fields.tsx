import * as React from 'react'
import TextArea from '../../formElements/textarea'
import Select from '../../formElements/select'
import Phone from '../../formElements/phone'
import AlternativePrompt from './alternativePrompts'
import Departments from './departments'

export default class Fields extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            issue: '',
            description: '',
            location: '',
            phone: '',
            department: '',
        }
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    handlePhone(number) {
        this.setState({
            phone: number
        })
    }

    public render() {
        const {
            options,
            issue,
            description,
            location,
            phone,
            department
        } = this.state

        return (
            <div>
                <div className="form-group">
                    <Select
                        value={department}
                        name="department"
                        header="Select your department"
                        placeholder='Select department'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        options={Departments.Departments}
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
            </div>
        );
    }
}