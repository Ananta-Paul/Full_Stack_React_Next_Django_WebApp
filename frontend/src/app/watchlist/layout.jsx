import { ProtectedRoute } from "@/context/authProvider";
import React from "react";

const Layout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;
