import { useQuery } from "@tanstack/react-query";
import { fetchChaturbateRooms, type ChaturbateFilters } from "@/services/chaturbateApi";

export function useChaturbateOnline(filters: ChaturbateFilters = {}, enabled = true) {
  return useQuery({
    queryKey: ["chaturbate-online", filters],
    queryFn: () => fetchChaturbateRooms(filters),
    enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
