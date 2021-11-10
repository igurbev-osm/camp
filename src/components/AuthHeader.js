import { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import server from "../server/server";

const googleClientId = "672108875979-0ips6gr56qkm87n8f808ql9hg7r5ve65.apps.googleusercontent.com";

const AuthHeader = () => {
    const [user, setUser] = useState(null);
    if (!user) {
        // getUserInfo(setUser);
    }

    return (
        <>
            {user && user.username ? 
            <NavDropdown title={user.username} id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action4">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action3"><GoogleLogout
                    clientId={googleClientId}
                    buttonText="Logout"
                    theme="light"
                    onLogoutSuccess={_ => setUser(null)} /></NavDropdown.Item>
            </NavDropdown> 
            : 
            <GoogleLogin
                clientId={googleClientId}
                buttonText="Login"
                onSuccess={(success) => {
                    console.log("google success: ", success)
                    login({profile: success.profileObj, token: success.tokenObj}, setUser);
                }}
                onFailure={(failure) => { console.log("google failure: ", failure) }}
                cookiePolicy={'single_host_origin'}                
            />}
        </>
    );
}

const login = async (params, setUserFn) => {
    const userInfo = await server.login(params);
    if (!userInfo.error) {
        setUserFn(userInfo);
    }
}

export default AuthHeader;