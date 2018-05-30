import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

const imgStyle= {
  maxWidth: '300px',
  borderRadius: '10px',
  margin: '7px'
}

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
        {facilities.map(facility =>
          <div>
            <div className="facility col-md-6 col-sm-12" id={facility.name}>
              <div className="panel">
                <div className="panel-body text-center">
                  <img style={imgStyle} src={facility.imgSrc}/>
                  <h3>{facility.name}</h3>
                  <h4>{facility.neighborhood}</h4>
                  <NavLink to="/Search" role="button" value={facility.oid} className="btn btn-default">Select</NavLink>
                </div>
              </div>
            </div>
          </div>
          )}
      </div>
    );
  }
}