// supabase/functions/get-location/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// Define allowed origins
const ALLOWED_ORIGINS = [
  // 'https://alilatif.site',
  // 'https://www.alilatif.site',
  // 'https://www.alilatif.site/',
  "http://localhost:3000",
];
serve(async (req) => {
  try {
    // Handle CORS preflight requests
    const origin = req.headers.get("origin") || "";
    // Set CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin)
        ? origin
        : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
      "Content-Type": "application/json",
    };
    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return new Response("OK", {
        headers: corsHeaders,
      });
    }
    // Parse the request body
    const { ip } = await req.json();
    console.log("Edge function received IP:", ip);
    if (!ip || ip === "unknown") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No valid IP provided",
          country: "unknown",
          city: "unknown",
        }),
        {
          headers: corsHeaders,
        },
      );
    }
    // Use a reliable API - try ipinfo.io which is reliable with server-side requests
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API response:", data);
    return new Response(
      JSON.stringify({
        success: true,
        country: data.country || "unknown",
        city: data.city || "unknown",
        region: data.region || "unknown",
        ip: ip,
      }),
      {
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error("Edge function error:", error);
    // Include CORS headers in error responses too
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        country: "unknown",
        city: "unknown",
        ip: "error",
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            req.headers.get("origin") || ALLOWED_ORIGINS[0],
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "authorization, x-client-info, apikey, content-type",
        },
        status: 500,
      },
    );
  }
});
