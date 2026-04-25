import { CategoryCard } from "@/components/category-card";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/data/site-data";

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
              分类
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">
              内容分类
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              按内容类型进入不同提示词方向，更快找到适合你的图像任务。
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                title={category.title}
                description={category.description}
                count={category.count}
                imageSrc={category.imageSrc}
                href={`/categories/${category.slug}`}
              />
            ))}
          </div>
        </section>

        <PageCta
          title="继续浏览更多专题与提示词"
          href="/explore"
          label="去浏览"
        />
      </main>
      <SiteFooter />
    </>
  );
}
