import axios from "axios";

export const countries = axios.create({
  baseURL: `https://restcountries.eu/rest/v2/all`,
});