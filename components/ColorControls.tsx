"use client";

type Props = {
  background: string;
  foreground: string;
  onBackground: (value: string) => void;
  onForeground: (value: string) => void;
  className?: string;
};

function Swatch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2">
      <span className="opacity-60">{label}</span>
      <span
        className="size-4 rounded-full border border-current/40"
        style={{ background: value }}
        aria-hidden
      />
      <span className="font-mono text-xs uppercase tabular-nums">{value}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} colour`}
        className="sr-only"
      />
    </label>
  );
}

/** Two free-form colour pickers plus a swap button. Inherits the surrounding text colour. */
export function ColorControls({
  background,
  foreground,
  onBackground,
  onForeground,
  className = "",
}: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${className}`}>
      <Swatch label="BG" value={background} onChange={onBackground} />
      <Swatch label="Text" value={foreground} onChange={onForeground} />
      <button
        type="button"
        onClick={() => {
          onBackground(foreground);
          onForeground(background);
        }}
        className="rounded-full border border-current/40 px-3 py-1 text-xs transition hover:border-current"
      >
        Swap
      </button>
    </div>
  );
}
