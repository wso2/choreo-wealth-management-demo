import axios from "axios";

export const post = async (requestConfig) => {
    return request(requestConfig);
}

export const get = async (requestConfig) => {
    return request(requestConfig);
}

const request = async (requestConfig) => {
    return await axios
        .request(requestConfig)
        .then((response) => {
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}