import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchNiches, fetchNicheFeed } from "@/services/nicheApi";

export function useNicheList(gender = "female") {
  return useQuery({
    queryKey: ["niches", gender],
    queryFn: async () => {
      // Fetch all pages to get complete list
      const first = await fetchNiches({ gender, size: 50, page: 0 });
      const allNiches = [...first.content];

      // Fetch remaining pages if any
      for (let page = 1; page < first.totalPages; page++) {
        const next = await fetchNiches({ gender, size: 50, page });
        allNiches.push(...next.content);
      }

      return allNiches;
    },
    staleTime: 5 * 60_000, // 5 min
  });
}

export function useNicheFeed(nicheSlug: string, mediaType: "VIDEO" | "IMAGE" = "VIDEO") {
  return useInfiniteQuery({
    queryKey: ["niche-feed", nicheSlug, mediaType],
    queryFn: ({ pageParam }) =>
      fetchNicheFeed(nicheSlug, { mediaType, sortStrategy: "TRENDING", size: 20, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!nicheSlug,
    staleTime: 2 * 60_000,
  });
}
