import Joi from "joi";

const id = Joi.number().unsafe().min(1).max(9223372036854775807);

const checkId = Joi.object({
  id: id.required(),
});

export { checkId };
