import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  // Elimina la cookie de sesión
  cookies.delete("session", {
    path: "/",
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
