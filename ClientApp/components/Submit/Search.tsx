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
    fetch('/getFacilities')
    .then(response => response.json())
    .then(data => this.setState({ facilities: data.cgFacilitiesClass }));

    // get facilities here

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
    
    // const { facilities } = this.state;
    // return (
    //   <div className="container">
    //   {facilities().map(facilities =>

    //   )}
    // </div>
    // );

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
          <div className="col-sm-4">
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
            <div className="panel" id="Facility 2">
              <div className="panel-body">
                <h3>Facility 2</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility 3">
              <div className="panel-body">
                <h3>Facility 3</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dignissim massa elit, sit amet vestibulum libero.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility 4">
              <div className="panel-body">
                <h3>Facility 4</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel" id="Facility 5">
              <div className="panel-body">
                <h3>Facility 5</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat porta varius. Donec nulla nisl, tincidunt vel consequat eu, varius eu augue. Quisque iaculis blandit est sed suscipit.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility 6">
              <div className="panel-body">
                <h3>Facility 6</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in pulvinar ipsum.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility 7">
              <div className="panel-body">
                <h3>Facility 7</h3>
                <p>Address</p>
                <p>Donec eget posuere sapien. Phasellus blandit neque porttitor.
                </p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility 8">
              <div className="panel-body">
                <h3>Facility 8</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit suscipit urna a ornare. Donec egestas at felis consequat rhoncus.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel" id="Facility 9">
              <div className="panel-body">
                <h3>Facility 9</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility 10">
              <div className="panel-body">
                <h3>Facility 10</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac ipsum a est laoreet laoreet. Sed augue nisl.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility 11">
              <div className="panel-body">
                <h3>Facility 11</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget posuere sapien. Phasellus blandit neque porttitor.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility 12">
              <div className="panel-body">
                <h3>Facility 12</h3>
                <p>Address</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus porttitor elit, ac feugiat enim. Vivamus nec elit ultricies, volutpat velit at.</p>
                <div className="text-center">
                  <NavLink to="/Table" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}