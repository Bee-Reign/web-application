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

export async function getEmployees(limit, offset, filter) {
  const response = await getData(
    endPoints.employees.getEmployees(limit, offset, filter)
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

export async function updatePassword(id, body) {
  const response = await patchData(
    endPoints.employees.updatePassword(id),
    body
  );
  return response.data;
}

export async function sendRecoveryEmail(body) {
  const response = await postData(endPoints.auth.recovery, body);
  return response.data;
}

export async function resetPassword(body) {
  const response = await postData(endPoints.auth.resetPassword, body);
  return response.data;
}

export async function disableEmployee(id) {
  await patchData(endPoints.employees.disableEmployee(id));
}

export async function enableEmployee(id) {
  await patchData(endPoints.employees.enableEmployee(id));
}
