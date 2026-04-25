import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "./copy-button";
import { TagPill } from "./tag-pill";
import type { PromptItem } from "@/data/site-data";

export function PromptCard({
  item,
}: {
  item: PromptItem;
  showView?: boolean;
}) {
  return (
    <article className="masonry-item">
      <div className="soft-panel group overflow-hidden rounded-[24px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]">
        <Link href={`/prompts/${item.slug}`} className="block">
          <div className={`${item.cardHeight} relative w-full overflow-hidden`}>
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1080px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/8" />
          </div>

          <div className="space-y-4 p-5">
            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 2).map((tag, index) => (
                <TagPill key={tag} label={tag} active={index === 0} />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {item.description}
              </p>
              <p className="mt-3 line-clamp-4 text-sm leading-6 text-[var(--color-ink)]">
                {item.prompt}
              </p>
            </div>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-3 px-5 pb-5">
          <CopyButton
            text={item.prompt}
            label="复制提示词"
            copiedLabel="已复制提示词"
          />
          <a
            href={item.imageSrc}
            download
            className="rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)]"
          >
            下载图片
          </a>
        </div>
      </div>
    </article>
  );
}
