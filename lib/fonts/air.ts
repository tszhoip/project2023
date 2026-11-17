import type { FontDef } from "./types";

export const AIR: FontDef = {
  slug: "air",
  name: "AIR™",
  tagline: "A stencil-cut display face built for signage, not sentences.",
  designer: "MHZ Design Office",
  status: "available",
  priceUsd: 30,
  updatedAt: "2026-11-15",
  license: "Web license (domain-locked)",
  formats: ["WOFF2"],
  weights: [
    {
      name: "Black",
      cssWeight: 900,
      fontFamily: "Air Black",
      cssFamily: "var(--air-black-font)",
      woff2: "/fonts/Air-Black.woff2",
    },
    {
      name: "Bold",
      cssWeight: 700,
      fontFamily: "Air Bold",
      cssFamily: "var(--air-bold-font)",
      woff2: "/fonts/Air-Bold.woff2",
    },
  ],
  previewText: "Now boarding",
  uppercaseOnly: true,
  story: [
    "AIR™ started as a set of departure-board letterforms, cut at the corners like they'd been stamped through a stencil rather than drawn. Every diagonal terminates in a hard chamfer, the same angle repeated at every scale, so the face reads the same on a hotel room key as it does across the side of a jet.",
    "MHZ Design Office built it for the kind of type that has to survive being small, rotated, backlit, or printed on carbon fiber — gate numbers, tour dates, box logos. It has one job: to look assembled out of sheet metal, not typed.",
    "This release ships two cuts, Bold and Black. AIR™ is uppercase-only by design — lowercase keys render the same capital forms, so there's no soft register to accidentally fall back on.",
  ],
  specimen: {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numerals: "0123456789",
    punctuation: "!?&@#$%()[]{}<>+-:/ °· ™",
  },
  glyphs: Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&()*+-./:<>?@[]^_{}~°·™"),
  usageGroups: [
    {
      name: "Identity",
      images: [
        { src: "/images/usage/usage-1.jpg", title: "Wordmark lockup", alt: "AIR™ wordmark lockup on black" },
        { src: "/images/usage/usage-4.jpg", title: "Fashion wordmarks", alt: "Grid of fashion house wordmarks reset in AIR™" },
        { src: "/images/usage/usage-6.jpg", title: "Badge lockup", alt: "Circular badge logo lockup in AIR™" },
      ],
    },
    {
      name: "Signage",
      images: [
        { src: "/images/usage/usage-3.jpg", title: "Airport codes", alt: "Airport code signage set in AIR™ Black on navy" },
        { src: "/images/usage/usage-7.jpg", title: "Hotel signage", alt: "Rotated hotel signage card in AIR™" },
      ],
    },
    {
      name: "Print",
      images: [
        { src: "/images/usage/usage-2.jpg", title: "Oversized specimen", alt: "Oversized type specimen in AIR™ Black" },
        { src: "/images/usage/usage-5.jpg", title: "Itinerary card", alt: "Travel itinerary card set in AIR™" },
      ],
    },
  ],
};
