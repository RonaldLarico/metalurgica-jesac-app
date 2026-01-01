import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response("Datos inválidos", { status: 400 });
  }

  const exists = await prisma.user.findUnique({
    where: { email },
  });

  if (exists) {
    return new Response("El usuario ya existe", { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return new Response(JSON.stringify({ ok: true }), { status: 201 });
};
