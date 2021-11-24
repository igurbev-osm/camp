
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
    const sessionCookie = cookies.get("sid");
    if (sessionCookie === undefined) {
        return {};
    } else {
        return JSON.parse(sessionCookie);
    }
};

export const SessionContext = createContext(getSessionCookie());