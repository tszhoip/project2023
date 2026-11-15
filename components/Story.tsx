import { FONT } from "@/lib/font";

export function Story() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 className="font-air-bold text-sm uppercase tracking-wide text-muted">
            About the face
          </h2>
          <div className="space-y-5 text-lg leading-relaxed md:text-xl">
            {FONT.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
