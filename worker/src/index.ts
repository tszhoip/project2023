export interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  FONT_BUCKET: R2Bucket;
}

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Vary": "Origin",
  };
}

function extractHostname(request: Request): string | null {
  const source = request.headers.get("Origin") ?? request.headers.get("Referer");
  if (!source) return null;
  try {
    return new URL(source).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

async function isDomainLicensed(env: Env, domain: string, fontSlug: string): Promise<boolean> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/is_domain_licensed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ check_domain: domain, check_font_slug: fontSlug }),
  });
  if (!res.ok) return false;
  return (await res.json()) === true;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const [, fontSlug, file] = url.pathname.split("/");
    if (!fontSlug || !file || !file.endsWith(".woff2")) {
      return new Response("Not found", { status: 404 });
    }
    const weight = file.replace(/\.woff2$/, "");

    const domain = extractHostname(request);
    if (!domain) {
      return new Response("Missing Origin/Referer", { status: 400 });
    }

    const licensed = await isDomainLicensed(env, domain, fontSlug);
    if (!licensed) {
      return new Response("Domain not licensed for this font", {
        status: 403,
        headers: corsHeaders(origin),
      });
    }

    const object = await env.FONT_BUCKET.get(`${fontSlug}/${weight}.woff2`);
    if (!object) {
      return new Response("Font file not found", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "Content-Type": "font/woff2",
        "Cache-Control": "public, max-age=86400",
        ...corsHeaders(origin),
      },
    });
  },
};
