import { useState } from "react";
import { NavDropdown, Image} from "react-bootstrap";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import server from "../server/server";
import "./AuthHeader.scss";

const googleClientId = "672108875979-0ips6gr56qkm87n8f808ql9hg7r5ve65.apps.googleusercontent.com";

const AuthHeader = () => {
    const [user, setUser] = useState(null);
    const login = async (params) => {
        const userInfo = await server.login(params);
        if (!userInfo.error) {
            setUser(userInfo);
        }
    }
    if (!user) {
        // getUserInfo(setUser);
    }

    return (
        <>
            {user && user.username ? 
            <>
            <Image src={user.imageUrl} roundedCircle={true} className="avatar"/>
            <NavDropdown title={user.username} id="navbarScrollingDropdown" className="googleText">
                <NavDropdown.Item href="#action4" className="googleText">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action3" className="googleText"><GoogleLogout
                    clientId={googleClientId}
                    buttonText="Logout"
                    className="googleText"
                    theme="light"                    
                    onLogoutSuccess={_ => setUser(null)} /></NavDropdown.Item>
            </NavDropdown>             
            </>
            : 
            <GoogleLogin
                clientId={googleClientId}
                buttonText="Login"
                className="googleText"
                onSuccess={(success) => {
                    login({profile: success.profileObj, token: success.tokenObj});
                }}
                onFailure={(failure) => { console.log("google failure: ", failure) }}
                cookiePolicy={'single_host_origin'}                
            />}
        </>
    );
}

export default AuthHeader;