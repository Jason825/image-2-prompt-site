"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MasonryGrid } from "@/components/masonry-grid";
import { PromptCard } from "@/components/prompt-card";
import type { PromptItem } from "@/data/site-data";
import type { PromptStatRow } from "@/lib/prompt-stats";

type HomeFeaturedPromptsProps = {
  prompts: PromptItem[];
};

export function HomeFeaturedPrompts({ prompts }: HomeFeaturedPromptsProps) {
  const [statsMap, setStatsMap] = useState<Record<string, PromptStatRow>>({});

  const loadStats = useCallback(async () => {
    try {
      const response = await fetch("/api/prompt-stats", {
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as {
        items?: PromptStatRow[];
      };

      if (!payload.items) {
        return;
      }

      const nextMap = payload.items.reduce<Record<string, PromptStatRow>>((acc, item) => {
        acc[item.slug] = item;
        return acc;
      }, {});

      setStatsMap(nextMap);
    } catch {
      // Keep fallback ordering when stats are unavailable.
    }
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      void loadStats();
    }, 0);

    const handleFocus = () => {
      void loadStats();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void loadStats();
      }
    };

    const handlePageShow = () => {
      void loadStats();
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loadStats]);

  const featuredPrompts = useMemo(() => {
    return [...prompts]
      .sort((a, b) => {
        const scoreDiff =
          (statsMap[b.slug]?.score ?? b.popularityScore ?? 0) -
          (statsMap[a.slug]?.score ?? a.popularityScore ?? 0);

        if (scoreDiff !== 0) {
          return scoreDiff;
        }

        return (
          prompts.findIndex((item) => item.slug === a.slug) -
          prompts.findIndex((item) => item.slug === b.slug)
        );
      })
      .slice(0, 6);
  }, [prompts, statsMap]);

  return (
    <MasonryGrid>
      {featuredPrompts.map((item) => (
        <PromptCard key={item.slug} item={item} />
      ))}
    </MasonryGrid>
  );
}
