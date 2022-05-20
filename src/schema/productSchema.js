const Joi = require("joi");

const id = Joi.number().integer().positive().max(2147483647);
const barcode = Joi.string().max(128).alphanum();
const name = Joi.string().max(100);
const description = Joi.string().max(255).allow("");

const createSchema = Joi.object({
  barcode: barcode.required(),
  name: name.required(),
  description,
});

const updateSchema = Joi.object({
  barcode: barcode.required(),
  name: name.required(),
  description,
});

module.exports = {
  createSchema,
  updateSchema,
};
