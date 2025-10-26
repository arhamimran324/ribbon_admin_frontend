import { Metadata } from "next";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import ReactQueryProvider from "@/api/provider";
import StateProvider from "@/redux/state-provider";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Ribbon Bow Admin Panel`,
  // description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* <link rel="icon" href="/assets/svg/favicon.svg" /> */}</head>
      <body className={inter.className}>
        <StateProvider>
          <Suspense fallback={<Loading />}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </Suspense>
        </StateProvider>
        <ToastContainer position="top-right" closeButton />
      </body>
    </html>
  );
}
