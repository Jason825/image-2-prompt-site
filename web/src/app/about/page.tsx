import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell flex-1 py-16">
        <section className="hero-wash rounded-[36px] border border-white/50 px-8 py-12 shadow-[var(--shadow-soft)] md:px-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
            关于
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            ImagePromptive
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
            ImagePromptive 是一个只聚焦 Image 2.0 的提示词案例网站，帮助创作者浏览高质量效果图、查看可复用提示词结构，并快速复制和继续改写。
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
