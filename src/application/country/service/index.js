import endPoints from "@utils/endpoints";
import { getData } from "@libs/axios";

export async function getAllCountries(query) {
  const response = await getData(endPoints.countries.getAll(query));
  return response.data;
}

export async function getAllProvincesById(id, query) {
  const response = await getData(endPoints.countries.getAllProvincesById(id, query));
  return response.data;
}
