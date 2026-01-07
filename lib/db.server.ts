import PrismaPkg from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const { PrismaClient } = PrismaPkg;

export const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: import.meta.env.DATABASE_URL,
  }),
});
