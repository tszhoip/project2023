import { createClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS. Only ever import this from the Stripe
// webhook and download route; never from client components or anything
// reachable without a trusted server-side check first.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
