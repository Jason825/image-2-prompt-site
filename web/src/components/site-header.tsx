"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavLink } from "@/components/nav-link";
import { SearchBar } from "@/components/search-bar";
import { navItems } from "@/data/site-data";

type SiteHeaderProps = {
  keyword?: string;
  onKeywordChange?: (value: string) => void;
};

export function SiteHeader({
  keyword = "",
  onKeywordChange,
}: SiteHeaderProps) {
  const router = useRouter();
  const [localKeyword, setLocalKeyword] = useState(keyword);

  const submitSearch = () => {
    const value = localKeyword.trim();

    if (!value) {
      router.push("/explore");
      return;
    }

    router.push(`/explore?q=${encodeURIComponent(value)}`);
  };

  const handleKeywordChange = (value: string) => {
    setLocalKeyword(value);
    onKeywordChange?.(value);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-[rgba(247,247,243,0.78)] backdrop-blur-xl">
      <div className="page-shell flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-3">
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
                精选 Image 2.0 提示词与案例，帮你更快找到可复用的视觉方向。
              </p>
            </div>
          </Link>

          <div className="w-full lg:max-w-md">
            <SearchBar
              placeholder="搜索提示词、风格、用途或案例..."
              value={localKeyword}
              onChange={handleKeywordChange}
              onSubmit={submitSearch}
            />
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
      </div>
    </header>
  );
}
