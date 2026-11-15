export const FONT = {
  slug: "air",
  name: "AIR™",
  tagline: "A stencil-cut display face built for signage, not sentences.",
  designer: "MHZ Design Office",
  priceUsd: 30,
  updatedAt: "2026-07-20",
  license: "Web license (domain-locked)",
  formats: ["WOFF2", "WOFF", "TTF"] as const,
  weights: [
    {
      name: "Black",
      cssWeight: 900,
      fontFamily: "Air Black",
      woff2: "/fonts/Air-Black.woff2",
      ttf: "/fonts/Air-Black.ttf",
    },
    {
      name: "Bold",
      cssWeight: 700,
      fontFamily: "Air Bold",
      woff2: "/fonts/Air-Bold.woff2",
      ttf: "/fonts/Air-Bold.ttf",
    },
  ],
  story: [
    "AIR™ started as a set of departure-board letterforms, cut at the corners like they'd been stamped through a stencil rather than drawn. Every diagonal terminates in a hard chamfer, the same angle repeated at every scale, so the face reads the same on a hotel room key as it does across the side of a jet.",
    "MHZ Design Office built it for the kind of type that has to survive being small, rotated, backlit, or printed on carbon fiber — gate numbers, tour dates, box logos. It has one job: to look assembled out of sheet metal, not typed.",
    "This release ships two cuts, Bold and Black. AIR™ is uppercase-only by design — lowercase keys render the same capital forms, so there's no soft register to accidentally fall back on.",
  ],
  specimen: {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numerals: "0123456789",
    punctuation: "()*-./ °· ™",
  },
  usageImages: [
    { src: "/images/usage/usage-1.jpg", alt: "AIR™ wordmark lockup on black" },
    { src: "/images/usage/usage-3.jpg", alt: "Airport code signage set in AIR™ Black on navy" },
    { src: "/images/usage/usage-4.jpg", alt: "Grid of fashion house wordmarks reset in AIR™" },
    { src: "/images/usage/usage-2.jpg", alt: "Oversized type specimen in AIR™ Black" },
    { src: "/images/usage/usage-5.jpg", alt: "Travel itinerary card set in AIR™" },
    { src: "/images/usage/usage-6.jpg", alt: "Circular badge logo lockup in AIR™" },
    { src: "/images/usage/usage-7.jpg", alt: "Rotated hotel signage card in AIR™" },
  ],
  faq: [
    {
      q: "What does the license cover?",
      a: "A single web license per purchase: unlimited pages on the domains you register, for as long as you own the license. It covers embedding AIR™ via @font-face on your site — not app UI kits, print, broadcast, or products for resale.",
    },
    {
      q: "Is it domain-locked?",
      a: "Yes. You register the domain(s) you're using AIR™ on from your account. Serving the font from an unregistered domain won't work — add the new domain from your dashboard first.",
    },
    {
      q: "What happens when the font is updated?",
      a: "Every future update to AIR™ — new weights, hinting fixes, character set additions — is included at no extra cost. One purchase, one price, forever.",
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
      a: "Not required, but genuinely appreciated — a small “type: AIR™ by MHZ Design Office” in your site footer or credits page goes a long way.",
    },
  ],
} as const;

export type FontWeight = (typeof FONT.weights)[number];
