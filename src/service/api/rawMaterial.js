import endPoints from "@service/api";
import { postData, getData, patchData, deleteData } from "@libs/fetchService";

export async function getRawMaterials(limit, offset, filter) {
  const response = await getData(
    endPoints.rawMaterials.getRawMaterials(limit, offset, filter)
  );
  return response.data;
}

export async function getAllRawMaterials(query) {
  const response = await getData(
    endPoints.rawMaterials.getAllRawMaterials(query)
  );
  return response.data;
}

export async function getRawMaterial(id) {
  const response = await getData(endPoints.rawMaterials.getRawMaterial(id));
  return response.data;
}

export async function getRawMaterialByCode(code) {
  const response = await getData(
    endPoints.rawMaterials.getRawMaterialByCode(code)
  );
  return response.data;
}

export async function addRawMaterial(body) {
  const response = await postData(endPoints.rawMaterials.addRawMaterial, body);
  return response.data;
}

export async function updateRawMaterial(id, body) {
  const response = await patchData(
    endPoints.rawMaterials.updateRawMaterial(id),
    body
  );
  return response.data;
}

export async function deleteRawMaterial(id) {
  await deleteData(endPoints.rawMaterials.deleteRawMaterial(id));
}
