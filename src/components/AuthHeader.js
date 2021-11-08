import { useState } from "react";
import { Navbar } from "react-bootstrap";
import server from "../server/server";

const AuthHeader = () => {
    const [user, setUser] = useState(null);
    if (!user) {
        getUserInfo(setUser);
    }


    return (
        <Navbar.Text>
            {user && user.username ? (<>Signed in as: <a href="#login"> {user.username}</a></>) : <a href="#login">Login</a>}
        </Navbar.Text>
    );
}

const getUserInfo = async (setUserFn) => {
    const userInfo = await server.getUserInfo();
    if (!userInfo.error) {
        setUserFn(userInfo);
    }
}

export default AuthHeader;