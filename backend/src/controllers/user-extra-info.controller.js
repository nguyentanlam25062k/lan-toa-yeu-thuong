import userExtraInfoService from "../services/user-extra-info.service";

const userController = {};

userController.createUserExtraInfo = async (req, res) => {
  try {
    const data = await userExtraInfoService.createUserExtraInfo(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

userController.updateUserExtraInfo = async (req, res) => {
  try {
    const data = await userExtraInfoService.updateUserExtraInfo(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}





export default userController