import userActionConstant from "../../constants/user-action.constant";

const initState = {
  userList: [],
  pagination:{
    page: 1,
    limit: 5,
    totalRows: 50
  },
  isLoading: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case userActionConstant.GET_USER_START:
      return {
        ...state,
        isLoading: true
      };
    case userActionConstant.GET_USER_SUCCESS:
      const {rows, pagination} = action.data;
      return {
        ...state,
        isLoading: false,
        userList: rows,
        pagination: pagination
      };
    case userActionConstant.GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        userList: [],
      };

    default:
      return state;
  }
};