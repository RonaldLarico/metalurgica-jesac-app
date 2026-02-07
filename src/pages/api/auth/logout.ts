import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  const isProd = import.meta.env.PROD;

  cookies.set("session", "", {
    path: "/",
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    ...(isProd && { domain: ".metalurgicajesac.com" }),
    httpOnly: true,
    maxAge: 0,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
