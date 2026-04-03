const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BONGACAMS_BASE = "https://bngprm.com/api/v2/models-online";
const XCAMS_GATEWAY = "https://cams.dnxlive.com/gateway/gatewayPost.php";
const STRIPCHAT_BASE = "https://go.stripchat.com/api/models";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Extract real client IP from headers
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('cf-connecting-ip')
    || '127.0.0.1';

  try {
    const url = new URL(req.url);
    const platform = url.searchParams.get('platform');

    if (platform === 'geo') {
      let country = req.headers.get('cf-ipcountry')
        || req.headers.get('x-country-code')
        || '';

      // Fallback: use ip-api if no country header
      if (!country && clientIp && clientIp !== '127.0.0.1') {
        try {
          const geoRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=countryCode`);
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            country = geoData.countryCode || '';
          }
        } catch { /* ignore */ }
      }

      return new Response(JSON.stringify({ country: country.toLowerCase(), ip: clientIp }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (platform === 'bongacams') {
      const params = new URLSearchParams(url.searchParams);
      params.delete('platform');
      params.set('client_ip', clientIp);
      
      const apiUrl = `${BONGACAMS_BASE}?${params.toString()}`;
      const response = await fetch(apiUrl);
      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (platform === 'xcams') {
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

    if (platform === 'stripchat') {
      const apiKey = Deno.env.get('STRIPCHAT_API_KEY');
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Stripchat API key not configured' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const params = new URLSearchParams();
      params.set('forceClient', '0');
      params.set('applyGeobans', '0');
      params.set('fields', 'tags');
      params.set('strict', '1');

      const tag = url.searchParams.get('tag');
      if (tag) params.set('tag', tag);

      const limit = url.searchParams.get('limit') || '50';
      params.set('limit', limit);

      const status = url.searchParams.get('status') || 'public';
      params.set('status', status);

      const apiUrl = `${STRIPCHAT_BASE}?${params.toString()}`;
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
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
