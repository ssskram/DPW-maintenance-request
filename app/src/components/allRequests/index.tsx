import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as allRequests from "../../store/allRequests";
import * as types from "./../../store/types";
import Paging from "../utilities/paging";
import Cards from "../shared/requestCard";
import HydrateStore from "../utilities/hydrateStore";
import Filter from "../shared/filter";
import { Helmet } from "react-helmet";
import Modal from "react-responsive-modal";

const dropdownStyle =
  ".custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible}";

type props = {
  allRequests: types.request[];
};

export class AllRequests extends React.Component<props, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      requestsPerPage: 25,
      allRequests: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setRequests(this.props);
  }

  componentWillReceiveProps(nextProps: props) {
    this.setRequests(nextProps);
  }

  setRequests(props: props) {
    this.setState({
      allRequests: props.allRequests.sort(
        (a, b) => +new Date(b.submitted) - +new Date(a.submitted)
      )
    });
  }

  filterRequests(filteredRequests) {
    this.setState({
      allRequests: filteredRequests.sort(
        (a, b) => +new Date(b.submitted) - +new Date(a.submitted)
      )
    });
  }

  handleNextClick() {
    window.scrollTo(0, 0);
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  handlePreviousClick() {
    window.scrollTo(0, 0);
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  render() {
    const { currentPage, requestsPerPage, allRequests } = this.state;

    // Logic for paging
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = allRequests.slice(
      indexOfFirstRequest,
      indexOfLastRequest
    );
    const renderRequests = currentRequests.map(request => {
      return <Cards request={request} key={request.cartegraphID} />;
    });

    // Logic for displaying page numbers
    const pageNumbers: any[] = [];
    for (let i = 1; i <= Math.ceil(allRequests.length / requestsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <Helmet>
          <style>{dropdownStyle}</style>
        </Helmet>
        <HydrateStore />
        <div style={{ fontSize: "2em", color: "#fff" }}>
          All Requests
          <span style={{ marginTop: "-8px" }} className="pull-right">
            <Filter
              requests={this.props.allRequests}
              returnFiltered={this.filterRequests.bind(this)}
            />
          </span>
        </div>
        {allRequests.length == 0 && (
          <div className="text-center alert alert-info">
            <h3>Nothing to show here</h3>
          </div>
        )}
        {allRequests.length > 0 && (
          <div className="row">
            {renderRequests}
            <Paging
              countItems={allRequests}
              currentPage={currentPage}
              totalPages={pageNumbers}
              next={this.handleNextClick.bind(this)}
              prev={this.handlePreviousClick.bind(this)}
            />
            <br />
            <br />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.allRequests
  }),
  {
    ...allRequests.actionCreators
  }
)(AllRequests);
