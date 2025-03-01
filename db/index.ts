import { createClient } from "@supabase/supabase-js";
import { Database } from "./types.ts";

export function getClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_API_KEY");
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("The Supabase URL and/or API key are not set in env");
  }
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);
  return supabase;
}
