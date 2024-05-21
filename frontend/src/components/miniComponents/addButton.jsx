"use client";
import React, { use, useEffect, useState, useTransition } from "react";
import { IoMdAdd } from "react-icons/io";
// import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { AuthState } from "@/context/authProvider";
import { useContext } from "react";
import { GlobalContext } from "@/context/index";
import axios from "axios";
const AddButton = ({ symbol, content, setWatchList }) => {
  const router = useRouter();
  const path = usePathname();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(symbol);
  const { Tokens, authCheck } = AuthState();
  const { theme, list, setList } = useContext(GlobalContext);
  const addToList = async (event) => {
    event.stopPropagation();
    try {
      await authCheck();
      //console.log("adding...");
      // return;
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Tokens.access}`,
        },
      };
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/watch/`,
        { symbol, content },
        config
      );
      //console.log(data);
      if (data.status === 201) {
        setList((prevMap) => new Map(prevMap.set(symbol, data.data.id)));
      }
    } catch (e) {
      console.log(e);
      return;
    }
    //console.log("adding...");
  };
  const removeFromList = async (event) => {
    event.stopPropagation();
    try {
      await authCheck();
      //console.log("adding...");
      // return;
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Tokens.access}`,
        },
      };
      const data = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/watch/${list.get(symbol)}/`,
        config
      );
      if (data.status === 204) {
        setList((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.delete(symbol);
          return newMap;
        });
        if (setWatchList !== undefined) {
          setWatchList((prev) => ({
            ...prev,
            body: prev.body.filter((cur) => cur.symbol !== symbol),
          }));
        }
      }
      // await getList();
    } catch (e) {
      console.log(e);
      return;
    }
  };

  return (
    <button
      disabled={isPending || status === undefined}
      onClick={(event) =>
        startTransition(
          list && list.has(symbol)
            ? () => removeFromList(event)
            : () => addToList(event)
        )
      }
      className="flex transform transition duration-500 scale-0
      group-hover/st:scale-100 min-w-fit items-center rounded-full bg-gray-400 p-[6px] text-5xl hover:bg-gray-500  dark:hover:bg-gray-700  "
    >
      <IoMdAdd
        className={`${list && list.has(symbol) ? "rotate-45" : ""} ${
          isPending ? "animate-spin" : ""
        }`}
        size={25}
      />

      {/* {path.startsWith("/info") && (
        <span className="py-1 pr-2 text-base">
          {status ? "Remove" : "Add to List"}
        </span>
      )} */}
    </button>
  );
};

export default AddButton;
