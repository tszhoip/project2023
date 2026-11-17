"use client";

import Link from "next/link";
import { useState } from "react";
import type { FontDef } from "@/lib/fonts";
import { ColorControls } from "./ColorControls";
import { CtaButton } from "./CtaButton";

type Props = {
  font: FontDef;
  text: string;
  onTextChange: (text: string) => void;
};

export function FontBlock({ font, text, onTextChange }: Props) {
  const [weightName, setWeightName] = useState(font.weights[0].name);
  const [size, setSize] = useState(96);
  const [background, setBackground] = useState("#ffffff");
  const [foreground, setForeground] = useState("#000000");

  const weight = font.weights.find((w) => w.name === weightName) ?? font.weights[0];

  return (
    <section
      id={font.slug}
      className="border-b border-border"
      style={
        {
          background,
          color: foreground,
          "--block-bg": background,
          "--block-fg": foreground,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span
            className="rounded-full border border-current/40 px-4 py-1.5"
            style={{ fontFamily: weight.cssFamily }}
          >
            {font.name}
          </span>

          {font.weights.length > 1 ? (
            <select
              value={weightName}
              onChange={(e) => setWeightName(e.target.value)}
              aria-label={`${font.name} weight`}
              className="rounded-full border border-current/40 bg-transparent px-3 py-1.5"
            >
              {font.weights.map((w) => (
                <option key={w.name} value={w.name} className="text-black">
                  {w.name}
                </option>
              ))}
            </select>
          ) : (
            <span className="opacity-60">{weight.name}</span>
          )}

          <label className="flex items-center gap-3">
            <span className="opacity-60">Size</span>
            <input
              type="range"
              min={24}
              max={240}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              aria-label={`${font.name} size`}
              className="accent-current"
            />
            <span className="w-12 tabular-nums opacity-60">{size}px</span>
          </label>

          <ColorControls
            className="md:ml-auto"
            background={background}
            foreground={foreground}
            onBackground={setBackground}
            onForeground={setForeground}
          />
        </div>

        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          spellCheck={false}
          aria-label={`Test text for ${font.name}`}
          // Phones cap the size by screen width so words stay whole; md+ uses the slider as-is.
          className="mt-8 block min-h-[2.4em] w-full resize-none overflow-hidden bg-transparent text-[length:min(var(--fs),15vw)] text-inherit outline-none field-sizing-content md:text-[length:var(--fs)]"
          style={
            {
              fontFamily: weight.cssFamily,
              "--fs": `${size}px`,
              lineHeight: 1.02,
            } as React.CSSProperties
          }
        />

        <div className="mt-8 flex items-center justify-between gap-4 text-sm">
          <Link
            href={`/fonts/${font.slug}`}
            className="underline underline-offset-4 transition hover:opacity-70"
          >
            Learn details →
          </Link>
          <CtaButton font={font} size="sm" />
        </div>
      </div>
    </section>
  );
}
