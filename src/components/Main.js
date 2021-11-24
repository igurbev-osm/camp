import React, { useState} from "react";

import MapComponent from "./MapComponent";
import { SessionContext, getSessionCookie } from "../utils/session";
import { Container, Row, Col } from 'react-bootstrap';
import Menu from "./Menu";

function Main() {

  const [session, setSession] = useState(getSessionCookie());

  return ( 
  <SessionContext.Provider value={session}>
    <Container className="container">
      <Row>
        <Col>
          <Menu setSession={setSession}/>
        </Col>
      </Row>
      <Row>
        <Col>
        <MapComponent/>
        </Col>
      </Row>
    </Container>
  </SessionContext.Provider>);
  

}

export default Main;