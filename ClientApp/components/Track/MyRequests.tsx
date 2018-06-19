import * as React from 'react';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as RequestsStore from '../../store/myRequests';

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


export class MyRequests extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            requests: this.props.requests,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.requestMyRequests()
        // ping server
        fetch('/api/ping/pong', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data == 0) {
                    window.location.reload();
                }
            });
    }

    componentWillReceiveProps(props) {
        if (props.requests !== this.state.requests) {
            this.setState({ requests: props.requests });
        }
    }

    filter(event) {
        if (event.target.value == '') {
            this.setState({
                requests: this.props.requests
            });
        }
        else {
            var result = this.props.requests.filter(function (obj) {
                return obj.building.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    obj.status.toLowerCase().includes(event.target.value.toLowerCase());
            });
            this.setState({
                requests: result
            });
        }
    }

    public render() {
        const { requests } = this.state

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="form-element">
                                <h3 className="form-h">Search my requests</h3>
                                <input name="filter" id="filter" className="selectpicker form-control" placeholder="Filter by building or status" onChange={this.filter.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 table-container">
                    <ReactTable
                        data={requests}
                        columns={columns}
                        loading={false}
                        defaultPageSize={10}
                        noDataText='Nothing to see here'
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

export default connect(
    (state: ApplicationState) =>
        state.myRequests,
    RequestsStore.actionCreators
)(MyRequests as any) as typeof MyRequests;