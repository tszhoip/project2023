import type { FontDef } from "@/lib/fonts";

export function Story({ font }: { font: FontDef }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2
            className="text-sm uppercase tracking-wide text-muted"
            style={{ fontFamily: font.weights[font.weights.length - 1].cssFamily }}
          >
            About the face
          </h2>
          <div className="space-y-5 text-lg leading-relaxed md:text-xl">
            {font.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
