import * as React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const btnStyle = {
  fontSize: "16px",
  margin: "10px 5px"
};

export default class NavButtons extends React.Component<{}, {}> {
  render() {
    return (
      <Nav>
        <LinkContainer to={"/MyRequests"}>
          <NavItem>
            <button className="btn btn-secondary" style={btnStyle}>
              My Requests
            </button>
          </NavItem>
        </LinkContainer>
        <LinkContainer to={"/AllRequests"}>
          <NavItem>
            <button className="btn btn-secondary" style={btnStyle}>
              All Requests
            </button>
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}
