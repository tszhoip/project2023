"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { normalizeDomain } from "@/lib/domain";

export async function addDomain(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const licenseId = formData.get("license_id") as string;
  const domain = normalizeDomain((formData.get("domain") as string) ?? "");
  if (!domain) return;

  // RLS (license_domains policy) enforces that license_id must belong to this user.
  const { error } = await supabase
    .from("license_domains")
    .insert({ license_id: licenseId, domain });
  if (error) throw new Error(error.message);

  revalidatePath("/account");
}

export async function removeDomain(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const domainId = formData.get("domain_id") as string;
  await supabase.from("license_domains").delete().eq("id", domainId);
  revalidatePath("/account");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
