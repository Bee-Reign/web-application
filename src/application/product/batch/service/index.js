import endPoints from "@utils/endpoints";
import { getData, deleteData } from "@libs/axios";

export async function getProductBatches(limit, offset, order, type, productId) {
  const response = await getData(
    endPoints.productBatch.getAll(limit, offset, order, type, productId)
  );
  return response.data;
}

export async function getProductForOutput(id) {
  const response = await getData(endPoints.productBatch.getByIdForOutput(id));
  return response.data;
}

export async function deleteProductBatch(id) {
  await deleteData(endPoints.productBatch.deleteProductBatch(id));
}
