import { axios } from "../utils";

const userApi = {};

userApi.getUser = (query) => {
  // const {search, page, limit, sort} = query;
  // return axios.get(`/get-user?search=${search}&page=${page}&limit=${limit}&sort=${sort}&price[gt]=30&price[lt]=60`);
  return axios.get(`/get-user?${query}`);
};

userApi.createUser = (infoUser) => {
  return axios.post(`/create-user`, infoUser);
};

userApi.updateUser = (infoUser) => {
  return axios.patch(`/update-user`, infoUser);
};

userApi.delete = (id) => {
  return axios.delete(`/delete-user`, { data: { id: id } });
};

export { userApi };
