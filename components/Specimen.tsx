import { FONT } from "@/lib/font";

const weightClass: Record<string, string> = {
  Black: "font-air-black",
  Bold: "font-air-bold",
};

export function Specimen() {
  return (
    <section id="specimen" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-sm uppercase tracking-wide text-muted">Specimen</h2>
          <ul className="flex gap-4 text-sm text-muted">
            {FONT.weights.map((w) => (
              <li key={w.name} className="rounded-full border border-border px-3 py-1">
                {w.name} · {w.cssWeight}
              </li>
            ))}
          </ul>
        </div>
        <p className="mb-10 text-sm text-muted">
          Uppercase-only — lowercase keystrokes render the same capital forms.
        </p>

        <div className="space-y-16">
          {FONT.weights.map((w) => (
            <div key={w.name}>
              <p className="mb-4 text-xs uppercase tracking-wide text-muted">{w.name}</p>
              <p className={`${weightClass[w.name]} break-words text-[8vw] leading-[1.02] md:text-5xl`}>
                {FONT.specimen.uppercase}
              </p>
              <p className={`${weightClass[w.name]} mt-2 break-words text-[8vw] leading-[1.02] md:text-5xl`}>
                {FONT.specimen.numerals} {FONT.specimen.punctuation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
