"use client";
import React, { useEffect, useState, useContext } from "react";

import { AuthState } from "@/context/authProvider";
import { GlobalContext } from "@/context";
import { getSymbols } from "@/config";
import StocksList from "@/components/lists/stockslist";
import Loading from "@/components/loading";

const Page = () => {
  const {} = AuthState();
  const { list } = useContext(GlobalContext);
  const [stocks, setStocks] = useState(null);
  useEffect(() => {
    const getStocks = async () => {
      const ss = [...list.keys()].join(",");
      console.log(ss);
      if (ss === "") {
        setStocks({ body: [] });
        return;
      }
      try {
        const res = await getSymbols(ss);
        setStocks(res);
      } catch (e) {
        console.log(e);
      }
    };
    if (typeof list === "object") getStocks();
  }, []);
  return (
    <>
      {stocks ? (
        stocks.body.length ? (
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
