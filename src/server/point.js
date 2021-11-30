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
        
        const url = `${serviceConfig.serviceUrl}/api/dpoint/${sid ? sid : 0}/${pointId}`;
        try {
            return checkResult((await axios.delete(url)).data);
        } catch (e) {
            return { error: e.message };
        }
    },

    updatePoint: async function(sid,point){
        const url = `${serviceConfig.serviceUrl}/api/epoint/${sid}`;
        try{
            return checkResult((await axios.post(url, point)).data);
        }catch(e){
            return {error: e.message}
        }
    },

    ratePoint: async function(sid, pointId, value){
        const url = `${serviceConfig.serviceUrl}/api/rate/${pointId}/${sid}`;
        try{
            return checkResult((await axios.post(url, {vote: value})).data);
        }catch(e){
            return {error: e.message}
        }
    },

    getPointRating: async function(pointId, sid){
        const url = `${serviceConfig.serviceUrl}/api/rating/${pointId}/${sid ? sid : 0}`;
        try{
            return checkResult((await axios.get(url)).data);
        }catch(e){
            return {error: e.message}
        }
    }
}

export default server;