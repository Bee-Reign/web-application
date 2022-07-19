import Joi from "joi";

const id = Joi.number().unsafe().min(1).max(9223372036854775807);
const productId = Joi.number().integer().positive().max(2147483647).messages({
  "number.base": `"product" required`,
});
const warehouseId = Joi.number().integer().positive().max(32767).messages({
  "number.base": `"warehouse" required`,
});
const entryDate = Joi.date();
const expirationDate = Joi.date().allow(null);
const quantity = Joi.number().integer().positive();
const stock = Joi.number().integer().min(0);
const unitCost = Joi.number().positive();
const batches = Joi.array().min(1);
const isDone = Joi.boolean();

const getSchema = Joi.object({
  id: id.required(),
});

const manualRegistration = Joi.object({
  productId: productId.required(),
  warehouseId: warehouseId.required(),
  entryDate: entryDate.required(),
  expirationDate,
  quantity: quantity.required(),
  unitCost: unitCost.required(),
});

const updateBatchSchema = Joi.object({
  warehouseId: warehouseId.required(),
  entryDate: entryDate.required(),
  expirationDate,
  stock: stock.required(),
  unitCost: unitCost.required(),
});

const createSchema = Joi.object({
  productId: productId.required(),
  warehouseId: warehouseId.required(),
  entryDate: entryDate.required(),
  expirationDate,
  quantity: quantity.required(),
  unitCost: unitCost.required(),
  batches: batches.required(),
}).options({ abortEarly: false });

const suspendSchema = Joi.object({
  productId: productId.required(),
  warehouseId: warehouseId.required(),
  entryDate: entryDate.required(),
  expirationDate,
  quantity: quantity.required(),
  batches: batches.required(),
}).options({ abortEarly: false });

const updateSchema = Joi.object({
  productId: productId.required(),
  warehouseId: warehouseId.required(),
  entryDate: entryDate.required(),
  expirationDate,
  quantity: quantity.required(),
  unitCost,
  batches: batches.required(),
  isDone: isDone.required(),
}).options({ abortEarly: false });

export {
  getSchema,
  manualRegistration,
  createSchema,
  suspendSchema,
  updateSchema,
  updateBatchSchema,
};
