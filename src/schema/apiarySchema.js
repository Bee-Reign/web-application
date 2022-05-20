const Joi = require("joi");

const id = Joi.number().unsafe().max(9223372036854775807);
const name = Joi.string().min(2).max(50);
const countryId = Joi.number().integer().positive().max(32767);
const provinceId = Joi.number().unsafe().max(9223372036854775807);
const city = Joi.string().max(50);

const newSchema = Joi.object({
  name: name.required(),
  countryId: countryId.required(),
  provinceId: provinceId.required(),
  city: city.required(),
});

const updateSchema = Joi.object({
  name: name.required(),
  countryId: countryId.required(),
  provinceId: provinceId.required(),
  city: city.required(),
});

module.exports = {
  newSchema,
  updateSchema,
};
