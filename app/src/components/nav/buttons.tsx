import * as React from "react";
import { Link } from "react-router-dom";
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
        <LinkContainer to={"/policy"}>
          <NavItem>
            <Link to="/MyRequests">
              <button className="btn btn-secondary" style={btnStyle}>
                My Requests
              </button>
            </Link>
          </NavItem>
        </LinkContainer>
        <LinkContainer to={"/faq"}>
          <NavItem>
            <Link to="/AllRequests">
              <button className="btn btn-secondary" style={btnStyle}>
                All Requests
              </button>
            </Link>
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}
