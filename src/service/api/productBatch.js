import endPoints from "@service/api";
import { postData, getData, patchData } from "@libs/fetchService";

export async function getProductBatches(limit, offset, order, type) {
  const response = await getData(
    endPoints.productBatch.getAll(limit, offset, order, type)
  );
  return response.data;
}

export async function getProductBatch(id) {
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

export async function updateProductBatch(id, body) {
  const response = await patchData(
    endPoints.productBatch.updateProductBatch(id),
    body
  );
  return response.data;
}
