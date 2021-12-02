import checkResult from "../utils/httpResult";

const server = function () {
    const axios = this;

    return {
        async upload(file, pointId) {
            const data = new FormData();
            data.append('file', file);
            const headers = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            try {
                return checkResult(await axios.post(`}/api/upload/${pointId}`, data, headers));
            } catch (e) {
                console.log("file upload error: ", e);
                throw new Error("File upload error: " + e.message);
            }
        },

        async getImages(pointId) {
            const url = `/api/images/${pointId}`;
            try {
                return checkResult((await axios.get(url)).data);
            } catch (e) {
                console.log("Get images error: ", e);
                throw new Error("GetImages error: " + e.message);
            }
        }
    }
}

export default server;