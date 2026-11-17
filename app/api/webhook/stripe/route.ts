import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeDomain } from "@/lib/domain";

// Grants a license for a completed checkout. Safe to call more than once for
// the same session — Stripe retries webhooks, so every step is idempotent.
async function fulfillCheckout(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;

  const email = session.customer_details?.email;
  if (!email) return;

  const domainField = session.custom_fields?.find((f) => f.key === "domain");
  const rawDomain = domainField?.text?.value;
  if (!rawDomain) return;
  const domain = normalizeDomain(rawDomain);

  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("licenses")
    .select("id")
    .eq("stripe_checkout_session_id", session.id)
    .maybeSingle();
  if (existing) return;

  // No default: a session without a font must never silently grant another one.
  const fontSlug = session.metadata?.font_slug;
  if (!fontSlug) throw new Error(`Missing font_slug in checkout session ${session.id}`);

  const { data: font } = await admin.from("fonts").select("id").eq("slug", fontSlug).single();
  if (!font) throw new Error(`Unknown font_slug "${fontSlug}" in checkout session ${session.id}`);

  // Idempotent: creates the auth user if they don't exist yet, otherwise
  // returns the existing one. No email is sent from here — buyers sign in
  // themselves from /login, which triggers Supabase's own magic-link email.
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (linkError || !linkData.user) {
    throw new Error(`Could not resolve auth user for ${email}: ${linkError?.message}`);
  }

  const { data: license, error: licenseError } = await admin
    .from("licenses")
    .insert({
      user_id: linkData.user.id,
      font_id: font.id,
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : session.customer?.id,
      stripe_checkout_session_id: session.id,
    })
    .select("id")
    .single();
  if (licenseError || !license) {
    throw new Error(`Could not create license for session ${session.id}: ${licenseError?.message}`);
  }

  await admin.from("license_domains").insert({ license_id: license.id, domain });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await fulfillCheckout(event.data.object as Stripe.Checkout.Session);
        break;
      default:
        break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
