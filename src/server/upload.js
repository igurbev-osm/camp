import axios from "axios";
import { serviceConfig } from "../config/config";

const server = {
    async upload(file) {               
        const data = new FormData();
        data.append('file', file);
        axios.post(serviceConfig.serviceUrl + "/api/upload", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }
}

export default server;