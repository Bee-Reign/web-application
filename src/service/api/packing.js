import endPoints from "@service/api";
import { getData, patchData } from "@libs/fetchService";

export async function getBatchesInProcess(limit, offset) {
  const response = await getData(endPoints.packing.getAll(limit, offset));
  return response.data;
}

export async function getBatchInProcessById(id) {
  const response = await getData(endPoints.packing.getById(id));
  return response.data;
}

export async function updateBatchSaved(id, data) {
  const response = await patchData(
    endPoints.packing.updateBatchSaved(id),
    data
  );
  return response.data;
}
