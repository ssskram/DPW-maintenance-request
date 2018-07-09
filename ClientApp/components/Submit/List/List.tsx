import * as React from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as FacilitiesStore from '../../../store/facilities';
import * as Ping from '../../../store/ping';
import Overlay from '../Form/Overlay';
import FacilityCard from './FacilityCard'
import Paging from '../../Paging'

export class Search extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      facilities: this.props.facilities,
      modalIsOpen: false,
      selectedPlace: {},
      currentPage: 1,
      facilitiesPerPage: 15,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    // ping server
    this.props.ping()

    // load facilities into store
    this.props.requestAllFacilities()
  }

  componentWillReceiveProps(props) {
    this.setState({
      facilities: props.facilities,
      itemCount: props.facilities.length,
    });
  }

  filter(event) {
    let input = event.target.value.toLowerCase()
    const filtered = this.props.facilities.filter(function (item) {
      if (!item.name.toLowerCase().includes(input)) {
        return false
      }
      return true
    })
    this.setState({
      currentPage: 1,
      facilities: filtered,
      itemCount: filtered.length
    })
  }

  buttonClick = event => {
    let self = this;
    var obj = this.props.facilities.find(function (obj) { return obj.oid === event.target.id; });
    self.setState({
      modalIsOpen: true,
      selectedPlace: obj
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
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
      modalIsOpen,
      facilities,
      currentPage,
      facilitiesPerPage } = this.state;

    // Logic for paging
    const indexOfLastFacility = currentPage * facilitiesPerPage;
    const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
    const currentFacilities = facilities.slice(indexOfFirstFacility, indexOfLastFacility);
    const renderFacilities = currentFacilities.map((facility, index) => {
      return <FacilityCard
        key={facility.oid}
        oid={facility.oid}
        name={facility.name}
        neighborhood={facility.neighborhood}
        img={facility.img}
        select={this.buttonClick.bind(this)} />
    })

    // Logic for displaying page numbers
    const pageNumbers: any[] = []
    for (let i = 1; i <= Math.ceil(facilities.length / facilitiesPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <div className="form-element">
                <h3 className="form-h">Search facilities</h3>
                <input name="filter" id="filter" className="selectpicker form-control" placeholder="Filter by name" onChange={this.filter.bind(this)} />
              </div>
            </div>
          </div>
        </div>

        {renderFacilities}

        <Modal
          open={modalIsOpen}
          onClose={this.closeModal.bind(this)}
          classNames={{
            transitionEnter: 'transition-enter',
            transitionEnterActive: 'transition-enter-active',
            overlay: 'custom-overlay',
            modal: 'custom-modal'
          }}
          animationDuration={1000}
          center>
          <Overlay
            img={this.state.selectedPlace.img}
            name={this.state.selectedPlace.name}
            neighborhood={this.state.selectedPlace.neighborhood} />
        </Modal>

        <Paging
          count={facilities}
          currentPage={currentPage}
          totalPages={pageNumbers}
          next={this.handleNextClick.bind(this)}
          prev={this.handlePreviousClick.bind(this)} />

      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.facility,
    ...state.ping
  }),
  ({
    ...FacilitiesStore.actionCreators,
    ...Ping.actionCreators
  })
)(Search as any) as typeof Search;