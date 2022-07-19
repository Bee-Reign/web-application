import endPoints from "@service/api";
import { postData, getData, patchData } from "@libs/fetchService";

export async function getPackings(limit, offset, order, type) {
  const response = await getData(
    endPoints.packing.getPackings(limit, offset, order, type)
  );
  return response.data;
}

export async function getPacking(id) {
  const response = await getData(endPoints.packing.getById(id));
  return response.data;
}

export async function getPackingBatches(id) {
  const response = await getData(endPoints.packing.getAllBatchesById(id));
  return response.data;
}

export async function addPacking(body) {
  const response = await postData(endPoints.packing.addPacking, body);
  return response.data;
}

export async function addBatch(body) {
  const response = await postData(endPoints.packing.addBatch, body);
  return response.data;
}

export async function suspendPacking(body) {
  const response = await postData(endPoints.packing.suspendPacking, body);
  return response.data;
}

export async function updatePacking(id, body) {
  const response = await patchData(endPoints.packing.updatePacking(id), body);
  return response.data;
}

export async function updateBatch(id, body) {
  const response = await patchData(endPoints.packing.updateBatch(id), body);
  return response.data;
}
