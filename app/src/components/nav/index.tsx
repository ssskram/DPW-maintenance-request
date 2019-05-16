import * as React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import AccountContainer from "./accountContainer";
import Buttons from "./buttons";

export default class NavMenu extends React.Component<{}, {}> {
  public render() {
    return (
      <Navbar
        inverse
        fixedTop
        fluid
        collapseOnSelect
        style={{ zIndex: 1000 as any }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={"/"}>DPW Work Orders</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="text-xs-center">
          <Buttons />
          <AccountContainer />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
