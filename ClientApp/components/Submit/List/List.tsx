import * as React from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as FacilitiesStore from '../../../store/facilities';
import Overlay from '../Form/Overlay';
import FacilityCard from './FacilityCard'

export class Search extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      panels: [],
      modalIsOpen: false,
      selectedPlace: {}
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    // ping server
    fetch('/api/ping/pong', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data == 0) {
          window.location.reload();
        }
      });

    this.props.requestAllFacilities()

    // set panels of faciliies to array, write to state
    var classname = document.getElementsByClassName('facility');
    this.setState({
      panels: classname
    });
  }

  filter(event) {
    let self = this;
    Array.from(self.state.panels).forEach(function (element: any) {
      if ((element.id.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1)) {
        element.style.display = "none";
      }
      else {
        element.style.display = "";
      }
    });
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

  public render() {
    const { modalIsOpen } = this.state;

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
        {this.props.facilities.map(facility =>
          <FacilityCard
            key={facility.oid}
            oid={facility.oid}
            name={facility.name}
            neighborhood={facility.neighborhood}
            img={facility.img}
            select={this.buttonClick.bind(this)} />
        )}

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
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) =>
    state.facility,
  FacilitiesStore.actionCreators
)(Search as any) as typeof Search;