"use client";

import { trackPromptEvent } from "@/lib/track-prompt-event";

type DownloadButtonProps = {
  href: string;
  slug: string;
  className?: string;
  label?: string;
};

export function DownloadButton({
  href,
  slug,
  className,
  label = "下载图片",
}: DownloadButtonProps) {
  return (
    <a
      href={href}
      download
      onClick={() => {
        void trackPromptEvent({ slug, eventType: "download" });
      }}
      className={
        className ??
        "rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)]"
      }
    >
      {label}
    </a>
  );
}
