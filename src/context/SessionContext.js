import { createContext } from "react";
import Cookies from 'universal-cookie';
import axios from "axios";
import {serviceConfig} from "./../config/config"

export const setSessionCookie = (session) => {
    const cookies = new Cookies();
    cookies.remove("sid");
    if (session) {
        cookies.set("sid", session);
    }

};

export const removeSessionCookie = () => {
    const cookies = new Cookies();
    cookies.remove("sid");    
};

const getSessionCookie = () => {
    const cookies = new Cookies();
    return cookies.get("sid");    
};

export const initAxios = () => {
    const sid =  getSessionCookie() || "-";
    const ainstance = axios.create({
        baseURL: serviceConfig.serviceUrl,      
        headers: {"X-Authorization": sid}
      });
      return ainstance;
}

export const SessionContext = createContext(initAxios());