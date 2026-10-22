import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL;

  // 1. Direct PostgreSQL / CockroachDB / MySQL connection (Supabase, Neon, AWS RDS, Vercel Postgres)
  if (envUrl && (envUrl.startsWith("postgres://") || envUrl.startsWith("postgresql://") || envUrl.startsWith("mysql://"))) {
    return envUrl;
  }

  // 2. Vercel Serverless environment with SQLite (copies bundled dev.db to writable /tmp)
  if (process.env.VERCEL) {
    const tmpDbPath = path.join("/tmp", "dev.db");
    if (!fs.existsSync(tmpDbPath) || fs.statSync(tmpDbPath).size === 0) {
      const candidates = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), ".next", "server", "prisma", "dev.db"),
        path.resolve("./prisma/dev.db"),
        path.join(__dirname, "..", "..", "prisma", "dev.db"),
      ];

      for (const src of candidates) {
        if (fs.existsSync(src)) {
          try {
            fs.copyFileSync(src, tmpDbPath);
            break;
          } catch (e) {
            console.error("Failed to copy sqlite db to /tmp:", e);
          }
        }
      }
    }
    return `file:${tmpDbPath}`;
  }

  return envUrl || "file:./prisma/dev.db";
}

const dbUrl = getDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
