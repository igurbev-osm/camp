import React from 'react';
import Main from './components/Main';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
 return   (
  <Container >
  <Row className="justify-content-md-center">
    <Col>
    <Main />;
    </Col>
  </Row>
</Container>
 )
 

}

export default App