import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import { SessionContext, getSessionCookie } from "../context/SessionContext";
import { Container, Row, Col } from 'react-bootstrap';
import Menu from "./menu/Menu";
import { BrowserRouter, useParams, Route, Routes } from "react-router-dom";
import { ViewContext } from "../context/ViewContext";

function Main() {

    const [session, setSession] = useState(getSessionCookie());
    const [view, setView] = useState("map");

    const Child = () => {
        let { pointId} = useParams();       
        return <MapComponent pointId={pointId} />
    }
    
    return (
        <SessionContext.Provider value={session}>
            <ViewContext.Provider value={{view, setView}}>
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
            </ViewContext.Provider>
        </SessionContext.Provider >);
}

export default Main;