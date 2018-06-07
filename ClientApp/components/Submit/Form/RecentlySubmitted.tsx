import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as RequestsStore from '../../../store/allRequests';
import { Link, NavLink, Redirect } from 'react-router-dom';
import * as MessagesStore from '../../../store/messages';
declare var $: any;

const imgStyle = {
    maxHeight: '150px',
    borderRadius: '10px',
    margin: '0 auto',
    padding: '5px'
}

const babyTable = {
    maxWidth: '100vw',
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
                <h1>Has your issue already been submitted?</h1>
                <div className="text-center">
                    <img className="img-responsive" style={imgStyle} src={img} />
                </div>
                <div className="row" style={babyTable}>
                    <ReactTable
                        data={this.props.requests.filter(e => e.building === this.props.name && e.status == "Open")}
                        columns={columns}
                        loading={false}
                        showPageSizeOptions={false}
                        showPageJump={false}
                        showPaginationBottom={true}
                        showPaginationTop={false}
                        collapseOnPageChange={true}
                        defaultPageSize={3}
                        noDataText='No maintenance requests here'
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
                        <button id="next" value='issue' onClick={next.bind(this)} className="btn btn-success">Continue</button>
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