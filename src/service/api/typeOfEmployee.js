import endPoints from "@service/api";
import { postData, getData, patchData, deleteData } from "@libs/fetchService";

export async function getTypesOfEmployee(limit, offset, filter) {
  const response = await getData(
    endPoints.typeOfEmployees.getTypesOfEmployee(limit, offset, filter)
  );
  return response.data;
}

export async function getAllTypesOfEmployee(query) {
  const response = await getData(
    endPoints.typeOfEmployees.getAllTypesOfEmployee(query)
  );
  return response.data;
}

export async function getTypeOfEmployee(id) {
  const response = await getData(
    endPoints.typeOfEmployees.getTypeOfEmployee(id)
  );
  return response.data;
}

export async function addTypeOfEmployee(body) {
  const response = await postData(
    endPoints.typeOfEmployees.addTypeOfEmployee,
    body
  );
  return response.data;
}

export async function updateTypeOfEmployee(id, body) {
  const response = await patchData(
    endPoints.typeOfEmployees.updateTypeOfEmployee(id),
    body
  );
  return response.data;
}

export async function disableTypeOfEmployee(id) {
  await deleteData(endPoints.typeOfEmployees.disableTypeOfEmployee(id));
}
