import { NavDropdown, Image } from "react-bootstrap";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import _userServiceF from "../../server/user";
import "./AuthHeader.scss";
import { googleMapConfig } from "../../config/config";
import { useContext, useEffect, useState } from "react";
import { initAxios, SessionContext, setSessionCookie } from "../../context/SessionContext"
import { isLoggedIn } from "../../utils/session";
import Alert from "../sub/Alert";

const AuthHeader = ({ setSession: setAxios }) => {
    const _axios = useContext(SessionContext);
    const _userService = (_userServiceF.bind(_axios))();
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState(false);

    useEffect(() =>{
        (async () => {
            if (!user && isLoggedIn(_axios)) {
                const userInfo = await _userService.getUserInfo();
                setUser(userInfo);
            }
        })()},[_axios, _userService, user]
      );

    const login = async (params) => {
        const userInfo = await _userService.login(params);
        if (!userInfo.error) {
            setSessionCookie(userInfo.sid);
            setUser(userInfo);
            setAxios(initAxios);
        }
    }

    const logout = () => {
        setSessionCookie(null);
        setUser(null);
        setAxios(initAxios);
    }

    return (
        <div className="auth-block">            
            {user && user.username ?
                <>
                    <Image src={user.imageurl} roundedCircle={true} className="avatar" />
                    <NavDropdown title={user.username} id="navbarScrollingDropdown" className="googleText">
                        
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
                    onFailure={(failure) => { 
                        console.log("google failure: ", failure);
                        setAlert("Google login failed");
                    }}
                    cookiePolicy={'single_host_origin'}
                    style={{ height: '30px' }}
                />}
                <Alert show={alert} message={alert} onCancel={setAlert(null)}/>
        </div>
    );
}

export default AuthHeader;