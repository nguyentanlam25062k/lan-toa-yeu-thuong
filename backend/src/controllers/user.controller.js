import userService from '../services/user.service';
const userController = {};

userController.createNewUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const data = await userService.createNewUser({email, password});
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from server'
    });
  }
}

export default userController