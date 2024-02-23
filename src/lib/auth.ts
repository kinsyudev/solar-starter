import { env } from "@/env";

export async function getNonce() {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/auth/nonce`, {
      credentials: "include",
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSession() {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, {
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as unknown;
    let waleltAddress: string | null = null;
    if (
      typeof data === "object" &&
      data &&
      "walletAddress" in data &&
      data.walletAddress &&
      typeof data.walletAddress === "string"
    ) {
      waleltAddress = data.walletAddress;
    }
    return waleltAddress;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function validateMessage({
  message,
  signature,
}: {
  message: string;
  signature: string;
}) {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, signature }),
    });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function signOut() {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}/auth/signout`,
      {
        credentials: "include",
        method: "POST",
      }
    );
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
