"use client";
import Loading from "@/components/loading";
import React, {
  createContext,
  useState,
  useEffect,
  useTransition,
} from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Layout from "@/components/layout";
import { AuthState } from "@/context/authProvider";
import Print from "@/components/miniComponents/print";

export const GlobalContext = createContext();
export default function GlobalState({ children }) {
  const path = usePathname();
  const { Tokens, setTokens, authCheck } = AuthState();
  function getWatchList() {
    if (typeof window === "undefined") return;
    const storedList = localStorage.getItem("watchlist");

    if (storedList) {
      try {
        return new Map(JSON.parse(storedList));
      } catch (e) {
        console.error("Error parsing stored list:", e);
        localStorage.removeItem("watchlist");
      }
    }
    return new Map();
  }
  const [list, setList] = useState(getWatchList());
  let r = 0;
  const mainBody =
    path === "/login" ? <>{children}</> : <Layout>{children}</Layout>;
  const getTheme = () => {
    if (typeof window !== "undefined") {
      const storedTheme = window.localStorage.getItem("theme");
      //console.log(storedTheme);
      if (!!storedTheme) {
        try {
          const th = JSON.parse(storedTheme);
          if (th === "light" || th === "dark") return th;
        } catch (e) {
          console.error("Error parsing stored theme:", e);
          localStorage.removeItem("theme");
        }
      }
      let thm = "light";
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        thm = "dark";
      }
      return thm;
    }
    return "dark";
  };
  const [theme, setTheme] = useState(null);

  const [isPending, startTransition] = useTransition();
  const [searchKeyword, setSearchKeyword] = useState({ prev: "", pres: "" });
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      return next;
    });
  };

  async function getList(key) {
    //console.log("Getting List", Tokens);
    let authkey = key ? key : Tokens?.access;
    if (!authkey) return;
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${authkey}`,
        },
      };
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/watch/`,
        config
      );
      // const data = await res.json();
      //console.log(data);
      if (data?.status === 200) {
        setList(new Map(data.data.map((item) => [item.symbol, item.id])));
      } else setList(new Map());
      return data;
    } catch (e) {
      console.log(e);
      await authCheck();
    }
  }
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  useEffect(() => {
    if (!!Tokens?.access) getList();
    else setList(new Map());
  }, [Tokens]);

  useEffect(() => {
    if (theme === "dark" || theme === "light") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", JSON.stringify(theme));
    } else {
      setTheme("dark");
    }
  }, [theme]);
  useEffect(() => {
    //console.log(list);
    if (typeof window === "undefined") return;
    window.localStorage.setItem("watchlist", JSON.stringify(Array.from(list)));
  }, [list]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme,
        searchKeyword,
        setSearchKeyword,
        isPending,
        startTransition,
        list,
        getList,
        setList,
      }}
    >
      {!!theme ? mainBody : <Loading />}
    </GlobalContext.Provider>
  );
}
// export const GlobalState = () => {
//   return useContext(GlobalContext);
// };
