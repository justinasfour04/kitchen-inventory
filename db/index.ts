import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// Helper function to get a client from the pool
export async function getClient() {
  const pool = new Pool(
    {
      user: Deno.env.get("POSTGRES_USER"),
      password: Deno.env.get("POSTGRES_PASSWORD"),
      database: Deno.env.get("POSTGRES_DB"),
      hostname: Deno.env.get("POSTGRES_HOST"),
      port: Deno.env.get("POSTGRES_PORT"),
    },
    3,
    true,
  );
  const client = await pool.connect();
  return client;
}
