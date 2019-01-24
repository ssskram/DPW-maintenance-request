import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as allRequests from '../../store/allRequests'
import * as Department from '../../store/department'
import * as types from './../../store/types'
import Paging from '../utilities/paging'
import Cards from '../card'
import HydrateStore from '../utilities/hydrateStore'
import Filter from '../filter'
import { Helmet } from "react-helmet"
import Modal from 'react-responsive-modal'
import SelectDepartment from './selectDepartment'

const dropdownStyle = '.custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible}'

interface actionProps {
    setDepartment: (type: string) => void
}

type props =
    types.allRequests &
    types.department &
    actionProps

export class AllRequests extends React.Component<props, any> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            requestsPerPage: 25,
            allRequests: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setRequests(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setRequests(nextProps)
    }

    setRequests(props) {
        if (props.department != ''){
            this.setState({
                allRequests: props.allRequests
                    .filter(request => request.department == props.department)
                    .sort((a, b) => +new Date(b.submitted) - +new Date(a.submitted))
            })
        }
    }

    filterRequests(filteredRequests) {
        this.setState({
            allRequests: filteredRequests
                .filter(request => request.department == this.props.department)
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
            allRequests
        } = this.state

        // Logic for paging
        const indexOfLastRequest = currentPage * requestsPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
        const currentRequests = allRequests.slice(indexOfFirstRequest, indexOfLastRequest);
        const renderRequests = currentRequests.map((request) => {
            return <Cards request={request} key={request.cartegraphID} />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(allRequests.length / requestsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <Helmet>
                    <style>{dropdownStyle}</style>
                </Helmet>
                <HydrateStore />
                <h2>
                    {this.props.department} Requests
                    <span style={{ marginTop: '-8px' }} className='pull-right'>
                        <Filter requests={this.props.allRequests.filter(request => request.department == this.props.department)} returnFiltered={this.filterRequests.bind(this)} />
                    </span>
                </h2>
                <hr />
                {allRequests.length == 0 &&
                    <div className='text-center alert alert-info'>
                        <h3>Nothing to show here</h3>
                    </div>
                }
                {allRequests.length > 0 &&
                    <div className="row">
                        {renderRequests}
                        <Paging
                            count={allRequests}
                            currentPage={currentPage}
                            totalPages={pageNumbers}
                            next={this.handleNextClick.bind(this)}
                            prev={this.handlePreviousClick.bind(this)} />
                        <br />
                        <br />
                    </div>
                }
                <Modal
                    open={this.props.department == ''}
                    onClose={() => { }}
                    classNames={{
                        overlay: 'custom-overlay',
                        modal: 'custom-modal'
                    }}
                    showCloseIcon={false}
                    center>
                    <SelectDepartment
                        allRequests={this.props.allRequests}/>
                </Modal>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.allRequests,
        ...state.department
    }),
    ({
        ...allRequests.actionCreators,
        ...Department.actionCreators
    })
)(AllRequests)