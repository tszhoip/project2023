import Link from "next/link";
import type { FontDef } from "@/lib/fonts";

export function SiteHeader({ font }: { font?: FontDef }) {
  const nav = font
    ? [
        { href: "#specimen", label: "Specimen" },
        { href: "#glyphs", label: "Characters" },
        { href: "#test", label: "Test" },
        ...(font.usageGroups.length > 0 ? [{ href: "#usage", label: "Usage" }] : []),
        { href: "#license", label: "License" },
      ]
    : [];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-baseline gap-3 text-lg tracking-tight">
          <Link href="/" className="font-semibold">
            MHZ
          </Link>
          {font && (
            <>
              <span className="text-muted" aria-hidden>
                /
              </span>
              <span style={{ fontFamily: font.weights[0].cssFamily }}>{font.name}</span>
            </>
          )}
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <Link href="/account" className="text-sm text-muted transition hover:text-foreground">
          Account
        </Link>
      </div>
    </header>
  );
}
