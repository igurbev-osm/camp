import { Navbar, Container, Nav,  Form, FormControl, Button, Image } from "react-bootstrap";
import AuthHeader from "./AuthHeader";
import "./Menu.scss";

const Menu = () => {
    return (
        <Navbar bg="light" expand="lg" className="navBar">
            <Container fluid>
                <Navbar.Brand href="#" className="navBarLogo"><Image src="/img/CamPointLogo3.png" className="logoNavBar" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" className="navBarLink">Add Place</Nav.Link>
                        <Nav.Link href="#action2" className="navBarLink">My Points</Nav.Link>

                        <Form className="d-flex ">
                            <FormControl
                                type="search"
                                placeholder="Find a place"
                                className="me-2"
                                aria-label="Search"
                                size="sm"
                            />
                            <Button variant="outline-success" className="navBarButton" size="sm" >Search</Button>
                        </Form>    
                    </Nav>
                    
                    <AuthHeader />

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}
export default Menu;