import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as FacilitiesStore from '../../store/facilities';
import Overlay from './Overlay';
import FacilityCard from './FacilityCard'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fffcf5',
    border: 'solid 1px rgba(160, 160, 160, 0.3)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
    overflow: 'visible',
    maxWidth: '1300px',
    maxHeight: '100vh',
    overflowY: 'auto'
  }
};

type FacilitiesProps =
  FacilitiesStore.FacilitiesState
  & typeof FacilitiesStore.actionCreators
  & RouteComponentProps<{}>;

export class Search extends React.Component<FacilitiesProps, any> {
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
      if (element.id.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1) {
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
                <h2 className="form-h4">Search facilities</h2>
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
        <Modal isOpen={this.state.modalIsOpen} style={modalStyles}>
          <Overlay
            exit={this.closeModal.bind(this)}
            img={this.state.selectedPlace.img}
            name={this.state.selectedPlace.name}
            neighborhood={this.state.selectedPlace.neighborhood} />
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.facility,
  FacilitiesStore.actionCreators
)(Search as any) as typeof Search;