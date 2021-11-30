import { createContext } from "react";
import Cookies from 'universal-cookie';

export const setSessionCookie = (session) => {
    const cookies = new Cookies();
    cookies.remove("sid");
    if (session) {
        cookies.set("sid", session);
    }

};

export const getSessionCookie = () => {
    const cookies = new Cookies();
    return cookies.get("sid");    
};

export const SessionContext = createContext(getSessionCookie());