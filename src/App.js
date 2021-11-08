import React from 'react';
import Main from './components/Main';
import { Container, Row, Col } from 'react-bootstrap';
import Menu from "./components/Menu";
import "./App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
 return   (
  <Container className="container">
    <Row className="menu_bar">
    <Col>
      <Menu />
    </Col>
  </Row>
  <Row>
    <Col>
    <Main />
    </Col>
  </Row>


</Container>
 )
 

}

export default App