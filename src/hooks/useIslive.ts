import { useQuery } from "@tanstack/react-query";
import { fetchIsliveModels, type IsliveFilters } from "@/services/isliveApi";

export function useIsliveOnline(filters: IsliveFilters = {}, enabled = true) {
  return useQuery({
    queryKey: ["islive-online", filters],
    queryFn: () => fetchIsliveModels(filters),
    enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
