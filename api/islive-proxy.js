// Vercel Edge Function — proxies Islive.nl performer API
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
    // Forward query params to Islive API
    const url = new URL(req.url);
    const isliveUrl = `https://www.islive.nl/api/${url.search}`;

    const response = await fetch(isliveUrl, {
      headers: {
        "User-Agent": "startvagina.nl",
      },
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
