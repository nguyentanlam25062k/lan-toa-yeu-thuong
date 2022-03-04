import addressActionConstant from "../../constants/address-action.constant";

const initState = {
  provinceList: [],
  districtList: [],
  wardList: [],
  // provinceSelectedId: 202,
  // districtSelectedId: 3695,
  // wardSelectedId: 90768,
  isLoading: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case addressActionConstant.GET_PROVINCE_START:
      return {
        ...state,
        isLoading: true
      };
    case addressActionConstant.GET_PROVINCE_SUCCESS:
      return {
        ...state,
        provinceList: [...action.provinceList],
        isLoading: false,
      };
    case addressActionConstant.GET_PROVINCE_FAIL:
      return {
        ...state,
        provinceList: [],
        isLoading: false,
      }
    case addressActionConstant.GET_DISTRICT_START:
      return {
        ...state,
        isLoading: true
      };
    case addressActionConstant.GET_DISTRICT_SUCCESS:
      return {
        ...state,
        districtList: [...action.districtList],
        // provinceSelectedId: action.provinceSelectedId,
        // districtSelectedId: action.districtSelectedId,
        isLoading: false,
      };
    case addressActionConstant.GET_DISTRICT_FAIL:
      return {
        ...state,
        districtList: [],
        isLoading: false,
      }
    case addressActionConstant.GET_WARD_START:
      return {
        ...state,
        isLoading: true
      };
    case addressActionConstant.GET_WARD_SUCCESS:
      return {
        ...state,
        wardList: [...action.wardList],
        // districtSelectedId: action.districtSelectedId,
        // wardSelectedId: action.wardSelectedId,
        isLoading: false,
      };
    case addressActionConstant.GET_WARD_FAIL:
      return {
        ...state,
        wardList: [],
        isLoading: false,
      }
    case addressActionConstant.SET_PROVINCE_SELECTED_START:
      return {
        ...state,
        isLoading: true
      };
    case addressActionConstant.SET_PROVINCE_SELECTED_SUCCESS:
      return {
        ...state,
        provinceSelectedId: action.provinceSelectedId,
        isLoading: false,
      };
    case addressActionConstant.SET_PROVINCE_SELECTED_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case addressActionConstant.SET_DISTRICT_SELECTED_START:
      return {
        ...state,
        isLoading: true
      };
    case addressActionConstant.SET_DISTRICT_SELECTED_SUCCESS:
      return {
        ...state,
        districtSelectedId: action.districtSelectedId,
        isLoading: false,
      };
    case addressActionConstant.SET_DISTRICT_SELECTED_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case addressActionConstant.SET_WARD_SELECTED_START:
      return {
        ...state,
        isLoading: true
      };
    case addressActionConstant.SET_WARD_SELECTED_SUCCESS:
      return {
        ...state,
        wardSelectedId: action.wardSelectedId,
        isLoading: false,
      };
    case addressActionConstant.SET_WARD_SELECTED_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state;
  }
};