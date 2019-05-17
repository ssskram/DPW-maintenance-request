import * as React from "react";
import { Grid, Row } from "react-bootstrap";
import NavMenu from "./nav";

export default props => (
  <Grid fluid>
    <Row>
      <NavMenu />
    </Row>
    <Row>
      <div className="col-md-8 col-md-offset-2">{props.children}</div>
    </Row>
  </Grid>
);
