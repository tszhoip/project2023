"use client";

import Link from "next/link";
import { useState } from "react";
import { isBuyable, type FontDef } from "@/lib/fonts";
import { ColorControls } from "./ColorControls";
import { CtaButton } from "./CtaButton";

type Props = {
  font: FontDef;
  text: string;
  onTextChange: (text: string) => void;
};

export function FontBlock({ font, text, onTextChange }: Props) {
  const [weightName, setWeightName] = useState(font.weights[0].name);
  const [background, setBackground] = useState("#ffffff");
  const [foreground, setForeground] = useState("#000000");

  const weight = font.weights.find((w) => w.name === weightName) ?? font.weights[0];

  return (
    <section
      id={font.slug}
      className="h-[clamp(400px,50svh,800px)] border-b border-border"
      style={
        {
          background,
          color: foreground,
          "--block-bg": background,
          "--block-fg": foreground,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col px-6 py-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {/* Name and weight are one control: the select sits invisibly over the label. */}
          <label
            className={`relative inline-block ${
              font.weights.length > 1
                ? "transition-opacity hover:opacity-60 has-[:focus-visible]:opacity-60"
                : ""
            }`}
          >
            <span>{font.name}</span> <span>{weight.name}</span>
            {font.weights.length > 1 && (
              <>
                <select
                  value={weightName}
                  onChange={(e) => setWeightName(e.target.value)}
                  aria-label={`${font.name} weight`}
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                >
                  {font.weights.map((w) => (
                    <option key={w.name} value={w.name} className="text-black">
                      {w.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </label>

          <ColorControls
            background={background}
            foreground={foreground}
            onBackground={setBackground}
            onForeground={setForeground}
            showHex={false}
          />

          <div className="ml-auto flex items-center gap-6">
            {!isBuyable(font) && <CtaButton font={font} size="sm" />}
            <Link
              href={`/fonts/${font.slug}`}
              aria-label={`Learn more about ${font.name}`}
              title="Learn more"
              className="flex size-6 items-center justify-center text-base leading-none transition-opacity hover:opacity-60 focus-visible:opacity-60"
            >
              →
            </Link>
          </div>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 items-center overflow-hidden">
          {/* One line only: anything wider than the card is simply cut off at the edge. */}
          <input
            type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            onBlur={(e) => {
              e.currentTarget.scrollLeft = 0;
            }}
            spellCheck={false}
            aria-label={`Test text for ${font.name}`}
            className="block w-full overflow-hidden whitespace-nowrap bg-transparent text-center text-[length:var(--fs)] text-inherit outline-none"
            style={
              {
                fontFamily: weight.cssFamily,
                // Fixed per-font size; below ~1200px wide it scales down so the default line still fits.
                "--fs": `min(${font.homeSize}px, ${(font.homeSize / 12).toFixed(2)}vw)`,
                // Tall enough for every font's own ascent + descent (N1 MONO needs 1.33), or the input scrolls vertically.
                lineHeight: 1.4,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </section>
  );
}
