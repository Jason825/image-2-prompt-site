"use client";

import { useEffect, useMemo, useState } from "react";
import { PromptCard } from "@/components/prompt-card";
import type { PromptItem } from "@/data/site-data";

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

export function FavoritesView({ prompts }: { prompts: PromptItem[] }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    sync();
    window.addEventListener("favorites:changed", sync as EventListener);
    return () => {
      window.removeEventListener("favorites:changed", sync as EventListener);
    };
  }, []);

  const items = useMemo(
    () => prompts.filter((item) => favorites.includes(item.slug)),
    [favorites, prompts],
  );

  if (items.length === 0) {
    return (
      <div className="soft-panel rounded-[28px] px-6 py-10 text-center text-[var(--color-muted)]">
        你还没有收藏任何案例。看到喜欢的提示词时，点一下卡片右上角的心形按钮即可加入收藏。
      </div>
    );
  }

  return (
    <div className="masonry-grid">
      {items.map((item) => (
        <PromptCard key={item.slug} item={item} showView />
      ))}
    </div>
  );
}
