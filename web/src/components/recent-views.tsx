"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "imagepromptive-recent-views";

type StoredView = {
  slug: string;
  title: string;
  imageSrc: string;
  category: string;
  viewedAt: string;
};

function readRecentViews() {
  if (typeof window === "undefined") return [] as StoredView[];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredView[]) : [];
  } catch {
    return [];
  }
}

export function RecentViews() {
  const [items, setItems] = useState<StoredView[]>([]);

  useEffect(() => {
    const sync = () => setItems(readRecentViews());
    sync();
    window.addEventListener("recent-views:changed", sync as EventListener);
    return () => {
      window.removeEventListener("recent-views:changed", sync as EventListener);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="page-shell pt-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
            最近浏览
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            继续上次看到的内容
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.slice(0, 4).map((item) => (
          <Link
            key={item.slug}
            href={`/prompts/${item.slug}`}
            className="soft-panel overflow-hidden rounded-[24px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-white/5" />
            </div>
            <div className="space-y-3 p-5">
              <p className="text-sm text-[var(--color-brand-deep)]">{item.category}</p>
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">继续查看</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
