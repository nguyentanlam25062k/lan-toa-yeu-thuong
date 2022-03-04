import allCodeActionConstant from '../../constants/all-code.constant';
import allCodeApi from "../../api/all-code.api";
import {toast} from "react-toastify";

const allCodeAction = {};

allCodeAction.getAllRole = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: allCodeActionConstant.GET_ROLE_START});
      const {body} = await allCodeApi.getAllCode('ROLE');
      dispatch({
        type: allCodeActionConstant.GET_ROLE_SUCCESS,
        roleList: body
      });
    } catch (e) {
      dispatch({type: allCodeActionConstant.GET_ROLE_FAIL});
      toast.error(e.message);
    }
  }
};

allCodeAction.getAllGender = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: allCodeActionConstant.GET_GENDER_START});
      const {body} = await allCodeApi.getAllCode('GENDER');
      dispatch({
        type: allCodeActionConstant.GET_GENDER_SUCCESS,
        genderList: body
      });
    } catch (e) {
      dispatch({type: allCodeActionConstant.GET_GENDER_FAIL});
      toast.error(e.message);
    }
  }
};

export default allCodeAction;

