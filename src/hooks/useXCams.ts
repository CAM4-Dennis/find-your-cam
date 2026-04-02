import { useQuery } from "@tanstack/react-query";
import { fetchXCamsRooms, type XCamsFilters } from "@/services/xcamsApi";

export function useXCamsOnline(filters: XCamsFilters = {}, enabled = true) {
  return useQuery({
    queryKey: ["xcams-online", filters],
    queryFn: () => fetchXCamsRooms(filters),
    enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
