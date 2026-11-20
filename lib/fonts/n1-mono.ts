import type { FontDef } from "./types";

export const N1_MONO: FontDef = {
  slug: "n1-mono",
  name: "N1 MONO",
  tagline: "A monospaced face with a deep Latin set and kana, for code, tables and tickers.",
  designer: "MHZ Design Office",
  status: "available",
  priceUsd: 30,
  updatedAt: "2026-11-16",
  license: "Web license (domain-locked)",
  formats: ["WOFF2"],
  weights: [
    {
      name: "Regular",
      cssWeight: 400,
      fontFamily: "N1 MONO",
      cssFamily: "var(--n1-mono-regular-font)",
      woff2: "/fonts/N1-Mono-Regular.woff2",
    },
  ],
  previewText: "Now boarding",
  homeSize: 100,
  uppercaseOnly: false,
  story: [
    "N1 MONO is a fixed-width face: every character takes the same horizontal space, so columns, tables and tickers line up without any tricks.",
    "This release covers basic and extended Latin, currency signs, arrows and math symbols, plus Japanese hiragana and katakana. One weight, Regular, for now.",
  ],
  specimen: {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz",
    numerals: "0123456789",
    punctuation: "!?&@#$%()[]{}<>+-:/ °· ™€£¥",
  },
  glyphs: Array.from("!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§©«¬®°±²³¶·¹»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĒēęĚěĪīŌōŒœŪūŴŵŶŷŸǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜ;฿᙮ẀẁẂẃẄẅẞỲỳ–—‘’‚“”„†‡•…‰‹›⁄⁰⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉₤€₵₺₽₿™←↑→↓↔↕∂∅∏∑−√∞∫≈≠≤≥⌘⎆─▌▐▲▶▼◀◊●⤒⤓⥃⬑⮋、。「」ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゝゞァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽꀄ︙￦"),
  usageGroups: [],
};
