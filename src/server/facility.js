import axios from "axios";
import { serviceConfig } from "../config/config";
import checkResult from "../utils/httpResult";

const server = {
    getFacilities: async function () {
        const url = `${serviceConfig.serviceUrl}/api/facilities`;
        try {
            return checkResult(((await axios.get(url)).data));
        } catch (e) {
            return { error: e.message };
        }
    }
}

export default server;