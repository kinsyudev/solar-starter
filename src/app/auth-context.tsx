"use client";

import {
  RainbowKitAuthenticationProvider,
  type AuthenticationStatus,
} from "@rainbow-me/rainbowkit";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { authenticationAdapter } from "@/configs/siwe";
import { getSession } from "@/lib/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const authQuery = useQuery<AuthenticationStatus>({
    queryKey: ["authenticationStatus"],
    queryFn: async () => {
      const session = await getSession();
      if (session) {
        return "authenticated";
      }
      return "unauthenticated";
    },
    initialData: "loading",
    refetchInterval: 5 * 60 * 1000, // 5 minutes in ms
  });
  return (
    <RainbowKitAuthenticationProvider
      adapter={authenticationAdapter}
      status={authQuery.data}
    >
      {children}
    </RainbowKitAuthenticationProvider>
  );
}
