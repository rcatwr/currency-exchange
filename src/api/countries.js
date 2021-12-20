import axios from "axios";

export const countries = axios.create({
  baseURL: `https://restcountries.eu/rest/v2/all`,
});

export const countries2 = axios.create({
  baseURL: `https://restcountries.com/v3.1/all`,
});
