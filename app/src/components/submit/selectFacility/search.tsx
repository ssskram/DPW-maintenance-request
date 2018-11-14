import * as React from 'react'
import Select from '../../formElements/select'

const floatingPanelBig = {
    position: 'absolute' as any,
    top: '0',
    right: '15%',
    zIndex: 99,
    backgroundColor: 'rgb(44, 62, 80)',
    borderRadius: '0px 0px 5px 5px',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.4)',
    width: '45%'
}

const floatingPanelSmall = {
    position: 'absolute' as any,
    top: '0',
    right: '0',
    zIndex: 99,
    backgroundColor: 'rgb(44, 62, 80)',
    width: '100%'
}

export default class Search extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            facility: '',
            facilities: []
        }
        this.returnFilter = this.returnFilter.bind(this)
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

    returnFilter(f) {
        const fc = this.props.facilities.filter(facility => facility.name == f.value)
        this.props.filter(fc[0])
    }

    public render() {
        const {
            facility,
            facilities
        } = this.state

        const select =
            <div>
                <h3 style={{ color: '#FAF7F2' }}>Select facility from map</h3>
                <div className='col-md-12'>
                    <Select
                        value={facility}
                        placeholder='Search for facility'
                        onChange={facility => this.returnFilter(facility)}
                        multi={false}
                        options={facilities}
                    />
                </div>
            </div>

        return (
            <div className='container-fluid text-center '>
                <div style={floatingPanelBig} className="hidden-xs">
                    {select}
                </div>
                <div style={floatingPanelSmall} className="hidden-sm hidden-md hidden-lg hidden-xl">
                    {select}
                </div>
            </div>
        );
    }
}