
import * as React from 'react'
import Input from '../formElements/input'
import Select from '../formElements/select'
import Modal from 'react-responsive-modal'
import filter from '../../functions/filter'

const types = [
    { value: 'Facility', label: 'Facility', name: 'assetType' },
    { value: 'Project', label: 'Project', name: 'assetType' },
    { value: 'Steps', label: 'Steps', name: 'assetType' },
    { value: 'Retaining Wall', label: 'Retaining Wall', name: 'assetType' },
    { value: 'Pool', label: 'Pool', name: 'assetType' },
    { value: 'Playground', label: 'Playground', name: 'assetType' },
    { value: 'Intersection', label: 'Intersection', name: 'assetType' },
    { value: 'Bridge', label: 'Bridge', name: 'assetType' },
    { value: 'Court', label: 'Court', name: 'assetType' },
    { value: 'Playing Field', label: 'Playing Field', name: 'assetType' },
    { value: 'Park', label: 'Park', name: 'assetType' },
    { value: 'Street', label: 'Street', name: 'assetType' }
]

export default class Filter extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            onFilter: false,
            modalIsOpen: false,
            assetName: '',
            assetType: ''
        }
    }

    filter() {
        const filterLoad = {
            assetName: this.state.assetName,
            assetType: this.state.assetType
        }
        this.props.returnFiltered(filter(this.props.myRequests, filterLoad))
        this.setState({
            modalIsOpen: false,
            onFilter: true
        })
    }

    clearFilter() {
        this.props.returnFiltered(this.props.assets)
        this.setState({
            onFilter: false,
            assetName: '',
            assetType: ''
        })
    }

    public render() {
        const {
            onFilter,
            modalIsOpen,
            assetName,
            assetType,
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
                            <Input
                                value={assetName}
                                name="assetName"
                                header="Asset name"
                                placeholder="Enter a name"
                                callback={(e) => { this.setState({ description: e.value }) }}
                            />
                        </div>

                        <div className='col-md-12'>
                            <Select
                                value={assetType}
                                name="assetType"
                                header='Asset type'
                                placeholder='Select type'
                                onChange={(assetType) => { this.setState({ assetType }) }}
                                multi={false}
                                options={types}
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