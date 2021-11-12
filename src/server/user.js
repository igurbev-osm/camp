import axios from "axios";
import { serviceConfig } from "../config/config";

const server = {

    login: async function (params) {

        const url = `${serviceConfig.serviceUrl}/api/user/google-login`;
        try {
            return (await axios.post(url, params)).data;
        } catch (e) {
            return { error: e.message };
        }
    },    
    getUserInfo: async function (sid) {
        const url = `${serviceConfig.serviceUrl}/api/user/info/${sid}`;
        try {
            var resp = await axios.get(url);
            return resp.data;
        } catch (e) {
            return { error: e.message };
        }
    }
}

export default server;