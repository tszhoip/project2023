import type { FontDef } from "@/lib/fonts";
import { CtaButton } from "./CtaButton";

export function Hero({ font }: { font: FontDef }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="mb-6 text-sm text-muted">
          {font.designer} · {font.license}
        </p>
        <h1
          className="text-[18vw] leading-[0.82] tracking-tight md:text-[11rem]"
          style={{ fontFamily: font.weights[0].cssFamily }}
        >
          {font.name}
        </h1>
        <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-muted">{font.tagline}</p>
          <CtaButton font={font} />
        </div>
      </div>
    </section>
  );
}
