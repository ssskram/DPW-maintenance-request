import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as RequestsStore from '../../../store/allRequests';
import { Link, NavLink, Redirect } from 'react-router-dom';
import * as MessagesStore from '../../../store/messages';

const imgStyle = {
    maxHeight: '150px',
    borderRadius: '10px',
    margin: '0 auto',
    padding: '5px'
}

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

type AllProps =
    RequestsStore.AllRequestsState &
    MessagesStore.MessageState &
    typeof RequestsStore.actionCreators &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{}>;

export class RecentlySubmitted extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestAllRequests()
    }

    alreadySubmitted(event) {
        this.props.alreadySubmitted()
    }

    render() {
        const { img, name, next } = this.props

        return (
            <div className="text-center">
                <h1>Has your issue been submitted recently?</h1>
                <div className="text-center">
                    <img className="img-responsive" style={imgStyle} src={img} />
                </div>
                <div className="col-md-12 table-container">
                    <ReactTable
                        data={this.props.requests.filter(e => e.building === this.props.name)}
                        columns={columns}
                        loading={false}
                        showPageSizeOptions={false}
                        showPageJump={false}
                        showPaginationBottom={true}
                        showPaginationTop={false}
                        defaultPageSize={2}
                        noDataText='No recent maintenance requests here'
                        defaultSorted={[
                            {
                                id: 'submitted',
                                desc: true
                            }
                        ]}
                    />
                </div>
                <div className="row col-md-12">
                    <div className="col-md-4 text-center">
                        <Link to={'/'} onClick={this.alreadySubmitted.bind(this)} className="btn btn-danger">Yes</Link>
                    </div>
                    <div className="col-md-4" />
                    <div className="col-md-4 text-center">
                        <button value='issue' onClick={next.bind(this)} className="btn btn-success">No</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.messages, ...state.allRequests }),
    ({ ...MessagesStore.actionCreators, ...RequestsStore.actionCreators })
)(RecentlySubmitted as any) as typeof RecentlySubmitted;