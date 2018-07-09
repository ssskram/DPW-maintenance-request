import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../../store';
import * as RequestsStore from '../../../../store/allRequests';
import { Link } from 'react-router-dom';
import * as MessagesStore from '../../../../store/messages';
import LoadingImage from '../../../LoadingImage'
import Card from './Card'
import Paging from '../../../Paging'

const imgStyle = {
    maxHeight: '150px',
    borderRadius: '10px',
    margin: '0 auto',
    padding: '5px',
    marginBottom: '15px',
}

export class RecentlySubmitted extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            requests: props.requests.filter(e => e.building === this.props.name).sort(function (a, b) {
                return +new Date(b.submitted) - +new Date(a.submitted);
            }),
            currentPage: 1,
            requestsPerPage: 3,
            countRequests: props.requests.filter(e => e.building === this.props.name).length
        }
    }

    componentDidMount() {
        this.props.requestAllRequests()
    }

    componentWillReceiveProps(props) {
        if (props.requests !== this.state.requests) {
            this.setState({
                requests: props.requests.filter(e => e.building === this.props.name).sort(function (a, b) {
                    return +new Date(b.submitted) - +new Date(a.submitted);
                }),
                countRequests: props.requests.filter(e => e.building === this.props.name).length
            });
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

    render() {
        const { img, name, next } = this.props
        const { requests, currentPage, requestsPerPage } = this.state

        // Logic for paging
        const indexOfLastRequest = currentPage * requestsPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
        const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
        const recentlySubmitted = currentRequests.map((request) => {
            return <Card request={request} />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(requests.length / requestsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="text-center">
                <h3>Has your issue already been reported?</h3>
                <div className="text-center">
                    <LoadingImage style={imgStyle} src={img} />
                </div>
                {requests.length > 0 &&
                    <div className="row">
                        <Paging
                            count={requests}
                            currentPage={currentPage}
                            totalPages={pageNumbers}
                            next={this.handleNextClick.bind(this)}
                            prev={this.handlePreviousClick.bind(this)} />
                        {recentlySubmitted}
                    </div>
                }
                {requests.length == 0 &&
                    <div className='text-center'>
                        <h4><i>No issues reported at<br/>{name}</i></h4>
                    </div>
                }
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