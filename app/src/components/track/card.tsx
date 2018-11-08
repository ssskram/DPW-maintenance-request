import * as React from 'react';
import LoadingImage from '../utilities/loadingImage'

const imgStyle = {
    width: '150px',
    height: '150px',
    margin: '0 auto'
}

const feedback = {
    backgroundColor: 'rgba(92, 184, 92, .2)',
    padding: '5px',
    margin: '5px',
    borderRadius: '10px'
}

export default class RequestCard extends React.Component<any, any> {

    public render() {
        const {
            myRequest
        } = this.props

        return (
            <div className="container-fluid" key={myRequest.cartegraphID}>
                <div className="row">
                    <div className="panel">
                        <div className="panel-body text-center">
                            <div className="col-md-6">
                                <h3><b>{myRequest.building}</b></h3>
                                <div style={{ margin: '10px' }} className='hidden-xs'>
                                    <LoadingImage style={imgStyle} src={"https://tools.wprdc.org/images/pittsburgh/facilities/" + myRequest.building.replace(/ /g, "_") + ".jpg"} />
                                </div>
                                <h4><b>{myRequest.submitted}</b></h4>

                            </div>
                            <div className="col-md-6" style={{ marginTop: '20px' }}>
                                <p>Request ID: {myRequest.cartegraphID}</p>
                                <h4>"{myRequest.description}"</h4>
                                <div style={feedback}>
                                    <h5><b>DPW Feedback</b></h5>
                                    <h5>Status: {myRequest.status}</h5>
                                    <h5>Last activity: {myRequest.lastModified}</h5>
                                    <h5><i>{myRequest.notes}</i></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}