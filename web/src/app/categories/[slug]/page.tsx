import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MasonryGrid } from "@/components/masonry-grid";
import { PageCta } from "@/components/page-cta";
import { PromptCard } from "@/components/prompt-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getCategories,
  getCategoryBySlug,
  getCategoryTitleFromSlug,
  getPromptsByCategory,
} from "@/data/site-data";

export function generateStaticParams() {
  return getCategories().map((item) => ({ slug: item.slug }));
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const title = getCategoryTitleFromSlug(slug);

  if (!category || !title) {
    notFound();
  }

  const items = getPromptsByCategory(title);

  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="text-sm text-[var(--color-muted)]">
            <Link href="/">首页</Link> / <Link href="/categories">分类</Link> / {" "}
            <span>{category.title}</span>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[36px] border border-white/50 shadow-[var(--shadow-soft)]">
              <Image
                src={category.imageSrc}
                alt={category.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,24,22,0.46),rgba(12,24,22,0.12))]" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
                分类详情
              </p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tight">
                {category.title}
              </h1>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {category.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-[var(--color-muted)]">
                <span>{items.length} 个精选案例</span>
                <span>适合按同类图像任务成批复用</span>
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell pt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                分类内容
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                这一分类下的案例
              </h2>
            </div>
            <Link
              href="/explore"
              className="hidden text-sm font-medium text-[var(--color-brand-deep)] md:block"
            >
              进入总览
            </Link>
          </div>

          <MasonryGrid>
            {items.map((item) => (
              <PromptCard key={item.slug} item={item} showView />
            ))}
          </MasonryGrid>
        </section>

        <PageCta
          title="继续浏览更多分类和专题"
          href="/categories"
          label="返回分类页"
        />
      </main>
      <SiteFooter />
    </>
  );
}
