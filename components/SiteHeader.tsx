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
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-baseline gap-3 text-[24px] leading-[1.2] font-medium">
          <Link href="/" className="transition-opacity hover:opacity-60 focus-visible:opacity-60">
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
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-opacity hover:opacity-60 focus-visible:opacity-60">
              {item.label}
            </a>
          ))}
        </nav>
        <Link href="/account" className="text-sm transition-opacity hover:opacity-60 focus-visible:opacity-60">
          Account
        </Link>
      </div>
    </header>
  );
}
