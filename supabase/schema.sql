-- AIR™ font store — Phase 1 schema
-- Run this once against a fresh Supabase project (SQL Editor, or `supabase db push`).

create extension if not exists "pgcrypto";

-- One row per sellable font. Phase 1 only ever has the single "air" row;
-- the table exists so licenses have something stable to reference and so
-- price/version changes don't require a migration.
create table if not exists fonts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price_usd integer not null,
  current_version text not null default '1.0.0',
  updated_at timestamptz not null default now()
);

insert into fonts (slug, name, price_usd)
values ('air', 'AIR™', 30)
on conflict (slug) do nothing;

-- One row per purchase. Created by the Stripe webhook after a successful
-- checkout — never written to directly by the client.
create table if not exists licenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  font_id uuid not null references fonts (id),
  stripe_customer_id text,
  stripe_checkout_session_id text unique,
  status text not null default 'active' check (status in ('active', 'revoked')),
  created_at timestamptz not null default now()
);

create index if not exists licenses_user_id_idx on licenses (user_id);

-- The domains a license is locked to. A license can cover multiple domains;
-- this is the (buyer, domain) pair from the data model, joined through licenses.
create table if not exists license_domains (
  id uuid primary key default gen_random_uuid(),
  license_id uuid not null references licenses (id) on delete cascade,
  domain text not null,
  created_at timestamptz not null default now(),
  unique (license_id, domain)
);

create index if not exists license_domains_domain_idx on license_domains (domain);

alter table fonts enable row level security;
alter table licenses enable row level security;
alter table license_domains enable row level security;

create policy "fonts are publicly readable" on fonts
  for select using (true);

create policy "users read their own licenses" on licenses
  for select using (auth.uid() = user_id);

create policy "users manage domains on their own licenses" on license_domains
  for all using (
    exists (
      select 1 from licenses
      where licenses.id = license_domains.license_id
        and licenses.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from licenses
      where licenses.id = license_domains.license_id
        and licenses.user_id = auth.uid()
    )
  );

-- Called by the Cloudflare Worker (via the anon key) on every font request.
-- Returns only a boolean — never exposes buyer identity or other domains —
-- so it's safe to grant to anon despite licenses/license_domains being locked down above.
create or replace function is_domain_licensed(check_domain text, check_font_slug text default 'air')
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from license_domains
    join licenses on licenses.id = license_domains.license_id
    join fonts on fonts.id = licenses.font_id
    where license_domains.domain = lower(check_domain)
      and fonts.slug = check_font_slug
      and licenses.status = 'active'
  );
$$;

grant execute on function is_domain_licensed(text, text) to anon, authenticated;
