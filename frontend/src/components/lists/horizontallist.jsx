import { getCatalouge } from "@/config";
import { Suspense } from "react";
import HorizontalScroll from "../miniComponents/horizontalScroll";
import CardSkeleton from "../cardskeleton";
import StocksList from "./stockslist";
const Horizontallist = ({ heading, children }) => {
  return (
    <HorizontalScroll heading={heading}>
      <Suspense
        fallback={
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        }
      >
        {children}
      </Suspense>
    </HorizontalScroll>
  );
};

export const GetCatalouge = async ({ q }) => {
  const data = await getCatalouge(q);
  return <StocksList Stocks={data} />;
};

export default Horizontallist;
