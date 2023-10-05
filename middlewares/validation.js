const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateClothingItem = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    imageUrl: Joi.string().uri().required(),
  }),
});

const validateUser = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateId = celebrate({
  params: Joi.object.keys({
    _id: Joi.string().hex().length(24).required,
  }),
});

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports = {
  validateClothingItem,
  validateUser,
  validateLogin,
  validateId,
  validateURL,
};
