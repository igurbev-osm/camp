import axios from "axios";
import { serviceConfig } from "../config/config";

const server = {
    getPoints : async function(){
        
        const url = `${serviceConfig.serviceUrl}/api/points`;
        try{           
            return (await axios.get(url)).data;           
        }catch(e){
            return {error: e.message};
        }
    },

    login: async function(){
        const url = "https://google.com"
        var resp = await axios.post(url, {username: "bla bla", passwd: "blabla"});
        return resp.data;
       
    }
}

export default server;