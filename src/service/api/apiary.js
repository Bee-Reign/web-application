import endPoints from "@service/api";
import { postData, getData, patchData, deleteData } from "@libs/fetchService";

export async function getApiaries(limit, offset, filter) {
  const response = await getData(
    endPoints.apiaries.getApiaries(limit, offset, filter)
  );
  return response.data;
}

export async function getAllApiaries(query) {
  const response = await getData(endPoints.apiaries.getAllApiaries(query));
  return response.data;
}

export async function getApiary(id) {
  const response = await getData(endPoints.apiaries.getApiary(id));
  return response.data;
}

export async function addApiary(body) {
  const response = await postData(endPoints.apiaries.addApiary, body);
  return response.data;
}

export async function updateApiary(id, body) {
  const response = await patchData(endPoints.apiaries.updateApiary(id), body);
  return response.data;
}

export async function disableApiary(id) {
  await deleteData(endPoints.apiaries.disableApiary(id));
}
