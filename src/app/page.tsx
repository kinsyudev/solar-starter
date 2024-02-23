import { ConnectButton } from "@rainbow-me/rainbowkit";

import { isAuth } from "@/lib/server/auth";

export default async function Home() {
  const auth = await isAuth();
  console.log(auth);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ConnectButton />
      <h1 className="text-4xl font-bold">Welcome to your app</h1>
    </main>
  );
}
