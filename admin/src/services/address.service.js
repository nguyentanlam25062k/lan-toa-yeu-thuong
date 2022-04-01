import { addressApi } from "../api/index.api";
import { toast } from "react-toastify";

const addressService = {};

addressService.getDistrict = async (provinceId) => {
  try {
    const { data } = await addressApi.getDistrict(provinceId);
    return data;
  } catch (e) {
    toast.error(e.message);
  }
};

addressService.getWard = async (districtId) => {
  try {
    const { data } = await addressApi.getWard(districtId);
    return data.map((e) => ({ ...e, WardCode: +e.WardCode }));
  } catch (e) {
    toast.error(e.message);
  }
};

export default addressService;
