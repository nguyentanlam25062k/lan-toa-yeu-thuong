import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
    // headers: {
    //   'Content-Type': 'application/json'
    // },
});

Axios.interceptors.response.use(
    (response) => {
        if (response.data.code !== 0) throw new Error(response.data.msg);
        return response.data;
    },
    (error) => {
        console.log(error);
        return Promise.reject(new Error("Lỗi 500 từ server"));
    }
);

const axiosGHN = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Token": "88e263cd-8fc3-11ec-913f-a2241d5a8154"
    }
});

axiosGHN.interceptors.response.use(
    (response) => {
        if (response.data.code !== 200) throw new Error(response.data.msg);
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { Axios as axios, axiosGHN };
