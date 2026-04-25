import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/data/site-data";

export function CollectionCard({ item }: { item: CollectionItem }) {
  return (
    <article className="soft-panel overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <p className="text-sm text-[var(--color-brand-deep)]">{item.count} 个案例</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-muted)]">{item.summary}</span>
          <Link
            href={`/collections/${item.slug}`}
            className="shrink-0 rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
          >
            查看专题
          </Link>
        </div>
      </div>
    </article>
  );
}
