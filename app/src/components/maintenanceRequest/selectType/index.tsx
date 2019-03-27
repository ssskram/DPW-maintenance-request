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
                    <h3 className='ubuntu'>Select the issue type</h3>
                </div>
                <div>
                    <div className='col-md-6 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Doors, Locks, and Windows')}>
                            <div className='col-md-12'>
                                <img src={String(door)} style={iconStyle} />
                            </div>
                            <div className='col-md-12'>
                                <div>Doors, Locks, & Windows</div>
                            </div>
                        </button>
                    </div>
                    <div className='col-md-6 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Electrical and Lighting')}>
                            <div className='col-md-12'>
                                <img src={String(electric)} style={iconStyle} />
                            </div>
                            <div className='col-md-12'>
                                <div>Electrical & Lighting</div>
                            </div>
                        </button>
                    </div>
                    <div className='col-md-6 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Heating and Air Conditioning')}>
                            <div className='col-md-12'>
                                <img src={String(hvac)} style={iconStyle} />
                            </div>
                            <div className='col-md-12'>
                                <div>Heating & Air Conditioning</div>
                            </div>
                        </button>
                    </div>
                    <div className='col-md-6 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Carpentry and Painting')}>
                            <div className='col-md-12'>
                                <img src={String(paint)} style={iconStyle} />
                            </div>
                            <div className='col-md-12'>
                                <div>Carpentry & Painting</div>
                            </div>
                        </button>
                    </div>
                    <div className='col-md-6 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Plumbing and Gas')}>
                            <div className='col-md-12'>
                                <img src={String(plumbing)} style={iconStyle} />
                            </div>
                            <div className='col-md-12'>
                                <div>Plumbing & Gas</div>
                            </div>
                        </button>
                    </div>
                    <div className='col-md-6 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Roofing')}>
                            <div className='col-md-12'>
                                <img src={String(roofing)} style={iconStyle} />
                            </div>
                            <div className='col-md-12'>
                                <div>Roofing</div>
                            </div>
                        </button>
                    </div>
                    <div className='col-md-6 text-center'>
                        <button className="btn btn-big" onClick={() => setType('Miscellaneous')}>
                            <div className='col-md-12'>
                                <img src={String(misc)} style={iconStyle} />
                            </div>
                            <div className='col-md-12'>
                                <div>Miscellaneous</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}