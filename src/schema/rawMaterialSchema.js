const Joi = require("joi");

const id = Joi.number().integer().positive().max(2147483647);
const name = Joi.string().max(100);
const code = Joi.string().max(12).alphanum();
const measurement = Joi.string()
  .alphanum()
  .valid("GALONES")
  .valid("GRAMOS")
  .valid("KILOGRAMOS")
  .valid("LIBRAS")
  .valid("LITROS")
  .valid("ONZAS")
  .valid("UNIDADES");

const checkId = Joi.object({
  id: id.required(),
});

const newRawMaterialSchema = Joi.object({
  code: code,
  name: name.required(),
  measurement: measurement.required(),
}).options({ abortEarly: false });

const updateRawMaterialSchema = Joi.object({
  code: code,
  name: name.required(),
  measurement: measurement.required(),
}).options({ abortEarly: false });

module.exports = {
  checkId,
  newRawMaterialSchema,
  updateRawMaterialSchema,
};
