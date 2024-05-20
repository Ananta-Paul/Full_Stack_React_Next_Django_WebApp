"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import Loading from "@/components/loading";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [Tokens, setTokens] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTokens = localStorage.getItem("Tokens");
      if (storedTokens) {
        try {
          return JSON.parse(storedTokens);
        } catch (e) {
          console.error("Error parsing stored tokens:", e);
        }
      }
    }
    return null;
  });
  // console.log(path);
  async function authCheck() {
    if (!Tokens?.refresh) {
      router.push("/login");
      throw new Error("Not Authenticated");
    } else if (jwtDecode(Tokens?.access).exp < Date.now() / 1000) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.post(
          `http://127.0.0.1:8000/api/token/refresh/`,
          {
            refresh: Tokens.refresh,
          },
          config
        );
        console.log("Refresh", res);
        setTokens((pre) => {
          return { ...pre, access: res.data.access };
        });
      } catch (error) {
        console.log(error);
        setTokens(null);
        router.push("/login");
        throw new Error("Token Expired");
      }
    }
  }
  useEffect(() => {
    if (Tokens === null) {
      localStorage.removeItem("Tokens");
      setUser(null);
      return;
    }
    localStorage.setItem("Tokens", JSON.stringify(Tokens));
    setUser(jwtDecode(Tokens.access));
  }, [Tokens]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setTokens,
        Tokens,
        authCheck,
      }}
    >
      {/* {Tokens===null?<>Loding...</>: */}
      {children}
    </AuthContext.Provider>
  );
};
export const AuthState = () => {
  return useContext(AuthContext);
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const { authCheck } = AuthState();
  const router = useRouter();
  useEffect(() => {
    const check = async () => {
      try {
        await authCheck();
        setAuthenticated(true);
      } catch (error) {
        console.log(error);
        setAuthenticated(false);
      }
    };
    check();
  }, []);
  return authenticated === null ? <Loading /> : <> {children}</>;
};

// export async function isAuthenticated() {
//   // const router = useRouter();
//   const [authenticated, setAuthenticated] = useState(null);
//   const { Tokens, setTokens } = AuthState();

//
export default AuthProvider;
