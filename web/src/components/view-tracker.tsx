"use client";

import { useEffect } from "react";
import type { PromptItem } from "@/data/site-data";

const STORAGE_KEY = "imagepromptive-recent-views";

type StoredView = {
  slug: string;
  title: string;
  imageSrc: string;
  category: string;
  viewedAt: string;
};

export function ViewTracker({ prompt }: { prompt: PromptItem }) {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as StoredView[]) : [];

      const next = [
        {
          slug: prompt.slug,
          title: prompt.title,
          imageSrc: prompt.imageSrc,
          category: prompt.category,
          viewedAt: new Date().toISOString(),
        },
        ...parsed.filter((item) => item.slug !== prompt.slug),
      ].slice(0, 8);

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("recent-views:changed", { detail: next }));
    } catch {
      // Ignore storage failures.
    }
  }, [prompt]);

  return null;
}
