import * as React from 'react';
import LoadingImage from '../LoadingImage'

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
        const { request } = this.props

        return (
            <div className="container-fluid" key={request.oid}>
                <div className="row">
                    <div className="panel">
                        <div className="panel-body text-center">
                            <div className="col-md-6">
                                <h4><b>{request.building}</b></h4>
                                <div style={{ margin: '5px' }} className='hidden-xs'>
                                    <LoadingImage style={imgStyle} src={request.img} />
                                </div>
                                <p>Request ID: {request.oid}</p>
                            </div>
                            <div className="col-md-6">
                                <h4>Submitted on {request.submitted}</h4>
                                <h4><i>"{request.description}"</i></h4>
                                <div style={feedback}>
                                    <h5><b>DPW Feedback</b></h5>
                                    <h5>Status: {request.status}</h5>
                                    <h5>Last activity: {request.lastModified}</h5>
                                    <h5><i>{request.notes}</i></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}