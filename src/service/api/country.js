import endPoints from "@service/api";
import { getData } from "@libs/fetchService";

export async function getAllCountries(query) {
  const response = await getData(endPoints.countries.getAll(query));
  return response.data;
}

export async function getAllProvincesById(id, query) {
  const response = await getData(endPoints.countries.getAllProvincesById(id, query));
  return response.data;
}
