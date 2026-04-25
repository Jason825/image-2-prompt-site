"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PromptCard } from "@/components/prompt-card";
import { SearchBar } from "@/components/search-bar";
import type { PromptItem } from "@/data/site-data";
import type { PromptStatRow } from "@/lib/prompt-stats";

type SortKey = "popular" | "latest" | "title";

type PromptBrowserProps = {
  prompts: PromptItem[];
  filters: string[];
  mode: "home" | "explore";
  showSearch?: boolean;
  initialKeyword?: string;
};

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "最热门" },
  { value: "latest", label: "最新加入" },
  { value: "title", label: "名称排序" },
];

export function PromptBrowser({
  prompts,
  filters,
  mode,
  showSearch = true,
  initialKeyword = "",
}: PromptBrowserProps) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [activeFilter, setActiveFilter] = useState(filters[0] ?? "全部");
  const [sortBy, setSortBy] = useState<SortKey>("popular");
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
        enabled?: boolean;
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
      // Keep fallback sorting when stats are unavailable.
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

  const filteredPrompts = useMemo(() => {
    const search = keyword.trim().toLowerCase();

    const items = prompts.filter((item) => {
      const matchesFilter = activeFilter === "全部" || item.category === activeFilter;

      const haystack = [
        item.title,
        item.category,
        item.description,
        item.useCase,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = search.length === 0 || haystack.includes(search);

      return matchesFilter && matchesSearch;
    });

    if (sortBy === "latest") {
      return [...items].reverse();
    }

    if (sortBy === "title") {
      return [...items].sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
    }

    return [...items].sort((a, b) => {
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
    });
  }, [activeFilter, keyword, prompts, sortBy, statsMap]);

  return (
    <>
      {showSearch ? (
        <div className={mode === "home" ? "mx-auto max-w-2xl" : "max-w-3xl"}>
          <SearchBar
            placeholder="搜索提示词、风格、场景..."
            value={keyword}
            onChange={setKeyword}
          />
        </div>
      ) : null}

      <div className={`${showSearch ? "mt-5" : ""} flex flex-wrap gap-3`}>
        {filters.map((filter) => {
          const active = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={[
                "rounded-full border px-4 py-2 text-sm transition",
                active
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand-deep)]"
                  : "border-[var(--color-line)] bg-white/70 text-[var(--color-muted)] hover:border-[var(--color-brand)]",
              ].join(" ")}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {mode === "explore" ? (
        <div className="mt-8 flex flex-col gap-4 text-sm text-[var(--color-muted)] lg:flex-row lg:items-center lg:justify-between">
          <span>{filteredPrompts.length} 个精选案例</span>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span>
              {activeFilter === "全部" ? "当前分类：全部" : `当前分类：${activeFilter}`}
            </span>

            <div className="soft-panel inline-flex w-fit flex-wrap gap-2 rounded-full p-1">
              {sortOptions.map((option) => {
                const active = option.value === sortBy;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortBy(option.value)}
                    className={[
                      "rounded-full px-4 py-2 text-sm transition",
                      active
                        ? "bg-[var(--color-brand)] text-white shadow-[0_8px_20px_rgba(31,138,112,0.18)]"
                        : "text-[var(--color-muted)] hover:bg-white/80 hover:text-[var(--color-ink)]",
                    ].join(" ")}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className={`masonry-grid ${mode === "home" ? "mt-10" : "mt-6"}`}>
        {filteredPrompts.map((item) => (
          <PromptCard key={item.slug} item={item} />
        ))}
      </div>

      {filteredPrompts.length === 0 ? (
        <div className="soft-panel mt-6 rounded-[24px] px-6 py-8 text-center text-sm text-[var(--color-muted)]">
          没有找到符合条件的案例，试试换个关键词或分类。
        </div>
      ) : null}
    </>
  );
}
