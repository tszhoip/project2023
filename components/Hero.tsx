import { FONT } from "@/lib/font";
import { CtaButton } from "./CtaButton";

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="mb-6 text-sm text-muted">
          {FONT.designer} · {FONT.license}
        </p>
        <h1 className="font-air-black text-[18vw] leading-[0.82] tracking-tight md:text-[11rem]">
          {FONT.name}
        </h1>
        <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-muted">{FONT.tagline}</p>
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
