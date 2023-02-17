import endPoints from "@utils/endpoints";
import { postData, getData, patchData, deleteData } from "@libs/axios";

export async function getRawMaterialBatches(
  limit,
  offset,
  order,
  type,
  rawMaterialId
) {
  const response = await getData(
    endPoints.rawMaterialBatch.getAll(limit, offset, order, type, rawMaterialId)
  );
  return response.data;
}

export async function getBatch(id) {
  const response = await getData(endPoints.rawMaterialBatch.getById(id));
  return response.data;
}

export async function getBatchForPacking(id) {
  const response = await getData(
    endPoints.rawMaterialBatch.getByIdForPacking(id)
  );
  return response.data;
}

export async function addRawMaterialBatch(body) {
  const response = await postData(
    endPoints.rawMaterialBatch.addRawMaterialBatch,
    body
  );
  return response.data;
}

export async function updateRawMaterialBatch(id, body) {
  const response = await patchData(
    endPoints.rawMaterialBatch.updateRawMaterialBatch(id),
    body
  );
  return response.data;
}

export async function deleteRawMaterialBatch(id) {
  await deleteData(endPoints.rawMaterialBatch.deleteRawMaterialBatch(id));
}
