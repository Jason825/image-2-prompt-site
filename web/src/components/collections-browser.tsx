"use client";

import { useMemo, useState } from "react";
import { CollectionCard } from "@/components/collection-card";
import { TagPill } from "@/components/tag-pill";
import type { CollectionItem } from "@/data/site-data";

export function CollectionsBrowser({
  collections,
}: {
  collections: CollectionItem[];
}) {
  const filters = ["全部", ...new Set(collections.flatMap((item) => item.tags))];
  const [activeFilter, setActiveFilter] = useState("全部");

  const filtered = useMemo(() => {
    if (activeFilter === "全部") return collections;
    return collections.filter((item) => item.tags.includes(activeFilter));
  }, [activeFilter, collections]);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        {filters.map((tag) => (
          <TagPill
            key={tag}
            label={tag}
            active={tag === activeFilter}
            onClick={() => setActiveFilter(tag)}
          />
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filtered.map((item) => (
          <CollectionCard key={item.slug} item={item} />
        ))}
      </div>
    </>
  );
}
