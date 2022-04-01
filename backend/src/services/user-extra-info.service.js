import userExtraInfoSchema from "../schemas/user-extra-info.schema";
import db from '../models/index';

const userService = {};

userService.createUserExtraInfo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {value, error} = userExtraInfoSchema.createUserExtraInfo.validate(data);
      const {phone, gender, district, province, ward, image, userId} = data;
      if(!error) {
        const isValidIdUser = await db.User_Extra_Info.findOne({
          where: {userId},
          raw: false
        })
        if(!isValidIdUser) {
          const extraInfoUser = await db.User_Extra_Info.create({
            phone,
            gender,
            province,
            city: district,
            ward,
            image,
            userId
          })
          console.log('======== extraInfoUser', extraInfoUser);
          resolve({
            code: 0,
            msg: "Create extra info user success !"
          })
        } else {
          resolve({
            code: 2,
            msg: "Id user is exist!"
          })
        }
      } else {
        resolve({
          code: 1,
          msg: error.details[0].message
        })
      }
    } catch (e) {
      console.log(e)
      reject({
        code: -1,
        msg: 'Error from server'
      });
    }
  })
}

userService.updateUserExtraInfo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {value, error} = userExtraInfoSchema.createUserExtraInfo.validate(data);
      const {phone, gender, district, province, ward, image, userId} = data;
      if(!error) {
        const userExtraInfo = await db.User_Extra_Info.findOne({
          where: {userId},
          raw: false
        })
        if(userExtraInfo) {
          userExtraInfo.phone = phone;
          userExtraInfo.gender = gender;
          userExtraInfo.province = province;
          userExtraInfo.ward = ward;
          userExtraInfo.image = image;
          userExtraInfo.city = district;
          await userExtraInfo.save();
          resolve({
            code: 0,
            msg: "Updated extra info user success !"
          })
        } else {
          resolve({
            code: 2,
            msg: "Can't  not found id extra info user !"
          })
        }
      } else {
        resolve({
          code: 1,
          msg: error.details[0].message
        })
      }
    } catch (e) {
      console.log(e)
      reject({
        code: -1,
        msg: 'Error from server'
      });
    }
  })
}






export default userService;