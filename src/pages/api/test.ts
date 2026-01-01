import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const result = await prisma.$queryRaw`SELECT 1`;
  return new Response(JSON.stringify(result));
};
