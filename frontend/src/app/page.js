import HomeList from "@/components/lists/homelist";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import CardSkeleton from "@/components/cardskeleton";
import SearchServerActions from "@/components/miniComponents/search-server-action";
import { getSearchAPI, getSymbols } from "@/config";
import StocksList from "@/components/lists/stockslist";
let Stocks = null;
// export const revalidate = 3600;

export default async function Home() {
  const searchHandler = async (searchQuery) => {
    "use server";
    if (searchQuery && searchQuery.length > 0) {
      const data = await getSearchAPI(searchQuery);
      Stocks = data;
    } else Stocks = null;
    revalidatePath("/");
  };

  return (
    <>
      <SearchServerActions
        // deactivateSearch={deactivateSearch}
        searchHandler={searchHandler}
      />
      {Stocks === null ? (
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
          <HomeList />
        </Suspense>
      ) : !!Stocks?.body && Stocks.body.length ? (
        <div className=" relative mx-1 my-2 flex flex-wrap justify-center gap-3">
          <StocksList Stocks={Stocks} />
        </div>
      ) : (
        <div className="mt-40 flex h-auto items-center justify-center">
          Not Found
        </div>
      )}
    </>
  );
}
