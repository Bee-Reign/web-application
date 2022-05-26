const Joi = require("joi");

const id = Joi.number().integer().positive().max(32767);
const name = Joi.string().min(2).max(30);
const description = Joi.string().max(255);
const modules = Joi.array();

const newSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  modules: modules.required(),
});

const updateSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  modules: modules.required(),
});

const checkId = Joi.object({
  id: id.required(),
});

module.exports = {
  newSchema,
  updateSchema,
  checkId,
};
