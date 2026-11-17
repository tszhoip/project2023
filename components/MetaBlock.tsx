import type { FontDef } from "@/lib/fonts";

export function MetaBlock({ font }: { font: FontDef }) {
  const items = [
    { label: "Designer", value: font.designer },
    { label: "Latest update", value: font.updatedAt },
    { label: "Formats", value: font.formats.join(", ") },
    { label: "Weights", value: font.weights.map((w) => w.name).join(", ") },
  ];

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs uppercase tracking-wide text-muted">{item.label}</p>
            <p className="mt-1 text-sm md:text-base">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
