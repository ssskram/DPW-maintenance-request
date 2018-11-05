import * as React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import AccountContainer from './accountContainer'
import Menu from './menu'

export default class NavMenu extends React.Component<any, any> {

  public render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>DPW Maintenance</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Menu />
          <AccountContainer />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
