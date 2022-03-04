import {axios} from "../utils/axios";

const userApi = {};

userApi.getUser = (query) => {
  return axios.get(`/get-user?${query}`);
}

userApi.createUser = (infoUser) => {
  return axios.post(`/create-user`, infoUser);
}

userApi.updateUser = (infoUser) => {
  return axios.patch(`/update-user`, infoUser);
}

userApi.delete = (userId) => {
  return axios.get(`/get-user`, {data: {userId: userId}});
}

export default userApi;