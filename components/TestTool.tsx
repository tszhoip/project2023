"use client";

import { useState } from "react";
import { FONT } from "@/lib/font";

const DEFAULT_TEXT = "STENCILED FOR SIGNAGE";

const ALIGNMENTS = ["left", "center", "right", "justify"] as const;
type Alignment = (typeof ALIGNMENTS)[number];

const weightClass: Record<string, string> = {
  Black: "font-air-black",
  Bold: "font-air-bold",
};

export function TestTool() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [size, setSize] = useState(72);
  const [tracking, setTracking] = useState(0);
  const [leading, setLeading] = useState(1.05);
  const [alignment, setAlignment] = useState<Alignment>("left");
  const [weight, setWeight] = useState<(typeof FONT.weights)[number]["name"]>(
    FONT.weights[0].name
  );
  const [inverted, setInverted] = useState(false);

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
                className={`rounded-full border px-3 py-1 capitalize transition ${
                  alignment === a
                    ? "border-accent text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted">Weight</span>
            {FONT.weights.map((w) => (
              <button
                key={w.name}
                onClick={() => setWeight(w.name)}
                className={`rounded-full border px-3 py-1 transition ${
                  weight === w.name
                    ? "border-accent text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {w.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setInverted((v) => !v)}
            className="ml-auto rounded-full border border-border px-3 py-1 text-muted transition hover:text-foreground"
          >
            {inverted ? "Light on dark" : "Dark on light"}
          </button>
        </div>

        <div
          className="mt-8 rounded-lg border border-border p-6 md:p-10"
          style={{
            background: inverted ? "#0b0b0c" : "#f2f2f0",
            color: inverted ? "#f2f2f0" : "#0b0b0c",
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            spellCheck={false}
            className={`${weightClass[weight]} w-full resize-y bg-transparent outline-none`}
            style={{
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
