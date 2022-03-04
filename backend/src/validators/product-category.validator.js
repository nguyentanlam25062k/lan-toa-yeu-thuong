import Joi from "joi";
const productCategorySchema = {};

productCategorySchema.createCategory = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  slug: Joi.string()
    .min(3)
    .max(30)
    .required(),

  active: Joi.boolean()
    .required(),

  

});

export default productCategorySchema;