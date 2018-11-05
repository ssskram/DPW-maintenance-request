import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class menu extends React.Component {

    public render() {
        return (
            <Nav>
                <LinkContainer to={'/'} exact>
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to={'/map'}>
                    <NavItem>Map</NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}
