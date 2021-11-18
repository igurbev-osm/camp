import axios from "axios";
import checkResult from "../utils/httpResult";
import { serviceConfig } from "../config/config";

const server = {
    async upload(file, pointId, sid) {                           
        const data = new FormData();
        data.append('file', file);
        const headers = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        try{
            return checkResult(await axios.post(`${serviceConfig.serviceUrl}/api/upload/${sid}/${pointId}`, data, headers));
        }catch(e){
            console.log("file upload error: ", e);
            throw new Error("File upload error: " + e.message);
        }
    },

    async getImages(pointId, sid){        
        const url = `${serviceConfig.serviceUrl}/api/images/${sid}/${pointId}`;
        try{
            return checkResult((await axios.get(url)).data);
        }catch(e){
            console.log("Get images error: ",e);
            throw new Error("GetImages error: " + e.message);
        }
    }
}

export default server;