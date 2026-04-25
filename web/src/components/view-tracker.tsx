"use client";

import { useEffect } from "react";
import type { PromptItem } from "@/data/site-data";
import { trackPromptEvent } from "@/lib/track-prompt-event";

const STORAGE_KEY = "imagepromptive-recent-views";
const VIEW_TRACK_KEY = "imagepromptive-tracked-view-times";
const VIEW_TRACK_COOLDOWN_MS = 60 * 1000;

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

    try {
      const raw = window.localStorage.getItem(VIEW_TRACK_KEY);
      const tracked = raw ? (JSON.parse(raw) as Record<string, number>) : {};
      const now = Date.now();
      const lastTrackedAt = tracked[prompt.slug] ?? 0;

      if (now - lastTrackedAt < VIEW_TRACK_COOLDOWN_MS) {
        return;
      }

      window.localStorage.setItem(
        VIEW_TRACK_KEY,
        JSON.stringify({
          ...tracked,
          [prompt.slug]: now,
        }),
      );
      void trackPromptEvent({ slug: prompt.slug, eventType: "view" });
    } catch {
      void trackPromptEvent({ slug: prompt.slug, eventType: "view" });
    }
  }, [prompt]);

  return null;
}
