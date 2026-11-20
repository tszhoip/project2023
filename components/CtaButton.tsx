import { isBuyable, type FontDef } from "@/lib/fonts";

type Props = {
  font: FontDef;
  /** "sm" is the compact size used on catalog blocks. */
  size?: "lg" | "sm";
  className?: string;
};

export function CtaButton({ font, size = "lg", className = "" }: Props) {
  if (!isBuyable(font)) {
    return (
      <span
        className={`inline-flex items-center border border-current/40 opacity-70 ${
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
      <button
        type="submit"
        className="inline-flex items-center gap-3 bg-accent px-7 py-4 text-base font-semibold text-[#0b0b0c] transition hover:brightness-110 active:scale-[0.98]"
      >
        Get this font — ${font.priceUsd}
      </button>
    </form>
  );
}
