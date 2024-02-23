import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { SiweMessage } from "siwe";

import { queryClient } from "@/app/context";
import { getNonce, signOut, validateMessage } from "@/lib/auth";

export const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    // Fetch nonce from your SIWE server
    const nonce = await getNonce();
    if (!nonce) {
      throw new Error("Failed to get nonce!");
    }

    return nonce;
  },
  createMessage: ({ nonce, address, chainId }) => {
    const message = new SiweMessage({
      version: "1",
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      // Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
      statement: "Welcome to ABI Directorty, user your wallet to sign in.",
    });
    return message;
  },
  getMessageBody: ({ message }) => {
    return message.prepareMessage();
  },
  verify: async ({ message, signature }) => {
    try {
      // Use your SIWE server to verify if the message and the signature are valid
      // Your back-end will tipically rely on SiweMessage(message).validate(signature)
      const isValid = await validateMessage({
        message: message.toMessage(),
        signature,
      });
      if (isValid) {
        await queryClient.invalidateQueries({
          exact: true,
          queryKey: ["authenticationStatus"],
        });
      }
      return isValid;
    } catch (error) {
      return false;
    }
  },
  signOut: async () => {
    try {
      // Sign out by calling the relevant endpoint on your back-end
      await signOut();
      await queryClient.invalidateQueries({
        exact: true,
        queryKey: ["authenticationStatus"],
      });
    } catch (error) {
      console.error(error);
    }
  },
});
