"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function useBlogs() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/blog",
    fetcher,
    {
      revalidateOnFocus: false,     // ❌ no reload on tab switch
      revalidateOnReconnect: false, // ❌ no reload on reconnect
      dedupingInterval: 60000,      // ✅ cache for 60s
    }
  );

  return {
    blogs: Array.isArray(data) ? data : data?.data || [],
    isLoading,
    isError: error,
    mutate, // 🔥 for manual updates
  };
}