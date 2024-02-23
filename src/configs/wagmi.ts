import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

import { web3Metadata } from "@/configs/project";
import { env } from "@/env";

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      metadata: web3Metadata,
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: web3Metadata.name,
      appLogoUrl: web3Metadata.icons[0],
    }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

declare module "abitype" {
  export interface Register {
    StrictAbiType: false;
  }
}
