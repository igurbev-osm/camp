import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Image } from "react-bootstrap";
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
                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown" className="navBarLink">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled className="navBarLink">
                            Link
                        </Nav.Link> */}
                        <Form className="d-flex ">
                        <FormControl
                            type="search"
                            placeholder="Find a place"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" className="navBarButton">Search</Button>
                    </Form>
                    </Nav>                  
                    <AuthHeader />

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );


}
export default Menu;