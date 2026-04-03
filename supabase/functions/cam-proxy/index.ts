import { corsHeaders } from '@supabase/supabase-js/cors'

const BONGACAMS_BASE = "https://bngprm.com/api/v2/models-online";
const XCAMS_GATEWAY = "https://cams.dnxlive.com/gateway/gatewayPost.php";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const platform = url.searchParams.get('platform');

    if (platform === 'bongacams') {
      // Forward all query params except 'platform'
      const params = new URLSearchParams(url.searchParams);
      params.delete('platform');
      
      const apiUrl = `${BONGACAMS_BASE}?${params.toString()}`;
      const response = await fetch(apiUrl);
      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (platform === 'xcams') {
      // Read body from the incoming request
      const body = await req.text();
      
      const response = await fetch(XCAMS_GATEWAY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid platform parameter' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
