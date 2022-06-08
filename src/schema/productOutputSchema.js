const Joi = require("joi");

const id = Joi.number().unsafe().min(1).max(9223372036854775807);
const amount = Joi.number().unsafe().positive();
const typeOfSale = Joi.string();
const isPaid = Joi.boolean();
const batches = Joi.array();

const checkId = Joi.object({
  id: id.required(),
});

const createSchema = Joi.object({
  amount: amount.required(),
  typeOfSale: typeOfSale.required(),
  batches: batches.required(),
});

const updateIsPaid = Joi.object({
  isPaid: isPaid.required(),
});

module.exports = {
  checkId,
  createSchema,
  updateIsPaid,
};
