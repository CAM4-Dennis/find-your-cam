// Vercel Serverless Function — proxies Flirt4Free Performer API
// Adds CORS headers and caches responses for 30 seconds

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);

    // Build upstream URL
    const upstream = new URL("https://www.flirt4free.com/webservices/performers.php");
    for (const [key, value] of params) {
      upstream.searchParams.set(key, value);
    }
    // Force JSON
    upstream.searchParams.set("data_type", "json");

    const response = await fetch(upstream.toString(), {
      headers: { "Accept": "application/json" },
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Proxy error", message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}
