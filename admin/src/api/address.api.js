import {axiosGHN} from "../utils/axios";

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Token': '88e263cd-8fc3-11ec-913f-a2241d5a8154'
  }
}

const addressApi = {};

addressApi.getProvince = () => {
  return axiosGHN.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`);
}

addressApi.getDistrict = (provinceId) => {
  return axiosGHN.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`);
}

addressApi.getWard = (districtId) => {
  return axiosGHN.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`);
}

export default addressApi;