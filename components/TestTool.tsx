"use client";

import { useState } from "react";
import type { FontDef } from "@/lib/fonts";
import { ColorControls } from "./ColorControls";

const ALIGNMENTS = ["left", "center", "right", "justify"] as const;
type Alignment = (typeof ALIGNMENTS)[number];

export function TestTool({ font }: { font: FontDef }) {
  const [text, setText] = useState("STENCILED FOR SIGNAGE");
  const [size, setSize] = useState(72);
  const [tracking, setTracking] = useState(0);
  const [leading, setLeading] = useState(1.05);
  const [alignment, setAlignment] = useState<Alignment>("left");
  const [weightName, setWeightName] = useState(font.weights[0].name);
  const [background, setBackground] = useState("#ffffff");
  const [foreground, setForeground] = useState("#000000");

  const weight = font.weights.find((w) => w.name === weightName) ?? font.weights[0];

  return (
    <section id="test" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-sm uppercase tracking-wide text-muted">Test it live</h2>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 border-b border-border pb-6 text-sm">
          <label className="flex items-center gap-3">
            <span className="text-muted">Size</span>
            <input
              type="range"
              min={16}
              max={220}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <span className="w-10 tabular-nums text-muted">{size}px</span>
          </label>

          <label className="flex items-center gap-3">
            <span className="text-muted">Tracking</span>
            <input
              type="range"
              min={-0.05}
              max={0.3}
              step={0.005}
              value={tracking}
              onChange={(e) => setTracking(Number(e.target.value))}
            />
            <span className="w-12 tabular-nums text-muted">{tracking.toFixed(3)}em</span>
          </label>

          <label className="flex items-center gap-3">
            <span className="text-muted">Leading</span>
            <input
              type="range"
              min={0.8}
              max={1.6}
              step={0.01}
              value={leading}
              onChange={(e) => setLeading(Number(e.target.value))}
            />
            <span className="w-10 tabular-nums text-muted">{leading.toFixed(2)}</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-muted">Align</span>
            {ALIGNMENTS.map((a) => (
              <button
                key={a}
                onClick={() => setAlignment(a)}
                className={`border px-3 py-1 capitalize transition ${
                  alignment === a
                    ? "border-accent text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {font.weights.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-muted">Weight</span>
              {font.weights.map((w) => (
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
          )}

          <ColorControls
            className="md:ml-auto"
            background={background}
            foreground={foreground}
            onBackground={setBackground}
            onForeground={setForeground}
          />
        </div>

        <div
          className="mt-8 rounded-lg border border-border p-6 md:p-10"
          style={{ background, color: foreground }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            spellCheck={false}
            aria-label={`Test text for ${font.name}`}
            className="w-full resize-y bg-transparent text-inherit outline-none"
            style={{
              fontFamily: weight.cssFamily,
              fontSize: `${size}px`,
              letterSpacing: `${tracking}em`,
              lineHeight: leading,
              textAlign: alignment,
            }}
          />
        </div>
      </div>
    </section>
  );
}
