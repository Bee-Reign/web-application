import Joi from "joi";

const id = Joi.number().unsafe().min(1).max(9223372036854775807);
const rawMaterialId = Joi.number().integer().positive().max(2147483647);
const warehouseId = Joi.number().integer().positive().max(32767);
const entryDate = Joi.date();
const expirationDate = Joi.date().allow(null);
const measurement = Joi.string()
  .alphanum()
  .valid("GALONES")
  .valid("GRAMOS")
  .valid("KILOGRAMOS")
  .valid("LIBRAS")
  .valid("LITROS")
  .valid("ONZAS")
  .valid("UNIDADES");
const quantity = Joi.number().positive();
const unitCost = Joi.number().positive();

const checkId = Joi.object({
  id: id.required(),
});

const newSchema = Joi.object({
  rawMaterialId: rawMaterialId.required(),
  warehouseId: warehouseId.required(),
  entryDate: entryDate.required(),
  expirationDate,
  quantity: quantity.required(),
  measurement: measurement.required(),
  unitCost: unitCost.required(),
});

module.exports = {
  checkId,
  newSchema,
};
