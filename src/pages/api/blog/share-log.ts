import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { platform, targetId, type } = body;
    
    const validTypes = ["SERVICE", "BLOG"];
    if (!validTypes.includes(type)) {
      return new Response(
        JSON.stringify({ success: false, error: "Tipo no válido" }),
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("remote-address") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const log = await prisma.shareLog.create({
      data: {
        platform,
        targetId,
        type,
        ipAddress,
        userAgent,
      },
    });

    return new Response(JSON.stringify({ success: true, log }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: "No se pudo guardar el log" }),
      {
        status: 500,
      },
    );
  }
};
