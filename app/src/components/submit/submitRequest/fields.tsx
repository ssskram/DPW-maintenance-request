import * as React from 'react'
import TextArea from '../../formElements/textarea'
import Select from '../../formElements/select'
import Phone from '../../formElements/phone'
import AlternativePrompt from './alternativePrompts'
import Departments from './departments'

const marginTop = {
    marginTop: '20px'
}

export default class Fields extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            options: [{ "value": '...loading...', "label": '...loading...' }],
            issue: '',
            description: '',
            location: '',
            phone: '',
            department: '',

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

    handlePhone(number) {
        this.setState ({
            phone: number
        })
    }

    public render() {
        const {
            issue,
            description,
            location,
            phone,
            department,
            options
        } = this.state

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


        if (alternativePrompt) {
            return <AlternativePrompt issue={issue} />
        }

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
                        <button value='issue' className="btn btn-danger">Back</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button disabled={!isEnabled} className="btn btn-success">Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}