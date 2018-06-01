import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";

const data = [{
    name: 'Tanner Linsley',
    age: 26,
    friend: {
        name: 'Jason Maurer',
        age: 23,
    }
}]

const columns = [{
    Header: 'Submitted',
    accessor: 'submitted'
}, {
    Header: 'Status',
    accessor: 'status',
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

export default class AllRequests extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            requests: [],
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/api/requests/all', {
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
            <ReactTable
                data={this.state.requests}
                columns={columns}
            />
        );
    }
}