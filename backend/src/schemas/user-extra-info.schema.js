import Joi from "joi";
const userExtraInfoSchema = {};

userExtraInfoSchema.createUserExtraInfo = Joi.object({
  phone: Joi.string()
    .min(3)
    .max(30)
    .required(),

  gender: Joi.string()
    .min(3)
    .max(30)
    .required(),

  province: Joi.string()
    .min(3)
    .max(30)
    .required(),

  district: Joi.string()
    .min(3)
    .max(30)
    .required(),

  ward: Joi.string()
    .min(3)
    .max(30)
    .required(),

  userId: Joi.number()
    .required(),
});

export default userExtraInfoSchema;