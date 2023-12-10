import axios from 'axios';

const BASE_URL = 'http://193.136.62.24/v1/';

export const get = (url) => {
    return axios.get(`${BASE_URL}${url}`);
};

export const post = (url, data) => {
    return axios.post(`${BASE_URL}${url}`, data);
};

export const put = (url, data) => {
    return axios.put(`${BASE_URL}${url}`, data);
};

export const del = (url) => {
    return axios.delete(`${BASE_URL}${url}`);
};
