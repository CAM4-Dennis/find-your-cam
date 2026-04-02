import { useQuery } from "@tanstack/react-query";
import { fetchBongaCamsRooms, type BongaCamsFilters } from "@/services/bongacamsApi";

export function useBongaCamsOnline(filters: BongaCamsFilters = {}, enabled = true) {
  return useQuery({
    queryKey: ["bongacams-online", filters],
    queryFn: () => fetchBongaCamsRooms(filters),
    enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
