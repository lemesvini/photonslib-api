import type { PrismaClient as PrismaClientType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const { PrismaClient } =
  require("@prisma/client") as typeof import("@prisma/client");

const datasourceUrl = process.env.DATABASE_URL;

if (!datasourceUrl) {
  throw new Error(
    "DATABASE_URL is not defined. Please set it in your environment."
  );
}

const pool = new Pool({
  connectionString: datasourceUrl,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
});

const adapter = new PrismaPg(pool);

const createPrismaClient = () =>
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientType | undefined;
}

const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
