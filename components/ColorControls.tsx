"use client";

type Props = {
  background: string;
  foreground: string;
  onBackground: (value: string) => void;
  onForeground: (value: string) => void;
  className?: string;
  /** Show the hex value next to each swatch. */
  showHex?: boolean;
};

function Swatch({
  label,
  value,
  onChange,
  showHex,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showHex: boolean;
}) {
  return (
    <label title={`${label} colour`} className="inline-flex cursor-pointer items-center gap-2 rounded-full has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2">
      <span
        className="size-6 rounded-full border border-current/40"
        style={{ background: value }}
        aria-hidden
      />
      {showHex && <span className="text-xs uppercase tabular-nums">{value}</span>}
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
  showHex = true,
}: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm ${className}`}>
      <Swatch label="BG" value={background} onChange={onBackground} showHex={showHex} />
      <button
        type="button"
        onClick={() => {
          onBackground(foreground);
          onForeground(background);
        }}
        aria-label="Swap background and text colours"
        title="Swap colours"
        className="flex size-6 items-center justify-center text-base leading-none outline-none transition hover:opacity-60 focus-visible:opacity-60"
      >
        ↔
      </button>
      <Swatch label="Text" value={foreground} onChange={onForeground} showHex={showHex} />
    </div>
  );
}
