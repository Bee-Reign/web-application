const Joi = require("joi");

const id = Joi.number().integer().positive().max(32767);
const name = Joi.string().max(50);
const countryId = Joi.number().positive().min(1).max(32767);
const provinceId = Joi.number().unsafe().min(1).max(9223372036854775807);
const city = Joi.string().max(50);

const getSchema = Joi.object({
  id: id.required(),
});

const newWarehouseSchema = Joi.object({
  name: name.required(),
  countryId: countryId.required(),
  provinceId: provinceId.required(),
  city: city.required(),
});

const updateWarehouseSchema = Joi.object({
  name: name.required(),
  countryId: countryId.required(),
  provinceId: provinceId.required(),
  city: city.required(),
});

module.exports = {
  getSchema,
  newWarehouseSchema,
  updateWarehouseSchema,
};
