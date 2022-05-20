import axios from "axios";

export async function getData(endpoint) {
  const response = await axios.get(endpoint);
  return response;
}

export async function postData(endpoint, body) {
  const params = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(endpoint, body, params);
  return response;
}

export async function patchData(endpoint, body) {
  const params = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await axios.patch(endpoint, body, params);
  return response;
}

export async function deleteData(endpoint) {
  const response = await axios.delete(endpoint);
  return response;
}
