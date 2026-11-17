import type { FontDef } from "@/lib/fonts";

export function Specimen({ font }: { font: FontDef }) {
  return (
    <section id="specimen" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-sm uppercase tracking-wide text-muted">Specimen</h2>
          <ul className="flex gap-4 text-sm text-muted">
            {font.weights.map((w) => (
              <li key={w.name} className="rounded-full border border-border px-3 py-1">
                {w.name} · {w.cssWeight}
              </li>
            ))}
          </ul>
        </div>
        {font.uppercaseOnly && (
          <p className="mb-10 text-sm text-muted">
            Uppercase-only — lowercase keystrokes render the same capital forms.
          </p>
        )}

        <div className="space-y-16">
          {font.weights.map((w) => (
            <div key={w.name}>
              <p className="mb-4 text-xs uppercase tracking-wide text-muted">{w.name}</p>
              <p
                className="break-words text-[8vw] leading-[1.02] md:text-5xl"
                style={{ fontFamily: w.cssFamily }}
              >
                {font.specimen.uppercase}
              </p>
              {(font.specimen.numerals || font.specimen.punctuation) && (
                <p
                  className="mt-2 break-words text-[8vw] leading-[1.02] md:text-5xl"
                  style={{ fontFamily: w.cssFamily }}
                >
                  {font.specimen.numerals} {font.specimen.punctuation}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
