import { Inter } from "next/font/google";

import "./globals.css";

import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { ContextProvider } from "@/app/context";
import { config } from "@/configs/wagmi";

import "@rainbow-me/rainbowkit/styles.css";

import { projectMetadata } from "@/configs/project";
import { cn } from "@/lib/utils";

// import("supports-color");

const inter = Inter({ subsets: ["latin"] });

export const metadata = projectMetadata;
export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <ContextProvider initialState={initialState}>
          {props.children}
        </ContextProvider>
      </body>
    </html>
  );
}
