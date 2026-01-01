import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const GET: APIRoute = async ({ cookies }) => {
  const userId = cookies.get("session")?.value;
  if (!userId) {
    return new Response("No autorizado", { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
};
