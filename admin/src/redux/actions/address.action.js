import addressActionConstant from "../../constants/address-action.constant";
import addressApi from "../../api/address.api";

const addressAction = {};
addressAction.getProvince = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: addressActionConstant.GET_PROVINCE_START});
      const {data} = await addressApi.getProvince();
      dispatch({
        type: addressActionConstant.GET_PROVINCE_SUCCESS,
        provinceList: data?.length > 0 ? data : []
      });
    } catch (e) {
      console.log(e);
      dispatch({type: addressActionConstant.GET_PROVINCE_FAIL});
    }
  }
};

addressAction.getDistrict = (provinceId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: addressActionConstant.GET_DISTRICT_START});
      const {data} = await addressApi.getDistrict(provinceId);
      dispatch({
        type: addressActionConstant.GET_DISTRICT_SUCCESS,
        districtList: data?.length > 0 ? data : [],
        // provinceSelectedId: provinceId,
        // districtSelectedId: data[0].DistrictID,
      });
    } catch (e) {
      console.log(e);
      dispatch({type: addressActionConstant.GET_DISTRICT_FAIL});
    }
  }
};

addressAction.getWard = (districtId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: addressActionConstant.GET_WARD_START});
      const {data} = await addressApi.getWard(districtId);
      const wardList = data?.length > 0 ?  data.map(ward => ({...ward, WardCode: +ward.WardCode})) : [];
      dispatch({
        type: addressActionConstant.GET_WARD_SUCCESS,
        wardList: wardList,
        // districtSelectedId: districtId,
        // wardSelectedId: wardList[0].WardCode
      });
    } catch (e) {
      console.log(e);
      dispatch({type: addressActionConstant.GET_WARD_FAIL});
    }
  }
};

addressAction.setProvince = (provinceId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: addressActionConstant.SET_PROVINCE_SELECTED_START});
      dispatch({
        type: addressActionConstant.SET_PROVINCE_SELECTED_SUCCESS,
        provinceSelectedId: provinceId
      });
    } catch (e) {
      console.log(e);
      dispatch({type: addressActionConstant.SET_PROVINCE_SELECTED_FAIL});
    }
  }
};

addressAction.setDistrict = (districtId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: addressActionConstant.SET_DISTRICT_SELECTED_START});
      dispatch({
        type: addressActionConstant.SET_DISTRICT_SELECTED_SUCCESS,
        districtSelectedId: districtId
      });
    } catch (e) {
      console.log(e);
      dispatch({type: addressActionConstant.SET_DISTRICT_SELECTED_FAIL});
    }
  }
};

addressAction.setWard = (wardId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: addressActionConstant.SET_WARD_SELECTED_START});
      dispatch({
        type: addressActionConstant.SET_WARD_SELECTED_SUCCESS,
        wardSelectedId: wardId
      });
    } catch (e) {
      console.log(e);
      dispatch({type: addressActionConstant.SET_WARD_SELECTED_FAIL});
    }
  }
};

export default addressAction;

