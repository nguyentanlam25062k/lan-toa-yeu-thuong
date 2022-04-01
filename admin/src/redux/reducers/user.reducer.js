import { GET_USER_START, GET_USER_SUCCESS, GET_USER_FAIL } from "../../constants/user-action.constant";

const initState = {
  userList: [],
  pagination: {
    page: 1,
    limit: 5,
    totalRows: 50
  },
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_USER_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER_SUCCESS:
      const { rows, pagination } = action.data;
      return {
        ...state,
        isLoading: false,
        userList: rows,
        pagination: pagination
      };
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        userList: []
      };

    default:
      return state;
  }
};
