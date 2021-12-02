
import { serviceConfig } from "../config/config";
import checkResult from "../utils/httpResult";

const server = function () {
    const axios = this;

    return {

        login: async function (params) {
            const url = `${serviceConfig.serviceUrl}/api/user/google-login`;
            try {
                return checkResult((await axios.post(url, params)).data);
            } catch (e) {
                return { error: e.message };
            }
        },
        getUserInfo: async function (sid) {
            const url = `${serviceConfig.serviceUrl}/api/user/info`;
            try {
                var resp = await axios.get(url);
                return checkResult(resp.data);
            } catch (e) {
                return { error: e.message };
            }
        }
    }
}
 export default server;