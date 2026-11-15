import { FONT } from "@/lib/font";

export function CtaButton({ className = "" }: { className?: string }) {
  return (
    <form action="/api/checkout" method="POST" className={className}>
      <button
        type="submit"
        className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-[#0b0b0c] transition hover:brightness-110 active:scale-[0.98]"
      >
        Get this font — ${FONT.priceUsd}
      </button>
    </form>
  );
}
