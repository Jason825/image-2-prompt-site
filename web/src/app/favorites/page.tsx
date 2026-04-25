import { FavoritesView } from "@/components/favorites-view";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { prompts } from "@/data/site-data";

export default function FavoritesPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
              收藏
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">
              我的收藏
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              把你想继续研究或复用的提示词暂时收在这里，方便下次直接回来继续用。
            </p>
          </div>

          <div className="mt-10">
            <FavoritesView prompts={prompts} />
          </div>
        </section>

        <PageCta
          title="继续浏览更多可收藏的提示词"
          href="/explore"
          label="去浏览"
        />
      </main>
      <SiteFooter />
    </>
  );
}
