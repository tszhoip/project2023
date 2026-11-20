export type FontWeight = {
  name: string;
  cssWeight: number;
  /** Family name customers get in the embed snippet. */
  fontFamily: string;
  /** CSS value that selects this weight on our own pages (a next/font variable). */
  cssFamily: string;
  woff2: string;
};

export type UsageImage = { src: string; title: string; alt: string };
export type UsageGroup = { name: string; images: UsageImage[] };

export type FontDef = {
  slug: string;
  name: string;
  tagline: string;
  designer: string;
  /** "available" fonts can be bought; "in-progress" ones are shown but not sold. */
  status: "available" | "in-progress";
  priceUsd: number;
  updatedAt: string;
  license: string;
  formats: readonly string[];
  weights: readonly FontWeight[];
  /** Default text shown in the catalog block, before anyone edits it. */
  previewText: string;
  /** Display size (px) on the home-page block at desktop width; scales down with the viewport. */
  homeSize: number;
  /** Lowercase keys render the same capital forms. */
  uppercaseOnly: boolean;
  story: readonly string[];
  specimen: { uppercase: string; numerals: string; punctuation: string };
  /** Every distinct character the font draws, in display order. */
  glyphs: readonly string[];
  /** Numbered 01.1 / 01.1.1 in the gallery index, in this order. Empty = no gallery. */
  usageGroups: readonly UsageGroup[];
};
