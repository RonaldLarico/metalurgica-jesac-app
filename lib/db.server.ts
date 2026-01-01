import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

export const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: import.meta.env.DATABASE_URL,
  }),
});
