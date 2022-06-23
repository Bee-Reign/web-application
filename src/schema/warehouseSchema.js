const Joi = require("joi");

const id = Joi.number().integer().positive().max(32767);
const name = Joi.string().max(50);
const countryId = Joi.number().positive().min(1).max(32767).messages({
  "number.base": `"country" required`,
});
const provinceId = Joi.number()
  .unsafe()
  .min(1)
  .max(9223372036854775807)
  .messages({
    "number.base": `"province" required`,
  });
const city = Joi.string().max(50);

const getSchema = Joi.object({
  id: id.required(),
});

const newWarehouseSchema = Joi.object({
  name: name.required(),
  countryId: countryId.required(),
  provinceId: provinceId.required(),
  city: city.required(),
}).options({ abortEarly: false });

const updateWarehouseSchema = Joi.object({
  name: name.required(),
  countryId: countryId.required(),
  provinceId: provinceId.required(),
  city: city.required(),
}).options({ abortEarly: false });

module.exports = {
  getSchema,
  newWarehouseSchema,
  updateWarehouseSchema,
};
