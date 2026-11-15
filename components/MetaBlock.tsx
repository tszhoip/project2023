import { FONT } from "@/lib/font";

const ITEMS = [
  { label: "Designer", value: FONT.designer },
  { label: "Latest update", value: FONT.updatedAt },
  { label: "Formats", value: FONT.formats.join(", ") },
  { label: "Weights", value: FONT.weights.map((w) => w.name).join(", ") },
];

export function MetaBlock() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.label}>
            <p className="text-xs uppercase tracking-wide text-muted">{item.label}</p>
            <p className="mt-1 text-sm md:text-base">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
