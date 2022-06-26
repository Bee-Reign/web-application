const Joi = require("joi");

const id = Joi.number().unsafe().min(1).max(9223372036854775807);
const amount = Joi.number().unsafe().positive().messages({
  "number.positive": `amount cannot be calculated`,
});
const typeOfSale = Joi.string();
const isPaid = Joi.boolean();
const batches = Joi.array().min(1).messages({
  "array.min": `"product batches" required`,
});

const checkId = Joi.object({
  id: id.required(),
});

const createSchema = Joi.object({
  amount: amount.required(),
  typeOfSale: typeOfSale.required(),
  batches: batches.required(),
}).options({ abortEarly: false });

const updateIsPaid = Joi.object({
  isPaid: isPaid.required(),
}).options({ abortEarly: false });

module.exports = {
  checkId,
  createSchema,
  updateIsPaid,
};
