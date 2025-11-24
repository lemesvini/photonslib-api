"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const { PrismaClient } = require("@prisma/client");
const datasourceUrl = process.env.DATABASE_URL;
if (!datasourceUrl) {
    throw new Error("DATABASE_URL is not defined. Please set it in your environment.");
}
const pool = new pg_1.Pool({
    connectionString: datasourceUrl,
    ssl: process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false,
        }
        : undefined,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const createPrismaClient = () => new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
});
const prisma = globalThis.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}
exports.default = prisma;
//# sourceMappingURL=prisma.js.map