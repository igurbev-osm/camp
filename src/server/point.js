import axios from "axios";
import { serviceConfig } from "../config/config";

const server = {    

    getPoints: async function (sid, bounds) {

        const url = `${serviceConfig.serviceUrl}/api/points/${sid ? sid : 0}`;
        try {
            return (await axios.post(url, bounds)).data;
        } catch (e) {
            return { error: e.message };
        }
    },
    
    addPoint: async function(sid, point){
        const url = `${serviceConfig.serviceUrl}/api/point/${sid ? sid : 0}`;
        try {
            return (await axios.post(url, point)).data;
        } catch (e) {
            return { error: e.message };
        }
    }
}

export default server;