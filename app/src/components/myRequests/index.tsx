import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as allRequests from '../../store/allRequests'
import * as user from '../../store/user'
import * as types from './../../store/types'
import Paging from '../utilities/paging'
import Cards from './card'
import HydrateStore from '../utilities/hydrateStore'
import Filter from '../filter'
import { Helmet } from "react-helmet"

const dropdownStyle = '.custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible}'

type props =
    types.allRequests &
    types.user

export class Track extends React.Component<props, any> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            requestsPerPage: 25,
            myRequests: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setRequests(this.props.allRequests)
    }

    componentWillReceiveProps(nextProps) {
        this.setRequests(nextProps.allRequests)
    }

    setRequests(allRequests) {
        this.setState({
            myRequests: allRequests
                .filter(request => request.submittedBy == this.props.user)
                .sort((a, b) => +new Date(b.submitted) - +new Date(a.submitted))
        })
    }

    filterRequests(filteredRequests) {
        this.setState({
            myRequests: filteredRequests
                .sort((a, b) => +new Date(b.submitted) - +new Date(a.submitted))
        })
    }

    handleNextClick() {
        window.scrollTo(0, 0)
        this.setState({ currentPage: this.state.currentPage + 1 })
    }

    handlePreviousClick() {
        window.scrollTo(0, 0)
        this.setState({ currentPage: this.state.currentPage - 1 })
    }

    render() {
        const {
            currentPage,
            requestsPerPage,
            myRequests
        } = this.state

        // Logic for paging
        const indexOfLastRequest = currentPage * requestsPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
        const currentRequests = myRequests.slice(indexOfFirstRequest, indexOfLastRequest);
        const renderRequests = currentRequests.map((request) => {
            return <Cards myRequest={request} key={request.cartegraphID} />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(myRequests.length / requestsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <Helmet>
                    <style>{dropdownStyle}</style>
                </Helmet>
                <HydrateStore />
                <h1>
                    Your requests
                    <span style={{ marginTop: '-8px' }} className='pull-right'>
                        <Filter myRequests={this.props.allRequests.filter(request => request.submittedBy == this.props.user)} returnFiltered={this.filterRequests.bind(this)} />
                    </span>
                </h1>
                <hr />
                {this.props.allRequests.length == 0 &&
                    <div className='text-center alert alert-info'>
                        <h2>You haven't submitted any maintenance requests!</h2>
                    </div>
                }
                {this.props.allRequests.length > 0 && myRequests.length == 0 &&
                    <div className='text-center alert alert-info'>
                        <h2>Nothing matches those search criteria</h2>
                    </div>
                }
                {myRequests.length > 0 &&
                    <div className="col-md-12">
                        {renderRequests}
                        <Paging
                            count={myRequests}
                            currentPage={currentPage}
                            totalPages={pageNumbers}
                            next={this.handleNextClick.bind(this)}
                            prev={this.handlePreviousClick.bind(this)} />
                        <br />
                        <br />
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.allRequests,
        ...state.user
    }),
    ({
        ...allRequests.actionCreators,
        ...user.actionCreators
    })
)(Track)