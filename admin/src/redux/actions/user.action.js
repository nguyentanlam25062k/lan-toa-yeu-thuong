import userActionConstant from "../../constants/user-action.constant";
import userApi from "../../api/user.api";
import { toast } from 'react-toastify';

const userAction = {};

userAction.getUser = (query) => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: userActionConstant.GET_USER_START});
      const {body, msg} = await userApi.getUser(query);
      dispatch({
        type: userActionConstant.GET_USER_SUCCESS,
        data: body
      });
    } catch (e) {
      dispatch({type: userActionConstant.GET_USER_START});
      toast.error(e.message);
    }
  }
};

userAction.createUser = (infoUser) => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: userActionConstant.GET_USER_START});
      const {body, msg} = await userApi.getUser(infoUser);
      dispatch({
        type: userActionConstant.GET_USER_SUCCESS,
        data: body
      });
    } catch (e) {
      dispatch({type: userActionConstant.GET_USER_START});
      toast.error(e.message);
    }
  }
};

export default userAction;

