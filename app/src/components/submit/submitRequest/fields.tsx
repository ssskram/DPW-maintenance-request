import * as React from 'react'
import TextArea from '../../formElements/textarea'
import Select from '../../formElements/select'
import Phone from '../../formElements/phone'
import AlternativePrompt from './alternativePrompts'
import Departments from './departments'

export default class Fields extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            options: [
                { value: 'Test', label: 'Test', name: 'issue' }
            ],
            issue: '',
            description: '',
            location: '',
            phone: '',
            department: '',
        }
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
                        header="Select your department"
                        placeholder='Select department'
                        onChange={(department) => { this.setState({ department }) }}
                        multi={false}
                        options={Departments.Departments}
                    />

                    <Phone
                        value={phone}
                        name="phone"
                        header="Enter your phone number"
                        placeholder="Phone number"
                        callback={(phone) => { this.setState({ phone }) }}
                    />

                    <Select
                        value={issue}
                        header='Select an issue'
                        placeholder='Select...'
                        onChange={(issue) => { this.setState({ issue }) }}
                        multi={false}
                        options={options}
                    />

                    <TextArea
                        value={description}
                        name="description"
                        header="Describe the issue"
                        placeholder="Description"
                        callback={(e) => { this.setState({ description: e.value }) }}
                    />

                    <TextArea
                        value={location}
                        name="location"
                        header="Describe the location"
                        placeholder="Room, floor, etc."
                        callback={(e) => { this.setState({ location: e.value }) }}
                    />
                </div>
                <div className='col-md-12 text-center'>
                    <button className='btn btn-success'>Submit</button>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}