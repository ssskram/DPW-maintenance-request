import * as React from 'react';

const iconStyle = {
    height: '75px',
}

export default class SelectIssue extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    public render() {
        const door = require('../../../icons/door.png');
        const electric = require('../../../icons/electric.png');
        const hvac = require('../../../icons/hvac.png');
        const misc = require('../../../icons/misc.png');
        const paint = require('../../../icons/paint.png');
        const plumbing = require('../../../icons/plumbing.png');
        const roofing = require('../../../icons/roofing.png');
        const { next } = this.props;

        return (
            <div>
                <div className="text-center">
                    <h2>Select an issue type</h2>
                </div>
                <div>
                    <div className='col-md-4 text-center'>
                        <button value='describe' name='Doors, Locks, and Windows' className="btn btn-big" onClick={next.bind(this)}>
                            <img src={String(door)} style={iconStyle} /><br />
                            <div>Doors, Locks, & Windows</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button value='describe' name='Electrical and Lighting' className="btn btn-big" onClick={next.bind(this)}>
                            <img src={String(electric)} style={iconStyle} /><br />
                            <div>Electrical & Lighting</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button value='describe' name='Heating and Air Conditioning' className="btn btn-big" onClick={next.bind(this)}>
                            <img src={String(hvac)} style={iconStyle} /><br />
                            <div>Heating & Air Conditioning</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button value='describe' name='Carpentry and Painting' className="btn btn-big" onClick={next.bind(this)}>
                            <img src={String(paint)} style={iconStyle} /><br />
                            <div>Carpentry & Painting</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button value='describe' name='Plumbing and Gas' className="btn btn-big" onClick={next.bind(this)}>
                            <img src={String(plumbing)} style={iconStyle} /><br />
                            <div>Plumbing & Gas</div>
                        </button>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button value='describe' name='Roofing' className="btn btn-big" onClick={next.bind(this)}>
                            <img src={String(roofing)} style={iconStyle} /><br />
                            <div>Roofing</div>
                        </button>
                    </div>
                    <div className='col-md-12 text-center'>
                        <button value='describe' name='Miscellaneous' className="btn btn-big" onClick={next.bind(this)}>
                            <img src={String(misc)} style={iconStyle} /><br />
                            <div>Miscellaneous</div>
                        </button>
                    </div>
                    <div className='col-md-12 text-center'>
                        <button value='recents' onClick={next.bind(this)} className="btn btn-danger">Back</button>
                    </div>
                </div>
            </div>
        );
    }
}