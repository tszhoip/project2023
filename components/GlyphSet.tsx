"use client";

import { useState } from "react";
import type { FontDef } from "@/lib/fonts";

function codepoint(char: string) {
  return `U+${char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`;
}

export function GlyphSet({ font }: { font: FontDef }) {
  const [weightName, setWeightName] = useState(font.weights[0].name);
  const [selected, setSelected] = useState(font.glyphs[0]);

  const weight = font.weights.find((w) => w.name === weightName) ?? font.weights[0];

  return (
    <section id="glyphs" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-sm uppercase tracking-wide text-muted">Character set</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">{font.glyphs.length} glyphs</span>
            {font.weights.length > 1 &&
              font.weights.map((w) => (
                <button
                  key={w.name}
                  onClick={() => setWeightName(w.name)}
                  className={`border px-3 py-1 transition ${
                    weightName === w.name
                      ? "border-accent text-accent"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  {w.name}
                </button>
              ))}
          </div>
        </div>

        <div className="grid overflow-hidden rounded-lg bg-[#f2f2f0] text-[#0b0b0c] md:grid-cols-[minmax(0,1fr)_2fr]">
          <div className="flex min-h-64 flex-col justify-between border-b border-[#0b0b0c]/15 p-6 md:border-b-0 md:border-r md:p-8">
            <span className="text-xs uppercase tracking-wide text-[#0b0b0c]/55">
              {codepoint(selected)}
            </span>
            <span
              className="text-[min(40vw,12rem)] leading-none md:text-[12rem]"
              style={{ fontFamily: weight.cssFamily }}
              aria-hidden
            >
              {selected}
            </span>
          </div>

          <ul className="grid max-h-[34rem] grid-cols-6 overflow-y-auto sm:grid-cols-8 md:grid-cols-8">
            {font.glyphs.map((char) => (
              <li key={char} className="border-b border-r border-[#0b0b0c]/15">
                <button
                  onClick={() => setSelected(char)}
                  onMouseEnter={() => setSelected(char)}
                  aria-label={`Glyph ${char}`}
                  style={{ fontFamily: weight.cssFamily }}
                  className={`flex aspect-square w-full items-center justify-center text-3xl transition md:text-4xl ${
                    selected === char ? "bg-accent text-[#0b0b0c]" : "hover:bg-[#0b0b0c]/5"
                  }`}
                >
                  {char}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {font.uppercaseOnly && (
          <p className="mt-4 text-sm text-muted">
            Uppercase-only — lowercase keystrokes map to the capital forms.
          </p>
        )}
      </div>
    </section>
  );
}
