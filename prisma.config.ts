import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Configure Prisma to read the datasource URL from the environment instead of schema.prisma
export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
