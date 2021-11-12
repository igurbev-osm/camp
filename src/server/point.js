import axios from "axios";
import { serviceConfig } from "../config/config";

const server = {    

    getPoints: async function () {

        const url = `${serviceConfig.serviceUrl}/api/points`;
        try {
            return (await axios.get(url)).data;
        } catch (e) {
            return { error: e.message };
        }
    },    
}

export default server;