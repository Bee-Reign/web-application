import endPoints from "@service/api";
import { postData, getData, patchData, deleteData } from "@libs/fetchService";

export async function getWarehouses(limit, offset, filter) {
  const response = await getData(
    endPoints.warehouses.getWarehouses(limit, offset, filter)
  );
  return response.data;
}

export async function getAllWarehouses(query) {
  const response = await getData(endPoints.warehouses.getAllWarehouses(query));
  return response.data;
}

export async function getWarehouse(id) {
  const response = await getData(endPoints.warehouses.getWarehouse(id));
  return response.data;
}

export async function addWarehouse(body) {
  const response = await postData(endPoints.warehouses.addWarehouse, body);
  return response.data;
}

export async function updateWarehouse(id, body) {
  const response = await patchData(
    endPoints.warehouses.updateWarehouse(id),
    body
  );
  return response.data;
}

export async function disableWarehouse(id) {
  await deleteData(endPoints.warehouses.disableWarehouse(id));
}
