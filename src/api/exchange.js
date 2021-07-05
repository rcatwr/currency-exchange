import axios from "axios";
// https://v6.exchangerate-api.com/v6/4da7b4a5c5bea6987590a4f4/latest/USD
const KEY = "86fcab61225348dac2a1cd46";
//const KEY = process.env.REACT_APP_CURRENCY_API_KEY;
export const exchange = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${KEY}/`,
});
