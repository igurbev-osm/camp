import axios from "axios";
import { serviceConfig } from "../config/config";
import checkResult from "../utils/httpResult";

const server = {

    getPoints: async function (sid, bounds) {
        const url = `${serviceConfig.serviceUrl}/api/points/${sid ? sid : 0}`;
        try {
            return checkResult(((await axios.post(url, bounds)).data));
        } catch (e) {
            return { error: e.message };
        }
    },

    addPoint: async function (sid, point) {        
        const url = `${serviceConfig.serviceUrl}/api/point/${sid ? sid : 0}`;
        try {
            return checkResult((await axios.post(url, point)).data);
        } catch (e) {
            return { error: e.message };
        }
    },

    getPointTypes: async function () {
        const url = `${serviceConfig.serviceUrl}/api/pointtypes`;
        try {
            return checkResult((await axios.get(url)).data);
        } catch (e) {
            throw new Error("Error connection server");
            //return { error: e.message };
        }

    },

    getPoint: async function (sid, pointId) {        
        const url = `${serviceConfig.serviceUrl}/api/point/${sid ? sid : 0}/${pointId}`;
        try {
            return checkResult((await axios.get(url)).data);
        } catch (e) {
            return { error: e.message };
        }
    },

    deletePoint: async function(pointId, sid){
        if(!sid || "undefined" === sid){
            throw Error("Missing sid");
        }
        const url = `${serviceConfig.serviceUrl}/api/dpoint/${sid ? sid : 0}/${pointId}`;
        try {
            return checkResult((await axios.delete(url)).data);
        } catch (e) {
            return { error: e.message };
        }
    }
}

export default server;