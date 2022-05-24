import endPoints from "@service/api";
import { postData, getData } from "@libs/fetchService";

export async function getProductBatches(limit, offset, order, type) {
  const response = await getData(
    endPoints.productBatch.getAll(limit, offset, order, type)
  );
  return response.data;
}

export async function getProduct(id) {
  const response = await getData(endPoints.productBatch.getById(id));
  return response.data;
}

export async function getProductForOutput(id) {
  const response = await getData(endPoints.productBatch.getByIdForOutput(id));
  return response.data;
}

export async function addProductBatch(body) {
  const response = await postData(endPoints.productBatch.addProductBatch, body);
  return response.data;
}
