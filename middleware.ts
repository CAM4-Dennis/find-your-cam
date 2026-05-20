import { next } from "@vercel/edge";

// Blocked countries (ISO 3166-1 alpha-2)
const BLOCKED_COUNTRIES = new Set(["SG"]);

export default function middleware(request: Request) {
  const country = request.headers.get("x-vercel-ip-country") || "";

  if (BLOCKED_COUNTRIES.has(country)) {
    return new Response("Access denied", { status: 403 });
  }

  return next();
}

export const config = {
  matcher: "/(.*)",
};
