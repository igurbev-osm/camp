import React, { useState } from "react";
import MapComponent from "./MapComponent";
import { SessionContext, initAxios } from "../context/SessionContext";
import { Container, Row, Col } from 'react-bootstrap';
import Menu from "./menu/Menu";
import { BrowserRouter, useParams, Route, Routes } from "react-router-dom";
import { ViewContext } from "../context/ViewContext";
import {isMobile} from 'react-device-detect';

function Main() {

    const [axios, setAxios] = useState(initAxios);
    const [view, setView] = useState("map");

    const Child = () => {
        let { pointId, viewName} = useParams();       
        return <MapComponent pointId={pointId} currentView={viewName} />
    };   
   

    return (
        <SessionContext.Provider value={axios}>
            <ViewContext.Provider value={{view, setView}}>
                <BrowserRouter>
                    <Container className={"container-" + isMobile ? "mobile" : "browser"}>
                        <Row>
                            <Col>
                                <Menu setSession={setAxios} />
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