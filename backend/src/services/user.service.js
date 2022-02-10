import db from '../models/index';

const userService = {};

userService.createNewUser = ({email, password}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email || !password) {
        resolve({
          errorCode: 1,
          errorMessage: "Missing parameter !"
        })
      } else {
        await db.User.create({
          email,
          password
        })
        resolve({
          errorCode: 0,
          errorMessage: "Create a new user success !"
        })
      }
    } catch (error) {
      reject(error);
    }
  })
}

export default userService;