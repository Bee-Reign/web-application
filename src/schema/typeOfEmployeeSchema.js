import Joi from "joi";

const id = Joi.number().integer().positive().max(32767);
const name = Joi.string().min(2).max(30);
const description = Joi.string().max(255);
const modules = Joi.array();

const newSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  modules: modules.required(),
}).options({ abortEarly: false });

const updateSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  modules: modules.required(),
}).options({ abortEarly: false });

const checkId = Joi.object({
  id: id.required(),
});

export { newSchema, updateSchema, checkId };
