import * as React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as OpenRequest from '../../store/openRequest'
import AccountContainer from './accountContainer'
import Menu from './menu'

export class NavMenu extends React.Component<any, any> {

  public render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect style={{zIndex: 1000 as any}}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'} onClick={() => this.props.clearRequest()}>DPW Maintenance</Link>
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

export default connect(
  (state: ApplicationState) => ({
      ...state.openRequest
  }),
  ({
      ...OpenRequest.actionCreators
  })
)(NavMenu)