import * as React from 'react';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as RequestsStore from '../../store/myRequests';
import * as Ping from '../../store/ping';

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

        // ping server
        this.props.ping()

        // reload requests
        this.props.requestMyRequests()
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
    (state: ApplicationState) => ({
        ...state.myRequests,
        ...state.ping
    }),
    ({
        ...RequestsStore.actionCreators,
        ...Ping.actionCreators
    })
)(MyRequests as any) as typeof MyRequests;