import * as React from "react";
import Select from "../formElements/select";
import Modal from "react-responsive-modal";
import filter from "../../functions/filter";
import removeDuplicates from "../../functions/removeDuplicates";

export default class Filter extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      onFilter: false,
      modalIsOpen: false,
      facilities: [],
      facility: "",
      statuses: [],
      status: "",
      issues: [],
      issue: "",
      departments: [],
      department: ""
    };
  }

  componentDidMount() {
    this.setDropdowns(this.props.requests);
  }

  componentWillReceiveProps(props) {
    this.setDropdowns(props.requests);
  }

  setDropdowns(requests) {
    let facilities = [] as any;
    let statuses = [] as any;
    let issues = [] as any;
    let departments = [] as any;
    if (requests) {
      requests.forEach(request => {
        const facility = { value: request.building, label: request.building };
        const status = { value: request.status, label: request.status };
        const issue = { value: request.issue, label: request.issue };
        facilities.push(facility);
        statuses.push(status);
        issues.push(issue);
        if (request.department) {
          const department = {
            value: request.department,
            label: request.department
          };
          departments.push(department);
        }
      });
      // take unique, set to state
      this.setState({
        facilities: removeDuplicates(facilities, "value"),
        statuses: removeDuplicates(statuses, "value"),
        issues: removeDuplicates(issues, "value"),
        departments: removeDuplicates(departments, "value")
      });
    }
  }

  filter() {
    const filterLoad = {
      department: this.state.department.value,
      facility: this.state.facility.value,
      status: this.state.status.value,
      issue: this.state.issue.value
    };
    this.props.returnFiltered(filter(this.props.requests, filterLoad));
    this.setState({
      modalIsOpen: false,
      onFilter: true
    });
  }

  clearFilter() {
    this.props.returnFiltered(this.props.requests);
    this.setState({
      onFilter: false,
      department: "",
      facility: "",
      status: "",
      issue: ""
    });
  }

  public render() {
    const {
      onFilter,
      modalIsOpen,
      facilities,
      facility,
      statuses,
      status,
      issues,
      issue,
      departments,
      department
    } = this.state;

    return (
      <div>
        {onFilter == false && (
          <button
            onClick={() => this.setState({ modalIsOpen: true })}
            className="btn  btn-secondary"
          >
            <span
              style={{ padding: "3px" }}
              className="hidden-md hidden-lg hidden-xl glyphicon glyphicon-search"
            />
            <span className="hidden-sm hidden-xs">Filter</span>
          </button>
        )}
        {onFilter == true && (
          <button
            onClick={this.clearFilter.bind(this)}
            className="btn  btn-secondary"
          >
            <span className="hidden-md hidden-lg hidden-xl glyphicon glyphicon-remove" />
            <span className="hidden-sm hidden-xs">Clear filter</span>
          </button>
        )}
        <Modal
          open={modalIsOpen}
          onClose={() => this.setState({ modalIsOpen: false })}
          classNames={{
            overlay: "custom-overlay",
            modal: "custom-modal"
          }}
          center
        >
          <div>
            <div className="col-md-12">
              <Select
                value={department}
                header="Department"
                placeholder="Select department"
                onChange={department => this.setState({ department })}
                multi={false}
                options={departments}
                required={false}
              />
            </div>
            <div className="col-md-12">
              <Select
                value={facility}
                header="Facilities"
                placeholder="Select facility"
                onChange={facility => this.setState({ facility })}
                multi={false}
                options={facilities}
                required={false}
              />
            </div>
            <div className="col-md-12">
              <Select
                value={status}
                header="Status"
                placeholder="Select status"
                onChange={status => this.setState({ status })}
                multi={false}
                options={statuses}
                required={false}
              />
            </div>
            <div className="col-md-12">
              <Select
                value={issue}
                header="Issue"
                placeholder="Select issue"
                onChange={issue => this.setState({ issue })}
                multi={false}
                options={issues}
                required={false}
              />
            </div>
            <div className="col-md-12 text-center">
              <button
                onClick={this.filter.bind(this)}
                className="btn btn-success"
              >
                Apply filter
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
