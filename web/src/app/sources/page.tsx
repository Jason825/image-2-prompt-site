import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sources } from "@/data/site-data";

export default function SourcesPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
              来源
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">
              素材来源说明
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              这里记录站内案例当前主要整理来源，方便后续继续扩充、追溯和完善内容结构。
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {sources.map((source) => (
              <section key={source.id} className="soft-panel rounded-[28px] p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                  已接入来源
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  {source.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                  {source.description}
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[20px] border border-[var(--color-line)] bg-white/70 p-4">
                    <p className="text-sm text-[var(--color-muted)]">源文件位置</p>
                    <p className="mt-2 break-all text-sm leading-6 text-[var(--color-ink)]">
                      {source.pathLabel}
                    </p>
                  </div>
                  <div className="rounded-[20px] border border-[var(--color-line)] bg-white/70 p-4">
                    <p className="text-sm text-[var(--color-muted)]">当前接入案例数</p>
                    <p className="mt-2 text-4xl font-semibold tracking-tight">
                      {source.includedCount}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <PageCta
          title="继续扩充更多真实案例"
          href="/explore"
          label="去浏览"
        />
      </main>
      <SiteFooter />
    </>
  );
}
