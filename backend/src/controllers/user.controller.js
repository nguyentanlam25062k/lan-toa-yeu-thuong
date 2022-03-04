import jwt from 'jsonwebtoken';
import userService from '../services/user.service';
import config from "../config/index.config";
import {createAccessToken, createRefreshToken} from "../helpers/index.helper";

const userController = {};

userController.user = async (req, res) => {
  try {
    const data = await userService.user(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

userController.createNewUser = async (req, res) => {
  try {
    let dataUser;
    const data = await userService.createNewUser(req.body);
    console.log('data controller', data);
    if (data.code === 0) {
      const {body} = data;
      const accessToken = await createAccessToken(body);
      const refreshToken = await createRefreshToken(body);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: config.COOKIE_LIFE
      });

      dataUser = {...data, body: {accessToken}};
    } else {
      dataUser = {...data};
    }
    return res.status(200).json(dataUser);
  } catch (error) {
    return res.status(500).json(error);
  }
}

userController.login = async (req, res) => {
  try {
    let dataUser;
    const data = await userService.login(req.body);

    if (data.code === 0) {
      const {body} = data;
      const accessToken = await createAccessToken(body);
      const refreshToken = await createRefreshToken(body);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: config.COOKIE_LIFE
      });

      dataUser = {...data, body: {accessToken}};
    } else {
      dataUser = {...data};
    }
    return res.status(200).json(dataUser);
  } catch (error) {
    return res.status(500).json(error);
  }
}

userController.logout = async (req, res) => {
  try {
    console.log(req.cookies.refreshToken);
    res.clearCookie('refreshToken');
    return res.status(200).json({
      code: 0,
      msg: "Logout success !",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

userController.refreshToken = async (req, res) => {
  try {
    let accessToken, data;
    const {refreshToken} = req.cookies;

    if(refreshToken) {
      await jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, async (error, user) => {
        if(error) return res.status(400).json(data);
        delete user.iat;
        delete user.exp;
        accessToken = await createAccessToken(user);
        data = {
          code: 0,
          msg: "Refresh token success !",
          body: {
            accessToken: accessToken
          }
        }
      })
    } else {
      data = {
        code: 1,
        msg: "Refresh token doesn't exist, Pleas register or login !",
      }
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

userController.getUser = async (req, res) => {
  try {
    const data = await userService.getUser(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

userController.updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

userController.deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}



export default userController