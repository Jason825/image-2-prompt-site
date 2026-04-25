"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "imagepromptive-favorites";

function readFavorites() {
  if (typeof window === "undefined") return [] as string[];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeFavorites(items: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("favorites:changed", { detail: items }));
}

export function FavoriteButton({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => {
      setActive(readFavorites().includes(slug));
    };

    sync();
    window.addEventListener("favorites:changed", sync as EventListener);
    return () => {
      window.removeEventListener("favorites:changed", sync as EventListener);
    };
  }, [slug]);

  const toggle = () => {
    const current = readFavorites();
    const next = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug];
    writeFavorites(next);
    setActive(next.includes(slug));
  };

  const className = compact
    ? "absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/82 text-lg shadow-[var(--shadow-card)] transition hover:scale-[1.03]"
    : "rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)]";

  return (
    <button type="button" onClick={toggle} className={className}>
      {compact ? (active ? "♥" : "♡") : active ? "已收藏" : "加入收藏"}
    </button>
  );
}
