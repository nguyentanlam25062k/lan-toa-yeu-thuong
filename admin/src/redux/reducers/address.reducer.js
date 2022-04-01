import {
  GET_PROVINCE_START,
  GET_PROVINCE_SUCCESS,
  GET_PROVINCE_FAIL,
  GET_DISTRICT_START,
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAIL,
  GET_WARD_START,
  GET_WARD_SUCCESS,
  GET_WARD_FAIL,
  SET_PROVINCE_SELECTED_START,
  SET_PROVINCE_SELECTED_SUCCESS,
  SET_PROVINCE_SELECTED_FAIL,
  SET_DISTRICT_SELECTED_START,
  SET_DISTRICT_SELECTED_SUCCESS,
  SET_DISTRICT_SELECTED_FAIL,
  SET_WARD_SELECTED_START,
  SET_WARD_SELECTED_SUCCESS,
  SET_WARD_SELECTED_FAIL
} from "../../constants/address-action.constant";

const initState = {
  provinceList: [],
  districtList: [],
  wardList: [],
  // provinceSelectedId: 202,
  // districtSelectedId: 3695,
  // wardSelectedId: 90768,
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_PROVINCE_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROVINCE_SUCCESS:
      return {
        ...state,
        provinceList: [...action.provinceList],
        isLoading: false
      };
    case GET_PROVINCE_FAIL:
      return {
        ...state,
        provinceList: [],
        isLoading: false
      };
    case GET_DISTRICT_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_DISTRICT_SUCCESS:
      return {
        ...state,
        districtList: [...action.districtList],
        // provinceSelectedId: action.provinceSelectedId,
        // districtSelectedId: action.districtSelectedId,
        isLoading: false
      };
    case GET_DISTRICT_FAIL:
      return {
        ...state,
        districtList: [],
        isLoading: false
      };
    case GET_WARD_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_WARD_SUCCESS:
      return {
        ...state,
        wardList: [...action.wardList],
        // districtSelectedId: action.districtSelectedId,
        // wardSelectedId: action.wardSelectedId,
        isLoading: false
      };
    case GET_WARD_FAIL:
      return {
        ...state,
        wardList: [],
        isLoading: false
      };
    case SET_PROVINCE_SELECTED_START:
      return {
        ...state,
        isLoading: true
      };
    case SET_PROVINCE_SELECTED_SUCCESS:
      return {
        ...state,
        provinceSelectedId: action.provinceSelectedId,
        isLoading: false
      };
    case SET_PROVINCE_SELECTED_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case SET_DISTRICT_SELECTED_START:
      return {
        ...state,
        isLoading: true
      };
    case SET_DISTRICT_SELECTED_SUCCESS:
      return {
        ...state,
        districtSelectedId: action.districtSelectedId,
        isLoading: false
      };
    case SET_DISTRICT_SELECTED_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case SET_WARD_SELECTED_START:
      return {
        ...state,
        isLoading: true
      };
    case SET_WARD_SELECTED_SUCCESS:
      return {
        ...state,
        wardSelectedId: action.wardSelectedId,
        isLoading: false
      };
    case SET_WARD_SELECTED_FAIL:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};
