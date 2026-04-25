type SearchBarProps = {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
};

export function SearchBar({
  placeholder,
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <div className="glass-panel flex items-center gap-3 rounded-[20px] px-4 py-3">
      <button
        type="button"
        onClick={onSubmit}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand-deep)] transition hover:bg-[var(--color-brand)] hover:text-white"
        aria-label="搜索"
      >
        <span className="text-base">⌕</span>
      </button>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit?.();
          }
        }}
        className="w-full bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]"
      />
    </div>
  );
}
