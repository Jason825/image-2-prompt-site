import Link from "next/link";
import { HomeFeaturedPrompts } from "@/components/home-featured-prompts";
import { RecentViews } from "@/components/recent-views";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { collections, getCategories, prompts } from "@/data/site-data";

export default function HomePage() {
  const categories = getCategories();

  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="hero-wash overflow-hidden rounded-[36px] border border-white/50 px-8 py-10 shadow-[var(--shadow-soft)] md:px-10 md:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
                  Curated Image 2.0 Prompts
                </p>
                <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl">
                  把好用的 Image 2.0 提示词整理成一个真正能逛的内容站
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                  浏览真实案例图，快速找到可复用提示词，并按分类和专题继续深挖。
                  首页会优先展示当前最热门的内容，帮助你回到页面时直接看到最新排序结果。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/explore"
                    className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
                  >
                    浏览提示词
                  </Link>
                  <Link
                    href="/collections"
                    className="rounded-full border border-[var(--color-line)] bg-white/70 px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)]"
                  >
                    查看专题
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="soft-panel rounded-[28px] p-6">
                  <p className="text-sm text-[var(--color-muted)]">已接入案例</p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight">{prompts.length}</p>
                </div>
                <div className="soft-panel rounded-[28px] p-6">
                  <p className="text-sm text-[var(--color-muted)]">内容分类</p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight">{categories.length}</p>
                </div>
                <div className="soft-panel rounded-[28px] p-6">
                  <p className="text-sm text-[var(--color-muted)]">专题集合</p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight">{collections.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell pt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                热门精选
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                回到首页时，优先看到最新热度最高的内容
              </h2>
            </div>
            <Link
              href="/explore"
              className="hidden text-sm font-medium text-[var(--color-brand-deep)] md:block"
            >
              查看全部
            </Link>
          </div>

          <HomeFeaturedPrompts prompts={prompts} />
        </section>

        <section className="page-shell pt-14">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
              进入分类
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              按图像任务和内容类型继续浏览
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="soft-panel rounded-[28px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]"
              >
                <p className="text-sm text-[var(--color-brand-deep)]">{category.count} 个案例</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <RecentViews />
      </main>
      <SiteFooter />
    </>
  );
}
