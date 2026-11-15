import Link from "next/link";
import { FONT } from "@/lib/font";

const NAV = [
  { href: "#specimen", label: "Specimen" },
  { href: "#test", label: "Test" },
  { href: "#usage", label: "Usage" },
  { href: "#license", label: "License" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-air-black text-lg tracking-tight">
          {FONT.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <Link
          href="/account"
          className="text-sm text-muted transition hover:text-foreground"
        >
          Account
        </Link>
      </div>
    </header>
  );
}
