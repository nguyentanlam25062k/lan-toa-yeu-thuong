import axios from 'axios';

const mainAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // headers: {
  //   'Content-Type': 'application/json'
  // },
})

mainAxios.interceptors.response.use((response) => {
  if (response.data.code !== 0)  throw new Error(response.data.msg);
  return response.data;
}, error => {
  return Promise.reject(error);
})

const axiosGHN = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Token': '88e263cd-8fc3-11ec-913f-a2241d5a8154'
  },
})

axiosGHN.interceptors.response.use((response) => {
  if (response.data.code !== 200)  throw new Error(response.data.msg);
  return response.data;
}, error => {
  return Promise.reject(error);
})

export {
  mainAxios as axios,
  axiosGHN
}
