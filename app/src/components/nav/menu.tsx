import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Menu extends React.Component {

    public render() {
        return (
            <Nav>
                <Link to={'/'}>
                    <button className='btn btn-primary nav-button'>New Maintenance Request</button>
                </Link>
                <Link to={'/OfficeMove'}>
                    <button className='btn btn-primary nav-button'>Request an Office Move</button>
                </Link>
                <LinkContainer to={'/MyRequests'}>
                    <NavItem>My Requests</NavItem>
                </LinkContainer>
                <LinkContainer to={'/AllRequests'}>
                    <NavItem>All Requests</NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}
