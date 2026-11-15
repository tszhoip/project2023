# AIR™ — font store (Phase 1)

Single-font e-commerce site: the home page is the font's detail page, Stripe
Checkout handles payment, Supabase handles auth + license records, and a
Cloudflare Worker serves the licensed font files with a domain check.

## Stack

- **Next.js 16** (App Router) — site, checkout route, Stripe webhook, account pages
- **Supabase** — Postgres (licenses/domains), magic-link auth
- **Stripe Checkout** — hosted payment page, one flat $30 price
- **Cloudflare R2 + Worker** — private font storage, domain-locked delivery

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

The site renders and the live test tool works with zero configuration
(everything on the home page is static/local). Checkout, the webhook, login,
and the account dashboard need the services below wired up.

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Project Settings → API: copy the URL and `anon` key into
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Copy the
   `service_role` key into `SUPABASE_SERVICE_ROLE_KEY` (server-only, never
   expose this to the client).
3. SQL Editor → run [`supabase/schema.sql`](supabase/schema.sql). This creates
   `fonts`, `licenses`, `license_domains`, seeds the single `air` font row,
   sets up RLS, and adds the `is_domain_licensed` RPC the Worker calls.
4. Authentication → Providers: Email should be enabled by default (magic
   link / OTP). Authentication → URL Configuration: add your site's origin
   (and `http://localhost:3000` for local dev) to the redirect allow-list, so
   `/auth/callback` is accepted.

### 2. Stripe

1. Get your test secret key from Developers → API keys →
   `STRIPE_SECRET_KEY`. No product/price needs to be pre-created — the
   checkout route builds the $30 line item inline from `lib/font.ts`, so the
   price only lives in one place.
2. Webhook: Developers → Webhooks → add endpoint
   `https://<your-domain>/api/webhook/stripe`, listening for
   `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
   Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
3. For local testing, use the Stripe CLI instead of a real endpoint:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
   It prints a `whsec_...` value — use that as `STRIPE_WEBHOOK_SECRET` while
   testing locally.

What the webhook does on a successful payment (`app/api/webhook/stripe/route.ts`):
creates (or reuses) a Supabase auth user for the buyer's email, inserts a
`licenses` row, and inserts a `license_domains` row for the domain they typed
into the Checkout custom field. It's idempotent — safe for Stripe's retries.

### 3. Cloudflare R2 + Worker (font delivery)

This is the piece that enforces domain-locking for embedded fonts.

1. Create an R2 bucket (e.g. `air-font-private`) and upload the web font
   files at these keys: `air/black.woff2`, `air/bold.woff2`.
2. `cd worker && npm install`
3. Edit `wrangler.toml`: set `SUPABASE_URL` to your project URL, and confirm
   the `bucket_name` matches what you created.
4. `npm run secret:supabase-key` — pastes your Supabase **anon** key in as a
   Worker secret (the Worker only calls the `is_domain_licensed` RPC, which
   returns a boolean and nothing else, so the anon key is safe here).
5. `npm run deploy`, then set up a custom domain/route for the Worker (e.g.
   `fonts.your-domain.com/*`) in the Cloudflare dashboard.
6. Set `NEXT_PUBLIC_FONT_CDN_URL` in the Next.js app to that Worker URL — it's
   only used to render the `@font-face` snippet on `/account`.

Licensees embed fonts by pointing `@font-face` at
`https://fonts.your-domain.com/air/black.woff2` — see the generated snippet
on `/account`. The Worker checks the request's `Origin`/`Referer` against
registered domains before streaming the file.

The authenticated **download** button on `/account` (`app/api/download/[weight]/route.ts`)
is separate: it requires a logged-in session with an active license, not a
domain check, and reads from the same R2 bucket via the S3-compatible API
(`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`). If
those aren't set, it falls back to serving the font bundled in `/public` —
fine for local development, not for production.

## Content

Everything about the font — name, price, designer, story copy, specimen
characters, usage images, FAQ — lives in [`lib/font.ts`](lib/font.ts). Update
that file (and swap files in `public/fonts` / `public/images/usage`) rather
than editing the page components when the content changes.

`FONT.story` is a first draft based on the visual reference material — worth
a pass from whoever writes final copy for MHZ Design Office.

## What's out of scope for Phase 1

Multiple fonts/products, version tiers, non-web (desktop/app) licenses,
license revocation UI, admin tooling for managing licenses by hand — all
deferred per the brief.
