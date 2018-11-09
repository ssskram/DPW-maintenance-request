
import * as React from 'react'
import Select from '../formElements/select'
import Modal from 'react-responsive-modal'
import filter from '../../functions/filter'
import removeDuplicates from '../../functions/removeDuplicates'

export default class Filter extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            onFilter: false,
            modalIsOpen: false,
            facilities: [],
            facility: '',
            statuses: [],
            status: ''
        }
    }

    componentDidMount() {
        this.setDropdowns(this.props.myRequests)
    }

    componentWillReceiveProps(props) {
        this.setDropdowns(props.myRequests)
    }

    setDropdowns(myRequests) {
        let facilities = [] as any
        let statuses = [] as any
        myRequests.forEach(request => {
            const facility = { "value": request.building, "label": request.building }
            const status = { "value": request.status, "label": request.status }
            facilities.push(facility)
            statuses.push(status)
        })
        // take unique, set to state
        this.setState ({
            facilities: removeDuplicates(facilities, "value"),
            statuses: removeDuplicates(statuses, "value")
        })
    }

    filter() {
        const filterLoad = {
            facility: this.state.facility.value,
            status: this.state.status.value
        }
        this.props.returnFiltered(filter(this.props.myRequests, filterLoad))
        this.setState({
            modalIsOpen: false,
            onFilter: true
        })
    }

    clearFilter() {
        this.props.returnFiltered(this.props.myRequests)
        this.setState({
            onFilter: false,
            facility: '',
            status: ''
        })
    }

    public render() {
        const {
            onFilter,
            modalIsOpen,
            facilities,
            facility,
            statuses, 
            status
        } = this.state

        return (
            <div>
                {onFilter == false &&
                    <button onClick={() => this.setState({ modalIsOpen: true })} className='btn  btn-primary'>
                        <span style={{ padding: '3px' }} className='hidden-md hidden-lg hidden-xl glyphicon glyphicon-search'></span>
                        <span className='hidden-sm hidden-xs'>Filter</span>
                    </button>
                }
                {onFilter == true &&
                    <button onClick={this.clearFilter.bind(this)} className='btn  btn-primary'>
                        <span className='hidden-md hidden-lg hidden-xl glyphicon glyphicon-remove'></span>
                        <span className='hidden-sm hidden-xs'>Clear</span>
                    </button>
                }
                <Modal
                    open={modalIsOpen}
                    onClose={() => this.setState({modalIsOpen:false})}
                    classNames={{
                        overlay: 'custom-overlay',
                        modal: 'custom-modal'
                    }}
                    center>
                    <div>
                    <div className='col-md-12'>
                            <Select
                                value={facility}
                                header='Facilities'
                                placeholder='Select facility'
                                onChange={facility => this.setState({ facility })}
                                multi={false}
                                options={facilities}
                            />
                        </div>

                        <div className='col-md-12'>
                            <Select
                                value={status}
                                header='Status'
                                placeholder='Select status'
                                onChange={status => this.setState({ status }) }
                                multi={false}
                                options={statuses}
                            />
                        </div>

                        <div className='col-md-12 text-center'>
                            <button onClick={this.filter.bind(this)} className='btn btn-success'>Apply filter</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}