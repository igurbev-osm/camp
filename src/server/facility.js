
import checkResult from "../utils/httpResult";
const server = function () {
    const axios = this;

    return {
        getFacilities: async function () {
            const url = `/api/facilities`;
            try {
                return checkResult(((await axios.get(url)).data));
            } catch (e) {
                return { error: e.message };
            }
        },

        getPointFacilities: async function (pointId) {
            const url = `/api/facilities/${pointId}`;
            try {
                return checkResult(((await axios.get(url)).data));
            } catch (e) {
                return { error: e.message };
            }
        },

        addRemovePointFacilities: async function (pointId, facilityIds) {
            const url = `/api/facilitiesedit/${pointId}`;
            try {
                return checkResult(((await axios.post(url, facilityIds)).data));
            } catch (e) {
                return { error: e.message };
            }
        }
    }
}
export default server;