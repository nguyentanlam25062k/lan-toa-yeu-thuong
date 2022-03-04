import {axios} from "../utils/axios";

const allCodeApi = {};

allCodeApi.getAllCode = (field) => {
  return axios.get(`/get-all-code?type=${field}`);
}

export default allCodeApi;