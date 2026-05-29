import { useQuery } from "@tanstack/react-query";
import { fetchF4FModels, type F4FFilters } from "@/services/flirt4freeApi";

export function useFlirt4FreeOnline(filters: F4FFilters = {}, enabled = true) {
  return useQuery({
    queryKey: ["f4f-online", filters],
    queryFn: () => fetchF4FModels(filters),
    enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
