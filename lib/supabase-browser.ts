import { createClient } from "@supabase/supabase-js";

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://lckngioonokzxkrdwkez.supabase.co";
const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_3yVUiD-fSktzuyhw5z5Czg_UANGeqdP";

export function createSupabaseBrowserClient() {
  return createClient(url, publishableKey);
}