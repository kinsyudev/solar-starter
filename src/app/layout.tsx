import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { Toaster } from "sonner";

import "@rainbow-me/rainbowkit/styles.css";

import { cookieToInitialState } from "wagmi";

import "./globals.css";

import { ContextProvider } from "@/app/context";
import { projectMetadata } from "@/configs/project";
import { config } from "@/configs/wagmi";
import { cn } from "@/lib/utils";


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
        <Toaster />
      </body>
    </html>
  );
}
