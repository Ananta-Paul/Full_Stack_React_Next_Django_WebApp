// import { AiTwotoneStar } from "react-icons/ai";
// import Image from "next/image";
// import { BsFillPlayFill } from "react-icons/bs";
// import PlayButton from "../miniComponents/playButton";
// import AddButton from "../miniComponents/addButton";
// import EditItem from "../editItem";
// import {
//   StocklistImageWraper,
//   StocklistContainerWraper,
//   StocklistDetailsWraper,

import { BsTypeH1 } from "react-icons/bs";
import Print from "../miniComponents/print";
import AddButton from "../miniComponents/addButton";

// } from "./stocklistwrapers";
const options = {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
};
const StocksList = ({ Stocks, onRemove }) => {
  // const data = {
  //   ask: 21.35,
  //   askSize: 8,
  //   averageAnalystRating: "4.5 - Underperform",
  //   averageDailyVolume10Day: 85644670,
  //   averageDailyVolume3Month: 17863455,
  //   bid: 21.3,
  //   bidSize: 11,
  //   bookValue: 4.379,
  //   cryptoTradeable: false,
  //   currency: "USD",
  //   customPriceAlertConfidence: "LOW",
  //   displayName: "GameStop",
  //   dividendDate: 1529971200,
  //   earningsTimestamp: 1711483501,
  //   earningsTimestampEnd: 1718049600,
  //   earningsTimestampStart: 1717617600,
  //   epsCurrentYear: 0.01,
  //   epsForward: 0.06,
  //   epsTrailingTwelveMonths: 0.02,
  //   esgPopulated: false,
  //   exchange: "NYQ",
  //   exchangeDataDelayedBy: 0,
  //   exchangeTimezoneName: "America/New_York",
  //   exchangeTimezoneShortName: "EDT",
  //   fiftyDayAverage: 14.8884,
  //   fiftyDayAverageChange: 7.321599,
  //   fiftyDayAverageChangePercent: 0.49176532,
  //   fiftyTwoWeekChangePercent: -8.261049,
  //   fiftyTwoWeekHigh: 64.83,
  //   fiftyTwoWeekHighChange: -42.620003,
  //   fiftyTwoWeekHighChangePercent: -0.6574117,
  //   fiftyTwoWeekLow: 9.95,
  //   fiftyTwoWeekLowChange: 12.259999,
  //   fiftyTwoWeekLowChangePercent: 1.2321608,
  //   fiftyTwoWeekRange: "9.95 - 64.83",
  //   financialCurrency: "USD",
  //   firstTradeDateMilliseconds: 1013610600000,
  //   forwardPE: 370.16666,
  //   fullExchangeName: "NYSE",
  //   gmtOffSetMilliseconds: -14400000,
  //   hasPrePostMarketData: true,
  //   language: "en-US",
  //   lastClosePriceToNNWCPerShare: 39.7007516972824,
  //   lastCloseTevEbitLtm: -248.439957,
  //   longName: "GameStop Corp.",
  //   market: "us_market",
  //   marketCap: 6800368640,
  //   marketState: "CLOSED",
  //   messageBoardId: "finmb_1342560",
  //   postMarketChange: -0.91,
  //   postMarketChangePercent: -4.09725,
  //   postMarketPrice: 21.3,
  //   postMarketTime: 1715990399,
  //   priceEpsCurrentYear: 2221,
  //   priceHint: 2,
  //   priceToBook: 5.0719337,
  //   quoteSourceName: "Nasdaq Real Time Price",
  //   quoteType: "EQUITY",
  //   region: "US",
  //   regularMarketChange: -5.46,
  //   regularMarketChangePercent: -19.7326,
  //   regularMarketDayHigh: 22.41,
  //   regularMarketDayLow: 19.7,
  //   regularMarketDayRange: "19.7 - 22.41",
  //   regularMarketOpen: 21.86,
  //   regularMarketPreviousClose: 27.67,
  //   regularMarketPrice: 22.21,
  //   regularMarketTime: 1715976008,
  //   regularMarketVolume: 94904466,
  //   sharesOutstanding: 306184992,
  //   shortName: "GameStop Corporation",
  //   sourceInterval: 15,
  //   symbol: "GME",
  //   tradeable: false,
  //   trailingAnnualDividendRate: 0,
  //   trailingAnnualDividendYield: 0,
  //   trailingPE: 1110.5,
  //   triggerable: false,
  //   twoHundredDayAverage: 15.4621,
  //   twoHundredDayAverageChange: 6.747899,
  //   twoHundredDayAverageChangePercent: 0.43641543,
  //   typeDisp: "Equity",
  // };
  return (
    <>
      {Stocks?.body?.map((stock, index) => {
        return (
          <div
            key={index}
            className="group/st w-[340px] transform transition duration-500 
            hover:scale-110 relative hover:z-10 flex flex-col gap-1 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-950"
          >
            <div className="flex whitespace-nowrap justify-between gap-2 items-center">
              <h1 className="text-lg whitespace-nowrap overflow-hidden  font-medium leading-[1.1] ">
                {stock?.shortName}
              </h1>
              <h1>{`(${stock.fullExchangeName + ":" + stock?.symbol})`}</h1>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <div className="flex gap-1 items-baseline">
                <h1 className="text-4xl">{stock.regularMarketPrice}</h1>
                <h4>{stock.currency}</h4>
              </div>
              <AddButton
                symbol={stock.symbol}
                content={stock?.longName}
                setWatchList={onRemove}
              />
            </div>
            <div
              className={`flex gap-1 items-baseline ${stock.regularMarketChange >= 0 ? "text-green-600" : "text-red-500"}`}
            >
              <h1 className="text-lg">{stock.regularMarketChange}</h1>
              <h2>
                ({stock.regularMarketChangePercent + "%"})
                {stock.regularMarketChange < 0 ? (
                  <span>&#x2B07;</span>
                ) : (
                  <span>&#x2B06;</span>
                )}
                today
              </h2>
            </div>
            <div className={`whitespace-nowrap  flex gap-1 items-baseline `}>
              <h1 className="">{stock.marketState}</h1>
              <h2>
                {new Date(stock.regularMarketTime * 1000).toLocaleString(
                  "en-US",
                  options
                )}
              </h2>
            </div>
            {!!stock?.postMarketPrice ? (
              <div
                className={` whitespace-nowrap flex gap-1 items-baseline ${stock.postMarketChange >= 0 ? "text-green-500" : "text-red-400"}`}
              >
                <h4 className="text-gray-500">
                  After hours&nbsp;{stock.postMarketPrice}
                </h4>
                {!!stock?.postMarketChange && (
                  <h4>
                    {Math.round(stock?.postMarketChange * 10000) / 10000 +
                      "(" +
                      Math.round(stock?.postMarketChangePercent * 10000) /
                        10000 +
                      "%)"}
                  </h4>
                )}
              </div>
            ) : (
              <>
                <span className="p-3" />
              </>
            )}
            <div
              style={{ gridTemplateColumns: "auto auto" }}
              className=" justify-between whitespace-nowrap grid "
            >
              <p>Mkt cap :&nbsp; {stock.marketCap}</p>
              <p>Open :&nbsp; {stock.regularMarketOpen}</p>
              <p>High :&nbsp; {stock.regularMarketDayHigh}</p>
              <p>Low :&nbsp; {stock.regularMarketDayLow}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default StocksList;
