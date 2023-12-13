import axios from 'axios';

export const get = async (url) => {
    return await axios.get(url);
};

export const post = async (url, body) => {
    return await axios.post(url, body);
};

export const put = async (url, body) => {
    return await axios.put(url, body);
};

export const del = async (url) => {
    return await axios.delete(url);
};
