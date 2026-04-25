import { Pool } from "pg";

let cachedPool: Pool | null | undefined;

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (cachedPool !== undefined) {
    return cachedPool;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    cachedPool = null;
    return cachedPool;
  }

  cachedPool = new Pool({
    connectionString,
  });

  return cachedPool;
}
