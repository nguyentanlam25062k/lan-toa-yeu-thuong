import {
  GET_ROLE_SUCCESS,
  GET_ROLE_FAIL,
  GET_ROLE_START,
  GET_GENDER_SUCCESS,
  GET_GENDER_FAIL,
  GET_GENDER_START
} from "../../constants/index.constant";

const initState = {
  roleList: [],
  genderList: [],
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ROLE_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roleList: action.roleList
      };
    case GET_ROLE_FAIL:
      return {
        ...state,
        isLoading: false,
        roleList: []
      };
    case GET_GENDER_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_GENDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        genderList: action.genderList
      };
    case GET_GENDER_FAIL:
      return {
        ...state,
        isLoading: false,
        genderList: []
      };
    default:
      return state;
  }
};
