import { axios } from "../utils";

const allCodeApi = {};

allCodeApi.getAllCode = (field) => {
  return axios.get(`/get-all-code?type=${field}`);
};

export { allCodeApi };
