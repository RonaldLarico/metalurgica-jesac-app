import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const GET: APIRoute = async ({ cookies }) => {
  const userId = cookies.get("session")?.value;
  if (!userId) return new Response(null, { status: 401 });

  const images = await prisma.image.findMany({
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(images), {
    headers: { "Content-Type": "application/json" },
  });
};
