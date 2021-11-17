import axios from "axios";
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
            await axios.post(`${serviceConfig.serviceUrl}/api/upload/${sid}/${pointId}`, data, headers);
        }catch(e){
            console.log("file upload error: ",e);
            throw new Error("File upload error");
        }
    }
}

export default server;