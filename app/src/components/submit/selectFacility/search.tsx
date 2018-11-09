import * as React from 'react'
import Select from '../../formElements/select'

const floatingPanelBig = {
    position: 'absolute' as any,
    top: '0px',
    left: '50%',
    zIndex: 99,
    padding: '10px 20px',
    backgroundColor: 'rgb(44, 62, 80)',
    borderRadius: '0px 0px 15px 15px',
    width: '350px'
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

        return (
            <div style={floatingPanelBig} className="container-fluid text-center">
                <h3 style={{ color: '#FAF7F2' }}>Select facility</h3>
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
        );
    }
}