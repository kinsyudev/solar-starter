"use server";

import { cookies } from "next/headers";
import { cache } from "react";

import { env } from "@/env";

export const isAuth = cache(async () => {
  // extract auth cookie from request
  const sessionCookie = cookies().get("solar-session");
  // if there is no sessions, the user is not yet authenticated
  if (!sessionCookie) {
    return false;
  }
  // validate the session on the auth server
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}/auth/session`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionCookie.value,
        }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
});
