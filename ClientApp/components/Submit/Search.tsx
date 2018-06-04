import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import Overlay from './Overlay';
import FacilityCard from './FacilityCard'

const imgStyle = {
  maxWidth: '300px',
  borderRadius: '10px',
  margin: '7px'
}

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
    overlfow: 'scroll'
  }
};

export default class Search extends React.Component<RouteComponentProps<{}>, any> {
  constructor() {
    super();
    this.state = {
      facility: '',
      panels: [],
      facilities: [],
      modalIsOpen: false,
      selectedPlace: {}
    }
  }

  componentDidMount() {
    let self = this;
    fetch('/api/facilities/search', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ facilities: data }));

    var classname = document.getElementsByClassName('facility');
    self.setState({ panels: classname });
  }

  filter(event: any) {
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

  buttonClick = props => {
    alert(props.oid)
    let self = this;
    self.setState({
      modalIsOpen: true
      // selectedPlace: props.oid
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  public render() {
    const { facilities } = this.state;
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
          {facilities.map(facility =>
            <FacilityCard
              key={facility.oid}
              oid={facility.oid}
              name={facility.name}
              neighborhood={facility.neighborhood}
              imgSrc={facility.imgSrc}
              select={this.buttonClick} />
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