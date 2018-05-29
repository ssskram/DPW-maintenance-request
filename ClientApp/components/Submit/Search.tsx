import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

export default class Search extends React.Component<RouteComponentProps<{}>, any> {
  constructor() {
    super();
    this.state = {
      facility: '',
      panels: [],
      facilities: []
    }
  }

  componentDidMount() {
    let self = this;
    fetch('/api/facilities/get', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ facilities: data.cgFacilitiesClass }));
    var classname = document.getElementsByClassName('panel');
    self.setState({ panels: classname });
  }

  filter(event: any) {
    let self = this;
    Array.from(self.state.panels).forEach(function (element: any) {
      if (element.id.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1) {
        element.style.display = "none";
      }
      else {
        element.style.display = "block";
      }
    });
  }


  public render() {
    const { facilities } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <div className="form-element">
                <h3 className="form-h4">Search facilities</h3>
                <input name="filter" id="filter" className="selectpicker form-control" placeholder="Filter by name" onChange={this.filter.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {facilities.map(facility =>
            <div className="col-md-4">
              <div className="panel" id="Facility 1">
                <div className="panel-body">
                  <h3>Facility 1</h3>
                  <p>Address</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget posuere sapien. Phasellus blandit neque porttitor.</p>
                  <div className="text-center">
                    <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}