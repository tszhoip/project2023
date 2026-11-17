import { isBuyable, type FontDef } from "@/lib/fonts";

type Props = {
  font: FontDef;
  /** "sm" is the quick-buy pill used on catalog blocks; it inherits the block's colours. */
  size?: "lg" | "sm";
  className?: string;
};

export function CtaButton({ font, size = "lg", className = "" }: Props) {
  if (!isBuyable(font)) {
    return (
      <span
        className={`inline-flex items-center rounded-full border border-current/40 opacity-70 ${
          size === "sm" ? "px-4 py-1.5 text-sm" : "px-7 py-4 text-base"
        } ${className}`}
      >
        In progress
      </span>
    );
  }

  return (
    <form action="/api/checkout" method="POST" className={className}>
      <input type="hidden" name="font" value={font.slug} />
      {size === "sm" ? (
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-(--block-fg) px-4 py-1.5 text-sm font-semibold text-(--block-bg) transition hover:opacity-80 active:scale-[0.98]"
        >
          Quick buy — ${font.priceUsd}
        </button>
      ) : (
        <button
          type="submit"
          className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-[#0b0b0c] transition hover:brightness-110 active:scale-[0.98]"
        >
          Get this font — ${font.priceUsd}
        </button>
      )}
    </form>
  );
}
