/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQuery = (updates: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`?${params.toString()}`);
  };

  return {
    searchParams,
    setQuery,
  };
};
