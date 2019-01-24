import * as React from 'react'
import TextArea from '../../formElements/textarea'
import Input from '../../formElements/input'
import Select from '../../formElements/select'
import Phone from '../../formElements/phone'
import Departments from '../../maintenanceRequest/submitRequest/departments'
import Spinner from '../../utilities/spinner'
import * as types from '../../../store/types'

interface actionProps {
    postRequest: (request: any, images: any) => void
}

type props =
    types.facilities &
    actionProps

export default class Fields extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            facilities: [],
            originFacility: '',
            originLocation: '',
            destinationFacility: '',
            destinationLocation: '',
            name: '',
            description: '',
            phone: '',
            department: '',
            spinner: false
        }
    }

    componentDidMount() {
        if (this.props.facilities) {
            this.setDropdown(this.props.facilities)
        }
    }

    componentWillReceiveProps(props) {
        if (props.facilities) {
            this.setDropdown(props.facilities)
        }
    }

    setDropdown(fc) {
        let facilities = [] as any
        fc.forEach(facility => {
            const f = { "value": facility.name, "label": facility.name }
            facilities.push(f)
        })
        this.setState({
            facilities: facilities
        })
    }

    buildLocation() {
        const location =
            "Office move from " +
            this.state.originFacility.value +
            " (" +
            this.state.originLocation +
            ") to " +
            this.state.destinationFacility.value +
            " (" +
            this.state.destinationLocation + ")"
        return location
    }

    post() {
        this.setState({
            spinner: true
        })
        const load = {
            building: this.state.originFacility.value,
            department: this.state.department.value,
            description: "Office move for " + this.state.name + ". Additional information: " + this.state.description,
            issue: 'Office Move',
            location: this.buildLocation(),
            phone: this.state.phone
        }
        this.props.postRequest(load, null)
    }

    public render() {
        const {
            facilities,
            originFacility,
            originLocation,
            destinationFacility,
            destinationLocation,
            name,
            description,
            phone,
            department,
            spinner,
        } = this.state

        const isEnabled =
            originFacility != '' &&
            originLocation != '' &&
            destinationFacility != '' &&
            destinationLocation != '' &&
            department != '' &&
            phone != '' &&
            name != ''

        return (
            <div>
                <div className='col-lg-6 col-lg-offset-3 panel'>
                    <div className='sectionHeader'>Employee information</div>
                    <div className='panel-body'>
                        <Input
                            value={name}
                            header="Employee name"
                            placeholder="Name of employee being moved"
                            callback={e => this.setState({ name: e.target.value })}
                        />

                        <Select
                            value={department}
                            header="Department"
                            placeholder='Select department'
                            onChange={department => this.setState({ department })}
                            multi={false}
                            options={Departments.Departments}
                        />

                        <Phone
                            value={phone}
                            header="Phone number"
                            placeholder="Enter phone number"
                            callback={e => this.setState({ phone: e })}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-lg-offset-3 panel">
                    <div className='sectionHeader'>Move origin</div>
                    <div className='panel-body'>
                        <Select
                            value={originFacility}
                            header="Select facility of origin"
                            placeholder='Select facility'
                            onChange={originFacility => this.setState({ originFacility })}
                            multi={false}
                            options={facilities}
                        />

                        <TextArea
                            value={originLocation}
                            header="Specific location"
                            placeholder="Floor, room, etc."
                            callback={e => this.setState({ originLocation: e.target.value })}
                        />
                    </div>
                </div>
                <div className='col-lg-6 col-lg-offset-3 panel'>
                    <div className='sectionHeader'>Move destination</div>
                    <div className='panel-body'>
                        <Select
                            value={destinationFacility}
                            header="Select facility of destination"
                            placeholder='Select facility'
                            onChange={destinationFacility => this.setState({ destinationFacility })}
                            multi={false}
                            options={facilities}
                        />

                        <TextArea
                            value={destinationLocation}
                            header="Specific location"
                            placeholder="Floor, room, etc."
                            callback={e => this.setState({ destinationLocation: e.target.value })}
                        />
                    </div>
                </div>
                <div className='col-lg-6 col-lg-offset-3 panel'>
                    <div className='sectionHeader'>Additional Information</div>
                    <div className='panel-body'>
                        <TextArea
                            value={description}
                            header=""
                            placeholder="Anything else we need to know?"
                            callback={e => this.setState({ description: e.target.value })}
                        />
                    </div>
                </div>
                <div className='col-lg-12 text-center'>
                    <button onClick={this.post.bind(this)} disabled={!isEnabled} className='btn btn-success'>Submit</button>
                    <br />
                    <br />
                </div>
                {spinner == true &&
                    <Spinner notice='...submitting your request...' />
                }
            </div>
        );
    }
}