"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { FontDef } from "@/lib/fonts";

const SWIPE_PX = 40;

export function UsageGallery({ font }: { font: FontDef }) {
  // Flatten the groups into one ordered slide list, numbering each entry
  // "01.<group>.<item>" so the text index and the slider stay in sync.
  const { groups, slides } = useMemo(() => {
    const groups = font.usageGroups.map((group, g) => ({
      id: `01.${g + 1}`,
      name: group.name,
      images: group.images,
    }));
    const slides = groups.flatMap((group, g) =>
      group.images.map((image, i) => ({ ...image, id: `01.${g + 1}.${i + 1}`, group: group.name }))
    );
    return { groups, slides };
  }, [font]);

  const [index, setIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  if (slides.length === 0) return null;
  const current = slides[index];

  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  }

  function onPointerUp(e: React.PointerEvent) {
    if (pointerStartX.current === null) return;
    const dx = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
  }

  return (
    <section id="usage" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-sm uppercase tracking-wide text-muted">In use</h2>

        <div className="grid gap-6 lg:grid-cols-[5.5rem_minmax(0,1fr)_15rem]">
          {/* Thumbnails */}
          <ul
            className="order-2 flex gap-2 overflow-x-auto lg:order-none lg:flex-col lg:overflow-visible"
            aria-label="Thumbnails"
          >
            {slides.map((slide, i) => (
              <li key={slide.src} className="w-24 shrink-0 lg:w-full">
                <button
                  onClick={() => setIndex(i)}
                  aria-label={`${slide.id} ${slide.title}`}
                  aria-current={i === index}
                  className={`block w-full overflow-hidden rounded-sm border transition ${
                    i === index
                      ? "border-accent"
                      : "border-border opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    width={176}
                    height={88}
                    sizes="96px"
                    className="aspect-[2/1] w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Slider */}
          <div className="order-1 min-w-0 lg:order-none">
            <div className="mb-3 flex items-baseline justify-between gap-4 text-sm">
              <p aria-live="polite" className="flex gap-4">
                <span className="font-mono text-muted">{current.id}</span>
                <span>{current.title}</span>
              </p>
              <span className="font-mono tabular-nums text-muted">
                {index + 1} / {slides.length}
              </span>
            </div>

            <div
              tabIndex={0}
              role="group"
              aria-roledescription="carousel"
              aria-label={`${font.name} in use`}
              onKeyDown={onKeyDown}
              onPointerDown={(e) => (pointerStartX.current = e.clientX)}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (pointerStartX.current = null)}
              className="relative touch-pan-y select-none overflow-hidden rounded-lg border border-border outline-none focus-visible:border-accent"
            >
              <div
                className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((slide, i) => (
                  <div
                    key={slide.src}
                    className="relative aspect-[2/1] w-full shrink-0"
                    aria-hidden={i !== index}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      loading="eager"
                      draggable={false}
                      sizes="(min-width: 1024px) 800px, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex gap-6 text-sm text-muted">
              <button onClick={() => go(index - 1)} className="transition hover:text-foreground">
                ← Prev
              </button>
              <button onClick={() => go(index + 1)} className="transition hover:text-foreground">
                Next →
              </button>
            </div>
          </div>

          {/* Text index */}
          <nav aria-label="Index" className="order-3 text-sm lg:order-none">
            <ul className="space-y-5">
              {groups.map((group) => (
                <li key={group.id}>
                  <p className="mb-1.5 flex gap-3">
                    <span className="w-8 font-mono text-muted">{group.id}</span>
                    <span>{group.name}</span>
                  </p>
                  <ul>
                    {slides
                      .map((slide, i) => ({ slide, i }))
                      .filter(({ slide }) => slide.group === group.name)
                      .map(({ slide, i }) => (
                        <li key={slide.id}>
                          <button
                            onClick={() => setIndex(i)}
                            aria-current={i === index}
                            className={`flex w-full gap-3 py-0.5 text-left transition ${
                              i === index ? "text-accent" : "text-muted hover:text-foreground"
                            }`}
                          >
                            <span className="w-14 shrink-0 font-mono">{slide.id}</span>
                            <span>{slide.title}</span>
                          </button>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
