"use client";
import { useEffect, useOptimistic } from "react";
import { StockList } from "./stocks";
import { useRouter } from "next/navigation";
import StocksList from "./stockslist";
const OptimisticList = ({ stocklist }) => {
  const [optimisticList, setOptimisticList] = useOptimistic(
    stocklist,
    (state, rid) => state.filter((item) => item._id !== rid)
  );
  const removeFromList = async (id) => {
    await setOptimisticList(id);
  };
  const router = useRouter();
  useEffect(() => {
    //console.log("/my_list");
    //refResh("/my_list");
    router.refresh();
  }, []);

  return optimisticList && optimisticList.length ? (
    <StocksList Stocks={optimisticList} modlist={removeFromList} />
  ) : (
    <span className=" mt-12 ">Your list is empty!</span>
  );
};

export default OptimisticList;
