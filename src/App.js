import React from 'react';
import Main from './components/Main';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Menu from "./components/Menu";
import "./App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Container className="container">
      <Row>
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