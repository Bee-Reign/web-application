import endPoints from "@service/api";
import { postData, getData, patchData, deleteData } from "@libs/fetchService";

export async function employeeLogin(body) {
  const response = await postData(endPoints.auth.login, body);
  return response.data;
}

export async function employeeProfile() {
  const response = await getData(endPoints.auth.profile);
  return response;
}

export async function getEmployees(limit, offset) {
  const response = await getData(
    endPoints.employees.getEmployees(limit, offset)
  );
  return response.data;
}

export async function getEmployee(id) {
  const response = await getData(endPoints.employees.getEmployee(id));
  return response.data;
}

export async function addEmployee(body) {
  const response = await postData(endPoints.employees.addEmployee, body);
  return response.data;
}

export async function updateEmployee(id, update, body) {
  const response = await patchData(
    endPoints.employees.updateEmployee(id, update),
    body
  );
  return response.data;
}

export async function deleteEmployee(id) {
  await deleteData(endPoints.employees.deleteEmployee(id));
}
