import * as React from 'react';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as RequestsStore from '../../store/myRequests';
import * as Ping from '../../store/ping';
import Cards from './Cards'
import Paging from '../Paging'

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
            format: 'cards',
            requests: this.props.requests.sort(function (a, b) {
                return +new Date(b.submitted) - +new Date(a.submitted);
            }),
            countRequests: this.props.requests.length,
            currentPage: 1,
            requestsPerPage: 15
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
            this.setState({ 
                requests: props.requests.sort(function (a, b) {
                    return +new Date(b.submitted) - +new Date(a.submitted);
                }),
                countRequests: props.requests.length
            });
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

    toggleViewFormat() {
        window.scrollTo(0, 0)
        if (this.state.format == 'cards') {
            this.setState ({
                currentPage: 1,
                format: 'table'
            })
        }
        if (this.state.format == 'table') {
            this.setState ({
                format: 'cards'
            })
        }
    }

    handleNextClick() {
        window.scrollTo(0, 0)
        let current = this.state.currentPage
        this.setState({
            currentPage: current + 1
        });
    }

    handlePreviousClick() {
        window.scrollTo(0, 0)
        let current = this.state.currentPage
        this.setState({
            currentPage: current - 1
        });
    }

    public render() {
        const {
            requests,
            format,
            currentPage,
            countRequests,
            requestsPerPage } = this.state

        // Logic for paging
        const indexOfLastRequest = currentPage * requestsPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
        const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
        const renderRequests = currentRequests.map((request) => {
            return <Cards request={request} />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(requests.length / requestsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="form-element">
                                <div className='row'>
                                    <div className='col-sm-6 col-xs-12'>
                                        <h3 className="form-h">My requests - {countRequests} items</h3>
                                    </div>
                                    <div className='col-sm-6 col-xs-12'>
                                    {format == 'cards' &&
                                        <button className='btn btn-secondary text-center' onClick={this.toggleViewFormat.bind(this)}>Toggle table view</button>
                                    }
                                    {format == 'table' &&
                                        <button className='btn btn-secondary text-center' onClick={this.toggleViewFormat.bind(this)}>Toggle card view</button>
                                    }
                                    </div>
                                </div>
                                <input name="filter" id="filter" className="selectpicker form-control" placeholder="Filter by building or status" onChange={this.filter.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
                {format == 'table' &&
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
                }
                {format == 'cards' &&
                    <div className="col-md-12">
                        {renderRequests}
                        <Paging
                            count={requests}
                            currentPage={currentPage}
                            totalPages={pageNumbers}
                            next={this.handleNextClick.bind(this)}
                            prev={this.handlePreviousClick.bind(this)} />

                    </div>
                }
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