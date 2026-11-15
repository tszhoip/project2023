import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { addDomain, removeDomain, signOut } from "./actions";
import { FONT } from "@/lib/font";

type LicenseRow = {
  id: string;
  status: string;
  created_at: string;
  font: { name: string; slug: string } | { name: string; slug: string }[] | null;
  license_domains: { id: string; domain: string }[] | null;
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: licenses } = await supabase
    .from("licenses")
    .select("id, status, created_at, font:fonts(name, slug), license_domains(id, domain)")
    .eq("user_id", user.id)
    .returns<LicenseRow[]>();

  const cdnBase = process.env.NEXT_PUBLIC_FONT_CDN_URL ?? "https://fonts.your-domain.com";

  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-16">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-air-black text-2xl">
          {FONT.name}
        </Link>
        <form action={signOut}>
          <button type="submit" className="text-sm text-muted hover:text-foreground">
            Sign out
          </button>
        </form>
      </div>

      <h1 className="mt-10 text-xl">Your licenses</h1>
      <p className="mt-1 text-sm text-muted">{user.email}</p>

      {!licenses || licenses.length === 0 ? (
        <p className="mt-8 text-muted">
          No licenses on this account yet. Purchases can take a moment to appear — refresh in a
          few seconds, or <Link href="/#license" className="underline">get {FONT.name}</Link>.
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {licenses.map((license) => {
            const font = Array.isArray(license.font) ? license.font[0] : license.font;
            return (
              <div key={license.id} className="rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <p className="font-air-bold text-lg">{font?.name ?? FONT.name}</p>
                  <span className="rounded-full border border-border px-3 py-1 text-xs uppercase text-muted">
                    {license.status}
                  </span>
                </div>

                <div className="mt-6">
                  <p className="text-sm uppercase tracking-wide text-muted">Registered domains</p>
                  <ul className="mt-3 space-y-2">
                    {(license.license_domains ?? []).map((d) => (
                      <li
                        key={d.id}
                        className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
                      >
                        {d.domain}
                        <form action={removeDomain}>
                          <input type="hidden" name="domain_id" value={d.id} />
                          <button type="submit" className="text-muted hover:text-accent">
                            Remove
                          </button>
                        </form>
                      </li>
                    ))}
                  </ul>
                  <form action={addDomain} className="mt-3 flex gap-2">
                    <input type="hidden" name="license_id" value={license.id} />
                    <input
                      type="text"
                      name="domain"
                      required
                      placeholder="newdomain.com"
                      className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                    <button
                      type="submit"
                      className="rounded-md border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent"
                    >
                      Add domain
                    </button>
                  </form>
                </div>

                <div className="mt-6">
                  <p className="text-sm uppercase tracking-wide text-muted">Embed</p>
                  <p className="mt-2 text-sm text-muted">
                    Add this to your CSS. It only serves the font from domains registered above.
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-surface p-4 text-xs">
{FONT.weights
  .map(
    (w) => `@font-face {
  font-family: "${w.fontFamily}";
  src: url("${cdnBase}/${FONT.slug}/${w.name.toLowerCase()}.woff2") format("woff2");
  font-weight: ${w.cssWeight};
  font-display: swap;
}`
  )
  .join("\n\n")}
                  </pre>
                </div>

                <div className="mt-6">
                  <p className="text-sm uppercase tracking-wide text-muted">Download</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {FONT.weights.map((w) => (
                      <a
                        key={w.name}
                        href={`/api/download/${w.name.toLowerCase()}?license_id=${license.id}`}
                        className="rounded-md border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent"
                      >
                        {w.name} ({FONT.formats.join("/")})
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
