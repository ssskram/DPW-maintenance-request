import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as RequestsStore from '../../store/requests';

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

type RequestsProps =
    RequestsStore.RequestsState
    & typeof RequestsStore.actionCreators
    & RouteComponentProps<{}>;

export class AllRequests extends React.Component<RequestsProps, {}> {

    componentDidMount() {
        window.scrollTo(0, 0)
        
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

        this.props.requestAllRequests()
    }

    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="form-element">
                                <h3 className="form-h4">Search all requests</h3>
                                <input name="filter" id="filter" className="selectpicker form-control" placeholder="Filter by name" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 table-container">
                    <ReactTable
                        data={this.props.requests}
                        columns={columns}
                        loading={false}
                        showPageSizeOptions={false}
                        showPageJump={false}
                        showPaginationBottom={false}
                        showPaginationTop={true}
                        noDataText='Finding all requests...'
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
    (state: ApplicationState) => state.requests,
    RequestsStore.actionCreators
)(AllRequests as any) as typeof AllRequests;