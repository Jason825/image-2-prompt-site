import Link from "next/link";
import { HomeFeaturedPrompts } from "@/components/home-featured-prompts";
import { RecentViews } from "@/components/recent-views";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { collections, getCategories, prompts } from "@/data/site-data";
import { proPack } from "@/data/pro-pack";

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
                  精选 Image 2.0 提示词，帮你少试错、快出图
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                  浏览真实案例图，快速找到适合电商、海报、UI、信息图和写实摄影的可复用提示词。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/pro"
                    className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
                  >
                    获取精选包
                  </Link>
                  <Link
                    href="/explore"
                    className="rounded-full border border-[var(--color-line)] bg-white/70 px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)]"
                  >
                    先看免费案例
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="soft-panel rounded-[28px] p-6">
                  <p className="text-sm text-[var(--color-muted)]">已收录案例</p>
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
                先从最受欢迎的案例开始
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
          <div className="soft-panel grid gap-8 rounded-[32px] p-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                付费精选包
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                {proPack.shortName}，把可复用提示词一次整理好
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                适合想快速做商业图、内容封面和产品视觉的人。当前是早期验证版，先用低价精选包测试真实购买意愿。
              </p>
            </div>
            <div className="rounded-[28px] bg-[var(--color-ink)] p-6 text-white">
              <p className="text-sm text-white/70">首发验证价</p>
              <div className="mt-2 flex items-end gap-3">
                <span className="text-5xl font-semibold">{proPack.price}</span>
                <span className="pb-2 text-sm text-white/50 line-through">
                  {proPack.originalPrice}
                </span>
              </div>
              <Link
                href="/pro"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-cream)]"
              >
                查看精选包内容
              </Link>
            </div>
          </div>
        </section>

        <section className="page-shell pt-14">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
              分类浏览
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="soft-panel rounded-[28px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]"
              >
                <p className="text-sm text-[var(--color-brand-deep)]">
                  {category.count} 个案例
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {category.title}
                </h3>
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
