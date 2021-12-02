import checkResult from "../utils/httpResult";

const server = function () {
    const axios = this;

    return {
        getPoints: async function (bounds) {
            const url = `/api/points`;
            try {
                return checkResult(((await axios.post(url, bounds)).data));
            } catch (e) {
                return { error: e.message };
            }
        },

        addPoint: async function (point) {
            const url = `/api/point`;
            try {
                return checkResult((await axios.post(url, point)).data);
            } catch (e) {
                return { error: e.message };
            }
        },

        getPointTypes: async function () {
            const url = `/api/pointtypes`;
            try {
                return checkResult((await axios.get(url)).data);
            } catch (e) {
                throw new Error("Error connection server");
                //return { error: e.message };
            }
        },

        getPoint: async function (pointId) {
            const url = `/api/point/${pointId}`;
            try {
                return checkResult((await axios.get(url)).data);
            } catch (e) {
                return { error: e.message };
            }
        },

        deletePoint: async function (pointId) {

            const url = `/api/dpoint/${pointId}`;
            try {
                return checkResult((await axios.delete(url)).data);
            } catch (e) {
                return { error: e.message };
            }
        },

        updatePoint: async function (point) {
            const url = `/api/epoint`;
            try {
                return checkResult((await axios.post(url, point)).data);
            } catch (e) {
                return { error: e.message }
            }
        },

        ratePoint: async function (pointId, value) {
            const url = `/api/rate/${pointId}`;
            try {
                return checkResult((await axios.post(url, { vote: value })).data);
            } catch (e) {
                return { error: e.message }
            }
        },

        getPointRating: async function (pointId) {
            const url = `/api/rating/${pointId}`;
            try {
                return checkResult((await axios.get(url)).data);
            } catch (e) {
                return { error: e.message }
            }
        },

        commentPoint: async function (pointId, comment) {
            const url = `/api/comment/${pointId}`;
            try {
                return checkResult((await axios.post(url, { comment: comment })).data);
            } catch (e) {
                return { error: e.message }
            }
        },

        getPointComments: async function (pointId) {
            const url = `/api/comments/${pointId}`;
            try {
                return checkResult((await axios.get(url)).data);
            } catch (e) {
                return { error: e.message }
            }
        }
    }
};

export default server;