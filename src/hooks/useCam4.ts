import { useQuery } from "@tanstack/react-query";
import { fetchOnlineCams, type Cam4Filters } from "@/services/cam4Api";

export function useCam4Online(filters: Cam4Filters = {}, enabled = true) {
  return useQuery({
    queryKey: ["cam4-online", filters],
    queryFn: () => fetchOnlineCams(filters),
    enabled,
    refetchInterval: 60_000, // refresh every 60s
    staleTime: 30_000,
  });
}
