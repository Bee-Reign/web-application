import endPoints from "@utils/endpoints";
import { getData, postData, patchData, deleteData } from "@libs/axios";

export async function getProductOutputs(limit, offset, isPaid, type) {
  const response = await getData(
    endPoints.productOutput.getAll(limit, offset, isPaid, type)
  );
  return response.data;
}

export async function addProductOutput(body) {
  const response = await postData(
    endPoints.productOutput.addProductOutput,
    body
  );
  return response.data;
}

export async function updateOutputIsPaid(id, body) {
  const response = await patchData(
    endPoints.productOutput.updateProductOutput(id),
    body
  );
  return response.data;
}

export async function cancelOutput(id) {
  const response = await deleteData(endPoints.productOutput.cancelOutput(id));
  return response.data;
}
