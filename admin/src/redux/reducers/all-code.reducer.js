import allCodeActionConstant from '../../constants/all-code.constant';

const initState = {
  roleList: [],
  genderList: [],
  isLoading: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case allCodeActionConstant.GET_ROLE_START:
      return {
        ...state,
        isLoading: true
      };
    case allCodeActionConstant.GET_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roleList: action.roleList,
      };
    case allCodeActionConstant.GET_ROLE_FAIL:
      return {
        ...state,
        isLoading: false,
        roleList: [],
      };
    case allCodeActionConstant.GET_GENDER_START:
      return {
        ...state,
        isLoading: true
      };
    case allCodeActionConstant.GET_GENDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        genderList: action.genderList,
      };
    case allCodeActionConstant.GET_GENDER_FAIL:
      return {
        ...state,
        isLoading: false,
        genderList: [],
      };
    default:
      return state;
  }
};