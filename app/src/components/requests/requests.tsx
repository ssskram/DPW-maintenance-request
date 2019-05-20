import * as React from "react";
import * as types from "./../../store/types";
import Paging from "../utilities/paging";
import Cards from "./requestCard";
import HydrateStore from "../utilities/hydrateStore";
import Filter from "./filter";
import { Helmet } from "react-helmet";
import { Cat } from "react-kawaii";
import Spinner from "../utilities/spinner";

const dropdownStyle =
  ".custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible}";

type props = {
  collection: "All" | "My";
  allRequests: types.request[];
  user: types.user;
};

export default class Requests extends React.Component<props, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      requestsPerPage: 20,
      requests: undefined
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
      allRequests:
        props.allRequests.length > 0
          ? this.sortFilter(props.allRequests)
          : undefined
    });
  }

  filterRequests(filteredRequests: types.request[]) {
    this.setState({
      allRequests: this.sortFilter(filteredRequests)
    });
  }

  sortFilter(requests: types.request[]) {
    if (this.props.collection == "My") {
      return requests
        .filter(request => request.submittedBy == this.props.user.email)
        .sort((a, b) => +new Date(b.submitted) - +new Date(a.submitted));
    } else {
      return requests.sort(
        (a, b) => +new Date(b.submitted) - +new Date(a.submitted)
      );
    }
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
    console.log(this.props);

    const { currentPage, requestsPerPage, allRequests } = this.state;

    // Logic for paging
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = allRequests
      ? allRequests.slice(indexOfFirstRequest, indexOfLastRequest)
      : [];
    const renderRequests = currentRequests.map(request => {
      return <Cards request={request} key={request.cartegraphID} />;
    });

    // Logic for displaying page numbers
    const pageNumbers: any[] = [];
    if (allRequests) {
      for (
        let i = 1;
        i <= Math.ceil(allRequests.length / requestsPerPage);
        i++
      ) {
        pageNumbers.push(i);
      }
    }

    return (
      <div>
        <Helmet>
          <style>{dropdownStyle}</style>
        </Helmet>
        <HydrateStore />
        <div style={{ fontSize: "2em", color: "#fff" }}>
          {this.props.collection} Requests
          <span style={{ marginTop: "-8px" }} className="pull-right">
            <Filter
              requests={this.props.allRequests}
              returnFiltered={this.filterRequests.bind(this)}
            />
          </span>
        </div>
        <hr />
        {allRequests == undefined && (
          <Spinner notice="...loading requests..." />
        )}
        {allRequests && (
          <div>
            {allRequests.length == 0 && (
              <div className="text-center" style={{ margin: "60px 0px" }}>
                <Cat size={200} mood="shocked" color="#AED3E5" />
                <div
                  className="alert alert-info"
                  style={{ maxWidth: "650px", margin: "0 auto" }}
                >
                  <h3>Nothing to show here</h3>
                </div>
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
        )}
      </div>
    );
  }
}
