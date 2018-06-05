import * as React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';

export class NavMenu extends React.Component<any, any>  {
    constructor() {
        super();
        this.state = {
            user: ''
        }
    }
    componentDidMount() {
        fetch('/api/userdata/getuser', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState ({
                    user: data,
                })
            });
    }
    public render() {
        const { user } = this.state

        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'} data-toggle="collapse" data-target=".in">DPW<strong> Maintenance Requests</strong></Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li className="sidenav-header">Submit</li>
                        <li>
                            <NavLink to={'/Map'} activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-map-marker'></span> Select facility from map
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Search'} activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-list'></span> Search facility by name
                            </NavLink>
                        </li>
                        <li className="sidenav-header">Track</li>
                        <li>
                            <NavLink to={'/MyRequests'} activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-chevron-right'></span> My requests
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/AllRequests'} activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-chevron-right'></span> All requests
                            </NavLink>
                        </li>
                        <div className='accountcontainer'>
                            <li className="account">{user}</li>
                            <li className='logout'>
                                <NavLink to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn navbar-link'>
                                    <span className='glyphicon glyphicon-user'></span>Logout
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>;
    }
}