import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";

const columns = [{
    Header: 'Request ID',
    accessor: 'oid'
}, {
    Header: 'Submitted',
    accessor: 'submitted'
}, {
    Header: 'Status',
    accessor: 'status',
}, {
    Header: 'Last Modified',
    accessor: 'lastModified'
}, {
    Header: 'Building',
    accessor: 'building',
}, {
    Header: 'Location',
    accessor: 'location'
}, {
    Header: 'Description',
    accessor: 'description'
}]

export default class MyRequests extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            requests: [],
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/api/requests/mine', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ requests: data }));
    }

    public render() {
        return (
            <div>
            <div className="row">
                <div className="col-md-12">
                <div className="form-group">
                    <div className="form-element">
                        <h3 className="form-h4">Search my requests</h3>
                        <input name="filter" id="filter" className="selectpicker form-control" placeholder="Filter by name" />
                    </div>
                </div>
                </div>
            </div>
                <div className="col-md-12 table-container">
                <ReactTable
                    data={this.state.requests}
                    columns={columns}
                    defaultPageSize={10}
                    noDataText= 'You have not submitted any maintenance requests'
                    defaultSorted={[
                        {
                            id: 'submitted',
                            desc: true
                        }
                    ]}
                />
                </div>
            </div>
        );
    }
}