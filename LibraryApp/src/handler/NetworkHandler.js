import axios from 'axios';

export const get = async (url) => {
    return await axios.get(url);
};

export const post = async (url, data) => {
    return await axios.post(url, data);
};

export const put = async (url, data) => {
    return await axios.put(url, data);
};

export const del = async (url) => {
    return await axios.delete(url);
};
