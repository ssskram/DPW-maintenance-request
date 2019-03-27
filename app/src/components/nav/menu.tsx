import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Menu extends React.Component {

    public render() {
        return (
            <Nav>
                <LinkContainer to={'/'}>
                    <NavItem className='btn btn-primary'>New Maintenance Request</NavItem>
                </LinkContainer>
                <LinkContainer to={'/OfficeMove'}>
                    <NavItem className='btn btn-primary'>Request an Office Move</NavItem>
                </LinkContainer>
                <LinkContainer to={'/MyRequests'}>
                    <NavItem className='btn btn-secondary'><span style={{color: 'black'}}>My Requests</span></NavItem>
                </LinkContainer>
                <LinkContainer to={'/AllRequests'}>
                    <NavItem className='btn btn-secondary'><span style={{color: 'black'}}>All Requests</span></NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}
