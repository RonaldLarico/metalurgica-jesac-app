import type { APIRoute } from 'astro';
import { prisma } from '../../../../../../lib/db.server';

export const GET: APIRoute = async ({ params }) => {
  try {
    const blogId = Number(params.blogId); // <-- desde la ruta dinámica

    if (isNaN(blogId)) {
      return new Response(JSON.stringify({ success: false, message: 'blogId inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const questions = await prisma.question.findMany({
      where: { blogId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        question: true,
        answer: true,
        blogId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return new Response(JSON.stringify({ success: true, data: questions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching questions:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
