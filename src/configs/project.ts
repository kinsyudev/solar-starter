import type { Metadata } from "next";

export const projectMetadata = {
  title: "ABI Directory",
  description: "ABI Directory",
  applicationName: "ABI Directory",
} satisfies Metadata;

export const web3Metadata = {
  name: projectMetadata.title,
  description: projectMetadata.description,
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
