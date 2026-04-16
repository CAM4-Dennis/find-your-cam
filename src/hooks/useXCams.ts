import { useQuery } from "@tanstack/react-query";
import { fetchXCamsRooms, type XCamsFilters } from "@/services/xcamsApi";

// XCams temporarily disabled — set XCAMS_ENABLED back to true to re-enable
const XCAMS_ENABLED = false;

export function useXCamsOnline(filters: XCamsFilters = {}, enabled = true) {
  return useQuery({
    queryKey: ["xcams-online", filters],
    queryFn: () => fetchXCamsRooms(filters),
    enabled: XCAMS_ENABLED && enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
