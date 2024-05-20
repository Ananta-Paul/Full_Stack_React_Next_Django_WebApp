import { AiTwotoneStar } from "react-icons/ai";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import AddButton from "../miniComponents/addButton";
// import EditItem from "../editItem";
// import {
//   div,
//   StocksContainerWraper,
//   div,
// } from "./Stockswrapers";
export const Stocks = ({ Stocks, heading, modlist }) => {
  console.log("Stocks", Stocks);
  return (
    <>
      {Stocks &&
        Stocks.map((stock, index) => {
          return (
            <div key={index}>
              {/* <div>
                <Image
                  className="object-cover group-hover/hs1:rounded-lg"
                  src={
                    stock?.image
                      ? stock.image
                      : stock?.images?.jpg?.large_image_url
                  }
                  fill
                  priority={true}
                  sizes="100%"
                  alt="stockImage"
                />
              </div> */}
              <h4 className="text-md max-h-[18px] w-[145px] flex-nowrap overflow-hidden text-center font-medium leading-[1.1] text-gray-500 md:max-h-[36px] md:w-[220px]">
                {stock.ticker}
              </h4>

              {/* {modlist !== undefined && <EditItem stock={stock} />} */}
              <div className=" absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-2 px-3 md:bottom-3">
                <AddButton stock={stock} modlist={modlist} />
              </div>
            </div>
          );
        })}
    </>
  );
};
