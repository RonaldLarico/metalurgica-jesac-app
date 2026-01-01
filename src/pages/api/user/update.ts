import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionUserId = cookies.get("session")?.value;
  if (!sessionUserId) {
    return new Response("No autorizado", { status: 401 });
  }

  const { id, email, password } = await request.json();

  if (!id || !email) {
    return new Response("Datos incompletos", { status: 400 });
  }

  const data: any = { email };

  if (password && password.length >= 6) {
    data.password = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({
    where: { id: Number(id) },
    data,
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
