import * as React from 'react';

export default class Card extends React.Component<any, any> {

    public render() {
        const { request } = this.props

        return (
            <div className="container-fluid" key={request.oid}>
                <div className="col-md-12">
                    <div className="panel">
                        <div className="panel-body text-center">
                            <div className="col-md-12">
                                <h5>{request.submitted}</h5>
                                <h5><b>{request.issue}</b></h5>
                                <h5>Status: {request.status}</h5>
                                <h5>Location: {request.location}</h5>
                                <h5><i>"{request.description}"</i></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}