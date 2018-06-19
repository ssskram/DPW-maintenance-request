import * as React from 'react';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { ApplicationState } from '../../../../store';
import * as RequestsStore from '../../../../store/allRequests';
import { Link } from 'react-router-dom';
import * as MessagesStore from '../../../../store/messages';
import LoadingImage from '../../../LoadingImage'
declare var $: any;

const imgStyle = {
    maxHeight: '150px',
    borderRadius: '10px',
    margin: '0 auto',
    padding: '5px'
}

const babyTable = {
    maxWidth: '100vw',
    padding: '5px',
}

const columns = [{
    Header: 'Submitted',
    accessor: 'submitted'
}, {
    Header: 'Status',
    accessor: 'status',
}, {
    Header: 'Issue',
    accessor: 'issue'
}, {
    Header: 'Location',
    accessor: 'location'
}]

export class RecentlySubmitted extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.requestAllRequests()
    }

    render() {
        const { img, name, next } = this.props

        return (
            <div className="text-center">
                <h3>Has your issue already been reported?</h3>
                <div className="text-center">
                    <LoadingImage style={imgStyle} src={img} />
                </div>
                <div className="row" style={babyTable}>
                    <ReactTable
                        data={this.props.requests.filter(e => e.building === name)}
                        columns={columns}
                        loading={false}
                        showPageSizeOptions={false}
                        showPageJump={false}
                        showPaginationBottom={true}
                        showPaginationTop={false}
                        collapseOnPageChange={true}
                        defaultPageSize={3}
                        noDataText='No open issues here'
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
                        <Link to={'/'} className="btn btn-danger">Exit</Link>
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
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.allRequests
    }),
    ({
        ...MessagesStore.actionCreators,
        ...RequestsStore.actionCreators
    })
)(RecentlySubmitted as any) as typeof RecentlySubmitted;