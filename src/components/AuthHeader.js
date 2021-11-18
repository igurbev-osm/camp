import { NavDropdown, Image } from "react-bootstrap";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import _userService from "../server/user";
import "./AuthHeader.scss";
import { googleMapConfig } from "../config/config";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
import initUserManager from "../utils/userManager";

const AuthHeader = () => {

    const userManager = initUserManager(useSelector, useDispatch);
    const [user, setUser] = useState(null);
    useEffect(() => {
        (
            async () => {
                setUser(await userManager.getUserAsync());
            }
        )();
    });

    const login = async (params) => {
        const userInfo = await _userService.login(params);
        if (!userInfo.error) {
            userManager.setUser(userInfo);
        }
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
                            onLogoutSuccess={_ => userManager.setUser(null)} /></NavDropdown.Item>
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