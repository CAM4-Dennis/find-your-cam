import { useQuery } from "@tanstack/react-query";
import { fetchJerkmatePerformers, type JerkmateFilters } from "@/services/jerkmateApi";

export function useJerkmateOnline(filters: JerkmateFilters = {}, enabled = true) {
  return useQuery({
    queryKey: ["jerkmate-online", filters],
    queryFn: () => fetchJerkmatePerformers(filters),
    enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
