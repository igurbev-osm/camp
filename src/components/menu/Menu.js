import { useContext } from "react";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ViewContext } from "../../context/ViewContext";
import AuthHeader from "./AuthHeader";
import "./Menu.scss";

const Menu = ({ setSession }) => {
    let navigate = useNavigate();
    const {view, setView} = useContext(ViewContext);

    //const newView = view === "map" ? "mypoints" : "map";    

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
                        >{view === "map" ? "My" : "All"} Points</Button>
                    </Nav>
                    <AuthHeader setSession={setSession} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}
export default Menu;