import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class menu extends React.Component {

    public render() {
        return (
            <Nav>
                <LinkContainer to={'/'} exact>
                    <NavItem>Submit</NavItem>
                </LinkContainer>
                <LinkContainer to={'/track'}>
                    <NavItem>Track</NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}
