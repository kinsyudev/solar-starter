import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getSession } from "@/lib/auth";

export function useAuth(
  options?: Omit<
    UseQueryOptions<{
      walletAddress: string;
    } | null>,
    "queryKey" | "queryFn" | "initialData"
  >
) {
  const authQuery = useQuery<{
    walletAddress: string;
  } | null>({
    ...options,
    queryKey: ["userAuth"],
    queryFn: async () => {
      const session = await getSession();
      if (session) {
        return {
          walletAddress: session,
        };
      }
      return null;
    },
    initialData: null,
  });
  return authQuery;
}
