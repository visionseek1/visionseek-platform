import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createSupabaseBrowserClient() {
  if (!url || !publishableKey) {
    throw new Error("Supabase public environment is missing");
  }

  return createClient(url, publishableKey);
}
