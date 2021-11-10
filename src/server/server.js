import axios from "axios";
import { serviceConfig } from "../config/config";

const server = {

    login : async function(params){
        
        const url = `${serviceConfig.serviceUrl}/api/login`;
        try{           
            return (await axios.post(url, params)).data;           
        }catch(e){
            return {error: e.message};
        }
    },

    getPoints : async function(){
        
        const url = `${serviceConfig.serviceUrl}/api/points`;
        try{           
            return (await axios.get(url)).data;           
        }catch(e){
            return {error: e.message};
        }
    },

    getUserInfo: async function(){
        const url = `${serviceConfig.serviceUrl}/api/userinfo`;
        try{           
        var resp = await axios.get(url);
        return resp.data;       
        }catch(e){
            return {error: e.message};
        }
    }
}

export default server;