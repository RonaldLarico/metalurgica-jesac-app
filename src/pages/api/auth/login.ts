import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response("Datos incompletos", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response("Credenciales inválidas", { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return new Response("Credenciales inválidas", { status: 401 });
  }

  cookies.set("session", String(user.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: import.meta.env.PROD,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
