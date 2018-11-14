import * as React from 'react'
import * as types from './../../store/types'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Department from '../../store/department'
import removeDuplicates from '../../functions/removeDuplicates'
import Select from '../formElements/select'

interface actionProps {
    setDepartment: (type: string) => void
}

type props = actionProps & types.allRequests

export class SelectDepartment extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            departments: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setDropdown(this.props.allRequests)
    }

    componentWillReceiveProps(props) {
        this.setDropdown(props.allRequests)
    }

    setDropdown(requests) {
        let departments = [] as any
        if (requests) {
            requests.forEach(request => {
                if (request.department != '') {
                    const department = { "value": request.department, "label": request.department }
                    departments.push(department)
                }
            })
            this.setState({
                departments: removeDuplicates(departments, "value").sort((a, b) => a.value.localeCompare(b.value))
            })
        }
    }

    render() {
        const {
            setDepartment
        } = this.props

        return (
            <div>
                <div className="text-center">
                    <h2>Select your department</h2>
                </div>
                <div>
                    <Select
                        value={this.state.department}
                        placeholder='Select department'
                        onChange={department => setDepartment(department.value)}
                        multi={false}
                        options={this.state.departments}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.department
    }),
    ({
        ...Department.actionCreators
    })
)(SelectDepartment)