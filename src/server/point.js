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

    addPoint: async function (sid, point) {
        const url = `${serviceConfig.serviceUrl}/api/point/${sid ? sid : 0}`;
        try {
            return (await axios.post(url, point)).data;
        } catch (e) {
            return { error: e.message };
        }
    },

    getPointTypes: async function () {

        const url = `${serviceConfig.serviceUrl}/api/pointtypes`;
        try {
            return (await axios.get(url)).data;
        } catch (e) {
            throw new Error("Error connection server");
            //return { error: e.message };
        }

    },

    getPoint: async function (sid, pointId) {

        const url = `${serviceConfig.serviceUrl}/api/point/${sid ? sid : 0}/pointId`;
        try {
            return (await axios.get(url)).data;
        } catch (e) {
            return { error: e.message };
        }
    },
}

export default server;