import { body, validationResult } from 'express-validator';
import Joi from "joi";
const userSchema = {};

userSchema.signUp = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .required(),

  lastName: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  email: Joi.string()
    .pattern(new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'))
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required()
});

userSchema.signIn = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  email: Joi.string()
    .pattern(new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'))
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required()
});


export default userSchema;
