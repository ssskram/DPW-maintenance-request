import * as React from 'react'

const door = require('../../../images/door.png')
const electric = require('../../../images/electric.png')
const hvac = require('../../../images/hvac.png')
const misc = require('../../../images/misc.png')
const paint = require('../../../images/paint.png')
const plumbing = require('../../../images/plumbing.png')
const roofing = require('../../../images/roofing.png')

const iconStyle = {
    height: '75px'
}

interface actionProps {
    setType: (type: string) => void
}

type props = actionProps

export default class SelectIssueType extends React.Component<props, {}> {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const {
            setType
        } = this.props

        return (
            <div>
                <div className="text-center">
                    <h2>Confirm the issue type</h2>
                </div>
                <div>
                    <div className='col-md-4 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Doors, Locks, and Windows')}>
                            <img src={String(door)} style={iconStyle} /><br />
                            <div>Doors, Locks, & Windows</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Electrical and Lighting')}>
                            <img src={String(electric)} style={iconStyle} /><br />
                            <div>Electrical & Lighting</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Heating and Air Conditioning')}>
                            <img src={String(hvac)} style={iconStyle} /><br />
                            <div>Heating & Air Conditioning</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Carpentry and Painting')}>
                            <img src={String(paint)} style={iconStyle} /><br />
                            <div>Carpentry & Painting</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Plumbing and Gas')}>
                            <img src={String(plumbing)} style={iconStyle} /><br />
                            <div>Plumbing & Gas</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button value='describe' name='Roofing' className="btn btn-big" onClick={() => setType('Roofing')}>
                            <img src={String(roofing)} style={iconStyle} /><br />
                            <div>Roofing</div>
                        </button>
                    </div>
                    <div className='col-md-12 text-center'>
                        <button value='describe' name='Miscellaneous' className="btn btn-big" onClick={() => setType('Miscellaneous')}>
                            <img src={String(misc)} style={iconStyle} /><br />
                            <div>Miscellaneous</div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}