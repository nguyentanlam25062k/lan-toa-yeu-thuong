import userService from '../services/user.service';
import {createAccessToken, createRefreshToken} from "../helpers/index.helper";
import config from "../config/index.config";
import jwt from 'jsonwebtoken';
const userController = {};

userController.createNewUser = async (req, res) => {
  try {
    let dataUser;
    const data = await userService.createNewUser(req.body);

    if (data.code === 0) {
      const {data: infoUser} = data;
      const accessToken = await createAccessToken(infoUser);
      const refreshToken = await createRefreshToken(infoUser);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: config.COOKIE_LIFE
      });

      dataUser = {...data, data: {accessToken}};
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
      const {data: infoUser} = data;
      const accessToken = await createAccessToken(infoUser);
      const refreshToken = await createRefreshToken(infoUser);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: config.COOKIE_LIFE
      });
      console.log(req.cookies.refreshToken);
      dataUser = {...data, data: {accessToken}};
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
          data: {
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
    console.log({data});
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default userController