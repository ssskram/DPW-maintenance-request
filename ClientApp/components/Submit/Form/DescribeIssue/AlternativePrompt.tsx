import * as React from 'react';

export default class AlternativePrompt extends React.Component<any, {}> {
    public render() {
        const { issue, clear } = this.props

        return (
            <div className="row col-md-12 alternativeprompt">
                {issue == 'Elevators' &&
                    <div>
                        Please contact John Sibbet at <br />
                        <b>412-600-6106</b>
                    </div>
                }
                {issue == 'Pest Control' &&
                    <div>
                        Please contact John Sibbet at <br />
                        <b>412-600-6106</b>
                    </div>
                }
                {issue == 'Tree Issues' &&
                    <div>
                        Please contact DPW Forestry at <br />
                        <b>412-665-3625</b>
                    </div>
                }
                {issue == 'Masonry/Concrete Work' &&
                    <div>
                        Please contact DPW Construction at <br />
                        <b>412-782-7631</b>
                    </div>
                }
                {issue == 'Landscape Maintenance (Snow or Leaves)' &&
                    <div>
                        Please contact the DPW Parks division that services your area: <br />
                        <b><a href='http://pittsburghpa.gov/dpw/park-maintenance/index.html'>
                            Maintenance Regions</a></b>
                    </div>
                }
                {issue == 'Door Name Lettering' &&
                    <div>
                        Please contact DOMI Sign Shop at <br />
                        <b>412-255-2872</b>
                    </div>
                }
                {issue == 'Office Renovation' &&
                    <div>
                        Please contact Chris Hornstein at <br />
                        <b>412-255-2498</b> or at <br />
                        chirs.hornstein@pittsburghpa.gov
                    </div>
                }
                <button value='issue' onClick={clear.bind(this)} className="btn btn-danger">Back</button>
            </div>
        )
    }
}
