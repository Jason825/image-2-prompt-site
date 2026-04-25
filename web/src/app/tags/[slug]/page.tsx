import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/page-cta";
import { PromptCard } from "@/components/prompt-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPromptsByTag, getTagBySlug, getTags } from "@/data/site-data";

export function generateStaticParams() {
  return getTags().map((tag) => ({ slug: tag.slug }));
}

export default async function TagDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const items = getPromptsByTag(tag.title);

  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="text-sm text-[var(--color-muted)]">
            <Link href="/">首页</Link> / <Link href="/tags">标签</Link> / {" "}
            <span>{tag.title}</span>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[24rem] overflow-hidden rounded-[36px] border border-white/50 shadow-[var(--shadow-soft)]">
              <Image
                src={tag.sampleImage}
                alt={tag.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,24,22,0.42),rgba(12,24,22,0.08))]" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
                标签详情
              </p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tight">
                {tag.title}
              </h1>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                这个标签下收录了更细粒度的案例内容，适合在同一风格方向里继续深挖。
              </p>
              <div className="mt-8 text-sm text-[var(--color-muted)]">
                共 {items.length} 个相关案例
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell pt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                标签案例
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                使用这个标签的内容
              </h2>
            </div>
          </div>

          <div className="masonry-grid">
            {items.map((item) => (
              <PromptCard key={item.slug} item={item} showView />
            ))}
          </div>
        </section>

        <PageCta title="继续浏览更多标签" href="/tags" label="返回标签页" />
      </main>
      <SiteFooter />
    </>
  );
}
