import { queueRequest } from "./apiQueue";
import { unstable_cache as cache } from "next/cache";
// import "server-only";
const BASE_URL = "https://mboum-finance.p.rapidapi.com/v1/";
export const options = {
  ticker: "AAPL",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
  },
};
export const getCatalouge = cache(async (q) => {
  //console.log("modtpop");
  return await queueRequest(
    `${BASE_URL}markets/screener?list=${q}`,
    options
  ).then((res) => res?.json().then((results) => Promise.resolve(results)));
});
export const getSymbols = async (s) => {
  if (s === "") return Promise.resolve({ body: [] });
  return await queueRequest(
    `${BASE_URL}markets/stock/quotes?symbol=${s}`,
    options
  ).then((res) => res?.json().then((results) => Promise.resolve(results)));
};

export const getSearchAPI = cache(async (keyword) => {
  return queueRequest(
    `${BASE_URL}markets/stock/quotes?symbol=${keyword}`,
    options
  )
    .then((res) => {
      if (res.ok) {
        return res?.json();
      } else {
        //console.log(`Error: ${res.status} ${res.statusText}`);
        throw new Error("Something went wrong!");
      }
    })
    .then((res) => Promise.resolve(res));
});

export async function formatCompactNumber(number) {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1000000 && number < 1000000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000000000 && number < 1000000000000) {
    return (number / 1000000000).toFixed(1) + "B";
  } else if (number >= 1000000000000 && number < 1000000000000000) {
    return (number / 1000000000000).toFixed(1) + "T";
  }
}
