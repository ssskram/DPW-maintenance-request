import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

export default class selectTable extends React.Component<RouteComponentProps<{}>, any> {
  constructor() {
    super();
    this.state = {
      facility: '',
      panels: []
    }
  }

  componentDidMount() {
    let self = this;
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
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <div className="form-element">
                <h4 className="form-h4">Search facilities</h4>
                <input name="filter" id="filter" className="selectpicker form-control" placeholder="Filter by name" onChange={this.filter.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="panel" id="Facility type 1">
              <div className="panel-body">
                <h3>Facility type 1</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget posuere sapien. Phasellus blandit neque porttitor.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 2">
              <div className="panel-body">
                <h3>Facility type 2</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 3">
              <div className="panel-body">
                <h3>Facility type 3</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dignissim massa elit, sit amet vestibulum libero.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 4">
              <div className="panel-body">
                <h3>Facility type 4</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel" id="Facility type 5">
              <div className="panel-body">
                <h3>Facility type 5</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat porta varius. Donec nulla nisl, tincidunt vel consequat eu, varius eu augue. Quisque iaculis blandit est sed suscipit.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 6">
              <div className="panel-body">
                <h3>Facility type 6</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in pulvinar ipsum.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 7">
              <div className="panel-body">
                <h3>Facility type 7</h3>
                <p>Cost p/ sq ft.</p>
                <p>Donec eget posuere sapien. Phasellus blandit neque porttitor.
                </p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 8">
              <div className="panel-body">
                <h3>Facility type 8</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit suscipit urna a ornare. Donec egestas at felis consequat rhoncus.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel" id="Facility type 9">
              <div className="panel-body">
                <h3>Facility type 9</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 10">
              <div className="panel-body">
                <h3>Facility type 10</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac ipsum a est laoreet laoreet. Sed augue nisl.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 11">
              <div className="panel-body">
                <h3>Facility type 11</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget posuere sapien. Phasellus blandit neque porttitor.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
            <div className="panel" id="Facility type 12">
              <div className="panel-body">
                <h3>Facility type 12</h3>
                <p>Cost p/ sq ft.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus porttitor elit, ac feugiat enim. Vivamus nec elit ultricies, volutpat velit at.</p>
                <div className="text-center">
                  <NavLink to="/EstimateType" role="button" className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}