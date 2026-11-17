import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getFont, isBuyable } from "@/lib/fonts";

export async function POST(request: NextRequest) {
  const origin = request.nextUrl.origin;

  // The browser only says *which* font. Name and price always come from the catalog.
  const form = await request.formData();
  const font = getFont(String(form.get("font") ?? ""));
  if (!font || !isBuyable(font)) {
    return NextResponse.json({ error: "This font isn't available to buy." }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_creation: "always",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: font.priceUsd * 100,
          product_data: {
            name: `${font.name} — Web License`,
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
      font_slug: font.slug,
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/fonts/${font.slug}`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }

  return NextResponse.redirect(session.url, 303);
}
