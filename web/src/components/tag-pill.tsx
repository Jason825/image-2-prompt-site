type TagPillProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function TagPill({ label, active = false, onClick }: TagPillProps) {
  const className = [
    "inline-flex items-center rounded-full border px-3 py-1 text-sm transition",
    active
      ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand-deep)]"
      : "border-[var(--color-line)] bg-white/70 text-[var(--color-muted)]",
    onClick ? "cursor-pointer hover:border-[var(--color-brand)]" : "",
  ].join(" ");

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {label}
      </button>
    );
  }

  return <span className={className}>{label}</span>;
}
