"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthState } from "@/context/authProvider";
import { useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "@/context/index";
const Login = () => {
  const router = useRouter();
  const { user, setTokens } = AuthState();
  const { getList } = useContext(GlobalContext);
  const [error, setError] = useState("");
  const [state, setState] = useState("log in");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const PasswordRef = useRef();
  const cPasswordRef = useRef();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const submitHandler = async (e) => {
    // validCheak();
    setLoading(true);
    e.preventDefault();
    const formdata = new FormData(e.target);
    //console.log(formdata.get("username"), formdata.get("password"));
    if (state === "sign up") {
      if (formdata.get("password") !== formdata.get("cpassword")) {
        cPasswordRef.current.setCustomValidity("Passwords Don't Match");
        setError("Password Don't Match");
        animate();
        return;
      }
      cPasswordRef.current.setCustomValidity("");
    }

    //setLoading(true);
    const user = {
      username: formdata.get("username"),
      password: formdata.get("password"),
    };
    //console.log("user", user);
    //console.log(process.env.Ananta);
    await sendData(user, e);
    setLoading(false);
  };

  async function sendData(user, e) {
    try {
      const api_url =
        process.env.NEXT_PUBLIC_BASE_URL +
        (state === "sign up" ? "api/user/register/" : "api/token/");

      //console.log(api_url);
      const res = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      //console.log(res);
      const resdata = await res.json();
      //console.log(resdata);
      if (res.ok) {
        if (state === "sign up") {
          e.target.reset();
          setState("log in");
        } else {
          setTokens(resdata);
          router.push(callbackUrl);
        }
      } else {
        setError(resdata.detail);
        animate();
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("Error during registration: ");
      animate();
    }
  }
  async function animate() {
    var element = document.getElementById("error");
    if (element) {
      element.offsetHeight;
      element.classList.remove("error");
      const tt = setTimeout(() => {
        element.classList.add("error");
      }, 10);
      clearTimeout(tt);
    }
  }
  // return user === null ? (
  //   <div>Loding...</div>
  // ) :
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 ">
      <div className="min-h-min min-w-min rounded-lg sm:rounded-xl">
        <div className="group/card relative">
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-25 blur transition duration-1000 group-hover/card:opacity-100 group-hover/card:duration-200"></div>
          <div className="relative z-10 flex flex-col items-center justify-around rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 p-3 text-center  dark:bg-gradient-to-b dark:from-gray-600 dark:to-gray-900 sm:rounded-xl">
            <Image
              alt="logo"
              className="mx-auto h-20 w-20 sm:h-28 sm:w-28"
              src="/logoo.png"
              height={120}
              width={120}
            />
            <div>
              <h3 className=" text-lg text-gray-800 dark:text-gray-100">
                {state === "sign up" ? "Sign Up" : "Login"}
              </h3>
              <h2
                id="error"
                className="w-[300px] text-orange-700 dark:text-orange-300 "
              >
                {error ? "Error : " + error : <br />}
              </h2>
            </div>
            <form
              onSubmit={submitHandler}
              className={`mb-8 ${
                state === "log in" ? "sm:px-4   " : "px-3 sm:px-10 "
              }`}
            >
              {/* {state === "sign up" && (
                <div className="mx-auto my-3 flex w-min rounded-xl border-2 border-solid border-gray-400 bg-white p-1 font-light text-slate-400 dark:border-lime-500 dark:bg-gray-900 dark:text-lime-500 sm:p-[5px]">
                  <FontAwesomeIcon
                    className="fa-lg my-auto ml-2"
                    icon={faUser}
                  />
                  <input
                    type="text"
                    name="name"
                    className="m-[2px] ml-2 w-[216px] bg-transparent focus:outline-none sm:ml-1"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )} */}
              <div className="mx-auto my-3 flex w-min rounded-xl border-2 border-solid border-gray-400 bg-white p-1 font-light text-slate-400 dark:border-lime-500 dark:bg-gray-900 dark:text-lime-500 sm:p-[5px]">
                <FontAwesomeIcon className="fa-lg my-auto ml-2" icon={faUser} />

                <input
                  type="text"
                  name="username"
                  className="m-[2px] pl-2  w-[216px] bg-transparent focus:outline-none sm:ml-1"
                  placeholder="Username"
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mx-auto my-3 flex w-min rounded-xl border-2 border-solid border-gray-400 bg-white p-1 font-light text-slate-400 dark:border-lime-500 dark:bg-gray-900 dark:text-lime-500 sm:p-[5px]">
                <FontAwesomeIcon className="fa-lg my-auto ml-2" icon={faKey} />

                <input
                  ref={PasswordRef}
                  type={show ? "text" : "password"}
                  name="password"
                  className="m-[2px] pl-2 w-[196px] bg-transparent focus:outline-none sm:ml-1"
                  placeholder="Password"
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  className={`fa-md  my-auto ${show ? "mx-[1px]" : ""}`}
                  onClick={() => setShow(!show)}
                  icon={show ? faEye : faEyeSlash}
                />
              </div>
              {state === "sign up" && (
                <div className="mx-auto my-3 flex w-min rounded-xl border-2 border-solid border-gray-400 bg-white p-1 font-light text-slate-400 dark:border-lime-500 dark:bg-gray-900 dark:text-lime-500 sm:p-[5px]">
                  <FontAwesomeIcon
                    className="fa-lg my-auto ml-2"
                    icon={faKey}
                  />
                  <input
                    ref={cPasswordRef}
                    type={show ? "text" : "password"}
                    name="cpassword"
                    className="m-[2px] pl-2 w-[196px] bg-transparent focus:outline-none sm:ml-1"
                    placeholder="Confirm Password"
                    id="confirm_password"
                    // onChange={(e) => setCPassword(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon
                    className={`fa-md  my-auto ${show ? "mx-[1px]" : ""}`}
                    onClick={() => setShow(!show)}
                    icon={show ? faEye : faEyeSlash}
                  />
                </div>
              )}

              <button
                type="submit"
                // onClick={validCheak}
                disabled={loading}
                className="text-md group relative mb-2 mr-2 mt-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
              >
                <span className="relative rounded-md bg-white px-4 py-[6px] transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="">Loading...</span>
                      </div>
                    </div>
                  ) : state === "log in" ? (
                    " Log In"
                  ) : (
                    " Sign Up"
                  )}
                </span>
              </button>
            </form>

            <div className="relative bottom-0">
              <div className="text-gray-600 dark:text-gray-100">
                {state === "log in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <strong
                  className="cursor-pointer text-blue-500"
                  onClick={() => {
                    setState((prevValue) =>
                      prevValue === "log in" ? "sign up" : "log in"
                    );
                    setError("");
                  }}
                >
                  {state !== "log in" ? " Log In" : " Sign Up"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
