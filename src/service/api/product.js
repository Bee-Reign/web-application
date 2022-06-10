import endPoints from "@service/api";
import { postData, getData, patchData, deleteData } from "@libs/fetchService";

export async function getProducts(limit, offset, filter) {
  const response = await getData(
    endPoints.products.getProducts(limit, offset, filter)
  );
  return response.data;
}

export async function getAllProducts(query) {
  const response = await getData(endPoints.products.getAllProducts(query));
  return response.data;
}

export async function getProduct(id) {
  const response = await getData(endPoints.products.getProduct(id));
  return response.data;
}

export async function getProductByBarcode(barcode) {
  const response = await getData(
    endPoints.products.getProductByBarcode(barcode)
  );
  return response.data;
}

export async function addProduct(body) {
  const response = await postData(endPoints.products.addProduct, body);
  return response.data;
}

export async function updateProduct(id, body) {
  const response = await patchData(endPoints.products.updateProduct(id), body);
  return response.data;
}

export async function deleteProduct(id) {
  await deleteData(endPoints.products.deleteProduct(id));
}
