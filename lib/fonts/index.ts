import { AIR } from "./air";
import { HKG } from "./hkg";
import { N1_MONO } from "./n1-mono";
import type { FontDef } from "./types";

export type { FontDef, FontWeight } from "./types";

/** Catalog order = order of the blocks on the home page. */
export const FONTS: readonly FontDef[] = [AIR, HKG, N1_MONO];

export function getFont(slug: string): FontDef | undefined {
  return FONTS.find((font) => font.slug === slug);
}

export function isBuyable(font: FontDef): boolean {
  return font.status === "available";
}

export function licenseFaq(font: FontDef) {
  return [
    {
      q: "What does the license cover?",
      a: `A single web license per purchase: unlimited pages on the domains you register, for as long as you own the license. It covers embedding ${font.name} via @font-face on your site — not app UI kits, print, broadcast, or products for resale.`,
    },
    {
      q: "Is it domain-locked?",
      a: `Yes. You register the domain(s) you're using ${font.name} on from your account. Serving the font from an unregistered domain won't work — add the new domain from your dashboard first.`,
    },
    {
      q: "What happens when the font is updated?",
      a: `Every future update to ${font.name} — new weights, hinting fixes, character set additions — is included at no extra cost. One purchase, one price, forever.`,
    },
    {
      q: "Can I use it on client projects?",
      a: "Yes, for a single client site per license. If you're licensing on behalf of a client, register their domain(s), not yours.",
    },
    {
      q: "Can I resell or redistribute the font files?",
      a: "No. The license is non-transferable and non-sublicensable. You can't resell, redistribute, or bundle the raw font files, on their own or inside a template/theme.",
    },
    {
      q: "Do I need to give credit?",
      a: `Not required, but genuinely appreciated — a small “type: ${font.name} by ${font.designer}” in your site footer or credits page goes a long way.`,
    },
  ];
}
