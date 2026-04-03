import { useQuery } from "@tanstack/react-query";

interface GeoResult {
  country: string;
  ip: string;
}

async function fetchGeo(): Promise<GeoResult> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const res = await fetch(`${supabaseUrl}/functions/v1/cam-proxy?platform=geo`, {
    headers: {
      "Authorization": `Bearer ${anonKey}`,
      "apikey": anonKey,
    },
  });

  if (!res.ok) throw new Error("Geo lookup failed");
  return res.json();
}

export function useGeoLocation() {
  return useQuery({
    queryKey: ["geo-location"],
    queryFn: fetchGeo,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
