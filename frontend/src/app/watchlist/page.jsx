"use client";
import React, { useEffect, useState, useContext } from "react";

import { AuthState } from "@/context/authProvider";
import { GlobalContext } from "@/context";
import { getSymbols } from "@/config";
import useSWR from "swr";
import StocksList from "@/components/lists/stockslist";
import Loading from "@/components/loading";

const Page = () => {
  const {} = AuthState();
  const { list } = useContext(GlobalContext);
  const [stocks, setStocks] = useState(null);
  const { data, error, isLoading } = useSWR(
    [...list.keys()].join(","),
    getSymbols,
    { refreshInterval: 10000 }
  );
  useEffect(() => {
    console.log([...list.keys()].join(","), data, error, isLoading);
  }, [data, error, isLoading]);
  useEffect(() => {
    if (data?.body) setStocks(data);
  }, [data]);
  // useEffect(() => {

  //   const getStocks = async () => {
  //     const ss = [...list.keys()].join(",");
  //     console.log(ss);
  //     if (ss === "") {
  //       setStocks({ body: [] });
  //       return;
  //     }
  //     try {

  //       console.log(data, error, isLoading);
  //       if (data?.body) setStocks(data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   if (typeof list === "object") getStocks();
  // }, []);
  return (
    <>
      {stocks || list?.size === 0 ? (
        stocks?.body.length ? (
          <div className="container my-6 mx-auto flex flex-wrap gap-5">
            <StocksList Stocks={stocks} onRemove={setStocks} />
          </div>
        ) : (
          <div className="flex h-[calc(100vh-304px)] items-center justify-center">
            Empty!
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Page;
