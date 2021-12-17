import { useContext } from "react";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ViewContext } from "../../context/ViewContext";
import AuthHeader from "./AuthHeader";
import "./Menu.scss";

const Menu = ({ setSession: setAxios }) => {
    let navigate = useNavigate();
    const {view, setView} = useContext(ViewContext);    
    return (
        <Navbar bg="light" expand="lg" className="navBar">
            <Container fluid>
                <Navbar.Brand href="/" className="navBarLogo"><Image src="/img/CamPointLogo3.png" className="logoNavBar" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Button
                            id="myPoints"
                            variant="outline-success"
                            className="navBarButton"
                            size="sm"
                            onClick={                                
                                () =>{
                                    setView(view === "map" ? "mypoints" : "map");
                                    navigate(`/${view}/~`)}
                            }
                        >{view === "map" ? "All" : "My"} Points</Button>
                    </Nav>
                    <AuthHeader setSession={setAxios} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}
export default Menu;