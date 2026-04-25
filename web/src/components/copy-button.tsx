"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
  label: string;
  copiedLabel?: string;
  variant?: "primary" | "secondary";
};

export function CopyButton({
  text,
  label,
  copiedLabel = "已复制",
  variant = "primary",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const className =
    variant === "primary"
      ? "rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
      : "rounded-full border border-[var(--color-line)] bg-white/70 px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)]";

  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? copiedLabel : label}
    </button>
  );
}
