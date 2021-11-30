import { NavDropdown, Image } from "react-bootstrap";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import _userService from "../../server/user";
import "./AuthHeader.scss";
import { googleMapConfig } from "../../config/config";
import { useContext, useEffect, useState } from "react";
import { SessionContext, setSessionCookie } from "../../context/SessionContext"

const AuthHeader = ({ setSession }) => {
    const sid = useContext(SessionContext);
    const [user, setUser] = useState(null);

    useEffect(() =>{
        (async () => {
            if (sid) {
                const userInfo = await _userService.getUserInfo(sid);
                setUser(userInfo);
            }
        })()},[]
      );

    const login = async (params) => {
        const userInfo = await _userService.login(params);
        if (!userInfo.error) {
            setSessionCookie(userInfo.sid);
            setUser(userInfo);
            setSession(userInfo.sid);
        }
    }

    const logout = () => {
        setSessionCookie(null);
        setUser(null);
        setSession(null);
    }

    return (
        <>
            {user && user.username ?
                <>
                    <Image src={user.imageurl} roundedCircle={true} className="avatar" />
                    <NavDropdown title={user.username} id="navbarScrollingDropdown" className="googleText">
                        <NavDropdown.Item href="#action4" className="googleText">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action3" className="googleText"><GoogleLogout
                            clientId={googleMapConfig.googleClientId}
                            buttonText="Logout"
                            className="googleText"
                            theme="light"
                            onLogoutSuccess={logout} /></NavDropdown.Item>
                    </NavDropdown>
                </>
                :
                <GoogleLogin
                    clientId={googleMapConfig.googleClientId}
                    buttonText="Login"
                    className="googleText"
                    onSuccess={(success) => {
                        login({ profile: success.profileObj, token: success.tokenObj });
                    }}
                    onFailure={(failure) => { console.log("google failure: ", failure) }}
                    cookiePolicy={'single_host_origin'}
                    style={{ height: '30px' }}
                />}
        </>
    );
}

export default AuthHeader;