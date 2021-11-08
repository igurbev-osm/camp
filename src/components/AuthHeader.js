import { useState } from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import server from "../server/server";

const AuthHeader = () => {
    const [user, setUser] = useState(null);
    if (!user) {
        getUserInfo(setUser);
    }


    return (
        <>
            {/* {user && user.username ? (<>Signed in as: <a href="#login"> {user.username}</a></>) : <a href="#login">Login</a>} */}
            {user && user.username ?  <NavDropdown title={user.username} id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action4">Profile</NavDropdown.Item>                            
                            <NavDropdown.Item href="#action3">Logout</NavDropdown.Item>
                            
                            
                        </NavDropdown> : <Navbar.Text> <a href="#login">Login</a> | <a href="#login">Register</a> </Navbar.Text>}
        </>
    );
}

const getUserInfo = async (setUserFn) => {
    const userInfo = await server.getUserInfo();
    if (!userInfo.error) {
        setUserFn(userInfo);
    }
}

export default AuthHeader;