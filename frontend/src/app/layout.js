import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authProvider";
import GlobalState from "@/context";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyStockList",
  description:
    "Welcome to MyStockList, a modern stock tracking application built with [Next.js](https://nextjs.org/) and Django. This application allows you to keep track of your favorite stocks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GlobalState>{children}</GlobalState>
        </AuthProvider>
      </body>
    </html>
  );
}
