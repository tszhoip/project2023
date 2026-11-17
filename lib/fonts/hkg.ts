import type { FontDef } from "./types";

// Filler entry while HKG is being drawn: visible in the catalog, not for sale.
export const HKG: FontDef = {
  slug: "hkg",
  name: "HKG",
  tagline: "Work in progress. A second face in the family tree, still being drawn.",
  designer: "MHZ Design Office",
  status: "in-progress",
  priceUsd: 30,
  updatedAt: "2026-11-16",
  license: "Web license (domain-locked)",
  formats: ["WOFF2"],
  weights: [
    {
      name: "Bold",
      cssWeight: 700,
      fontFamily: "HKG Bold",
      cssFamily: "var(--hkg-bold-font)",
      woff2: "/fonts/HKG-Bold.woff2",
    },
  ],
  previewText: "Now boarding",
  uppercaseOnly: true,
  story: [
    "HKG is an unfinished draft. Only the capitals are drawn so far; numerals and punctuation are still empty placeholders, and everything else is on the bench.",
    "It's listed here so the catalog has more than one face to browse. Letterforms and spacing will change before release.",
  ],
  specimen: {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numerals: "",
    punctuation: "",
  },
  // Digits, comma, hyphen and period are in the cmap but have no outlines yet.
  glyphs: Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
  usageGroups: [],
};
