import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  // Elimina la cookie de sesión en produccion y desarrollo
  cookies.delete("session", {
    path: "/",
    sameSite: "lax",
    secure: import.meta.env.PROD,
  });

  return new Response(
    JSON.stringify({ ok: true }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
