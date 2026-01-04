import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const GET: APIRoute = async () => {
  const images = await prisma.image.findMany({
    select: {
      id: true,
      url: true,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return new Response(JSON.stringify(images), {
    headers: { "Content-Type": "application/json" },
  });
};
