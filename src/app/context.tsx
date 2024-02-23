"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { mainnet } from "viem/chains";
import { type State, WagmiProvider } from "wagmi";

import { AuthProvider } from "@/app/auth-context";
import { env } from "@/env";

// Setup queryClient
export const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "ABI Directory",
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet],
  ssr: true,
});

// // Create modal
// createWeb3Modal({
//   wagmiConfig: config,
//   projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
//   siweConfig: siweConfig,
// });

export function ContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
