import * as React from 'react'
import TextArea from '../../formElements/textarea'
import Select from '../../formElements/select'
import Phone from '../../formElements/phone'
import AlternativePrompt from './alternativePrompts'
import * as types from '../../../store/types'
import Departments from './departments'
import ImageUploader from 'react-images-upload'

interface actionProps {
    clearRequest: () => void,
    postRequest: (request: any, images: any) => void
}

type props =
    types.openRequest &
    types.issues &
    actionProps

export default class Fields extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            options: [{ "value": '...loading...', "label": '...loading...' }],
            issue: '',
            description: '',
            location: '',
            phone: '',
            department: '',
            images: []
        }
    }

    componentWillReceiveProps(props) {
        // if issueType is cleared, wipe all fields
        if (props.openRequest.issueType == '') {
            this.setState({
                options: [{ "value": '...loading...', "label": '...loading...' }],
                issue: '',
                description: '',
                location: '',
                phone: '',
                department: '',
                images: []
            })
        } else {
            // add options to select
            let futureOptions: any[] = [];
            props.issues.forEach(element => {
                if (element.type == props.openRequest.issueType) {
                    const json = { "value": element.name, "label": element.name }
                    futureOptions.push(json)
                }
            })
            this.setState({
                options: futureOptions
            })
        }
    }

    post() {
        const load = {
            department: this.state.department.value,
            description: this.state.description,
            issue: this.state.issue.value,
            location: this.state.location,
            phone: this.state.phone
        }
        this.props.postRequest(load, this.state.images)
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

        const {
            clearRequest
        } = this.props

        const isEnabled =
            issue != '' &&
            description != '' &&
            location != '' &&
            phone != ''

        const alternativePrompt =
            issue.value == 'Pest Control' ||
            issue.value == 'Elevators' ||
            issue.value == 'Tree Issues' ||
            issue.value == 'Masonry/Concrete Work' ||
            issue.value == 'Landscape Maintenance (Snow or Leaves)' ||
            issue.value == 'Office Renovation'

        if (alternativePrompt) {
            return <AlternativePrompt issue={issue.value} clear={clearRequest} />
        }

        return (
            <div>
                <div className="form-group">
                    <Select
                        value={department}
                        header="Select your department"
                        placeholder='Select department'
                        onChange={department => this.setState({ department })}
                        multi={false}
                        options={Departments.Departments}
                    />

                    <Phone
                        value={phone}
                        header="Enter your phone number"
                        placeholder="Phone number"
                        callback={e => this.setState({ phone: e })}
                    />

                    <Select
                        value={issue}
                        header='Select an issue'
                        placeholder='Select...'
                        onChange={issue => this.setState({ issue })}
                        multi={false}
                        options={options}
                    />

                    <TextArea
                        value={description}
                        header="Describe the issue"
                        placeholder="Description"
                        callback={e => this.setState({ description: e.target.value })}
                    />

                    <TextArea
                        value={location}
                        header="Describe the location"
                        placeholder="Room, floor, etc."
                        callback={e => this.setState({ location: e.target.value })}
                    />

                    <div className='col-md-12'>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Attach images'
                            onChange={image => this.setState({ images: image })}
                            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                            withLabel={false}
                            maxFileSize={5242880}
                            withPreview={true}
                        />
                    </div>

                </div>
                <div className='col-md-12 text-center'>
                    <button onClick={() => clearRequest()} className='btn btn-warning pull-left'>Back</button>
                    <button onClick={this.post.bind(this)} disabled={!isEnabled} className='btn btn-success pull-right'>Submit</button>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}