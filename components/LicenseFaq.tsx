import { licenseFaq, type FontDef } from "@/lib/fonts";
import { CtaButton } from "./CtaButton";

export function LicenseFaq({ font }: { font: FontDef }) {
  return (
    <section id="license" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-sm uppercase tracking-wide text-muted">License &amp; FAQ</h2>
            <p className="mt-4 text-sm text-muted">
              {font.license} · ${font.priceUsd} flat, forever. No version tiers, no renewals.
            </p>
            <CtaButton font={font} className="mt-6" />
          </div>
          <dl className="divide-y divide-border">
            {licenseFaq(font).map((item) => (
              <div key={item.q} className="py-5 first:pt-0">
                <dt className="font-medium">{item.q}</dt>
                <dd className="mt-2 text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
