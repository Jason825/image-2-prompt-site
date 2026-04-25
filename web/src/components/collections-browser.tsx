import { CollectionCard } from "@/components/collection-card";
import type { CollectionItem } from "@/data/site-data";

export function CollectionsBrowser({
  collections,
}: {
  collections: CollectionItem[];
}) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {collections.map((item) => (
        <CollectionCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
