import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { FONT } from "@/lib/font";

export async function POST(request: NextRequest) {
  const origin = request.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_creation: "always",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: FONT.priceUsd * 100,
          product_data: {
            name: `${FONT.name} — Web License`,
            description: "Domain-locked web license. Includes all future updates.",
          },
        },
      },
    ],
    custom_fields: [
      {
        key: "domain",
        label: { type: "custom", custom: "Domain you'll use this font on" },
        type: "text",
        text: { minimum_length: 3, maximum_length: 253 },
      },
    ],
    metadata: {
      font_slug: FONT.slug,
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }

  return NextResponse.redirect(session.url, 303);
}
