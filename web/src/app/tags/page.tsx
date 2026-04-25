import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TagCard } from "@/components/tag-card";
import { getTags } from "@/data/site-data";

export default function TagsPage() {
  const tags = getTags();

  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
              标签
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">
              标签索引
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              按更细的风格和用途标签进入内容，比如写实、夜景、海报、信息图。
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {tags.map((tag) => (
              <TagCard
                key={tag.slug}
                title={tag.title}
                count={tag.count}
                imageSrc={tag.sampleImage}
                href={`/tags/${tag.slug}`}
              />
            ))}
          </div>
        </section>

        <PageCta
          title="继续浏览更多提示词案例"
          href="/explore"
          label="去浏览"
        />
      </main>
      <SiteFooter />
    </>
  );
}
