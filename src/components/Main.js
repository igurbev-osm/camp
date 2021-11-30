import React, { useState } from "react";

import MapComponent from "./MapComponent";
import { SessionContext, getSessionCookie } from "../utils/session";
import { Container, Row, Col } from 'react-bootstrap';
import Menu from "./menu/Menu";
import { BrowserRouter, useParams, Route, Routes } from "react-router-dom";

function Main() {

  const [session, setSession] = useState(getSessionCookie());

  return (
    <SessionContext.Provider value={session}>
      <BrowserRouter>
        
          <Container className="container">
            <Row>
              <Col>
                <Menu setSession={setSession} />
              </Col>
            </Row>
            <Row>
              <Col>
              <Routes>
                <Route path="/:viewName/:pointId" element={<Child />} />
                <Route path="/*" element={<MapComponent />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        
      </BrowserRouter>
    </SessionContext.Provider>);
}

const Child = () => {
  let { pointId, viewName } = useParams();
  // switch (viewName) {
    // case "point":
      return <MapComponent pointId={pointId} view={viewName}/>
    // case "mypoints":
    //   return <MapComponent view={viewName} />
    // default:
    //   return <MapComponent />;
//  }

}

export default Main;