"use client";

import { useState } from "react";
import { trackPromptEvent } from "@/lib/track-prompt-event";

type CopyButtonProps = {
  text: string;
  label: string;
  copiedLabel?: string;
  variant?: "primary" | "secondary";
  promptSlug?: string;
};

function fallbackCopyText(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const success = document.execCommand("copy");
  document.body.removeChild(textarea);

  return success;
}

export function CopyButton({
  text,
  label,
  copiedLabel = "已复制",
  variant = "primary",
  promptSlug,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (window.isSecureContext && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const success = fallbackCopyText(text);

        if (!success) {
          throw new Error("copy failed");
        }
      }

      if (promptSlug) {
        void trackPromptEvent({ slug: promptSlug, eventType: "copy" });
      }

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
