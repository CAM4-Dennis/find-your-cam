import { useQuery } from "@tanstack/react-query";
import { fetchStripchatRooms, type StripchatFilters } from "@/services/stripchatApi";

export function useStripchatOnline(filters: StripchatFilters = {}, enabled = true) {
  return useQuery({
    queryKey: ["stripchat-online", filters],
    queryFn: () => fetchStripchatRooms(filters),
    enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
