import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionUserId = cookies.get("session")?.value;
  if (!sessionUserId) {
    return new Response("No autorizado", { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return new Response("ID requerido", { status: 400 });
  }

  await prisma.service.delete({
    where: { id: Number(id) },
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
