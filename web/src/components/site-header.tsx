"use client";

import Image from "next/image";
import { SearchBar } from "@/components/search-bar";

type SiteHeaderProps = {
  keyword?: string;
  onKeywordChange?: (value: string) => void;
};

export function SiteHeader({
  keyword = "",
  onKeywordChange,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-[rgba(247,247,243,0.78)] backdrop-blur-xl">
      <div className="page-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex shrink-0 items-center gap-3">
          <div className="overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(22,42,38,0.08)]">
            <Image
              src="/logo-mark.svg"
              alt="ImagePromptive logo"
              width={44}
              height={44}
              priority
            />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">ImagePromptive</p>
            <p className="text-sm text-[var(--color-muted)]">
              提供高质量 Image 2.0 提示词，助你快速找到创作灵感
            </p>
          </div>
        </div>

        <div className="w-full lg:max-w-md">
          <SearchBar
            placeholder="搜索提示词或图片内容..."
            value={keyword}
            onChange={onKeywordChange}
          />
        </div>

      </div>
    </header>
  );
}
