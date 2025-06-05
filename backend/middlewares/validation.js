const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

//valor de validación de la propiedad link
const linkValidation = Joi.string().required().custom(validateURL);

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: linkValidation,
  }),
});

module.exports = {
  createCardValidation,
};
