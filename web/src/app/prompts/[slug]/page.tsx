import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ViewTracker } from "@/components/view-tracker";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedPrompts, prompts } from "@/data/site-data";

export function generateStaticParams() {
  return prompts.map((prompt) => ({ slug: prompt.slug }));
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = prompts.find((item) => item.slug === slug);

  if (!prompt) {
    notFound();
  }

  const related = getRelatedPrompts(slug);

  return (
    <>
      <SiteHeader />
      <ViewTracker prompt={prompt} />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="text-sm text-[var(--color-muted)]">
            <Link href="/">首页</Link> / <span>{prompt.title}</span>
          </div>

          <div className="mt-6 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
              {prompt.category}
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">{prompt.title}</h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              {prompt.description}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[34rem] overflow-hidden rounded-[32px] border border-white/50 bg-[var(--color-surface-strong)] p-4 shadow-[var(--shadow-soft)]">
              <Image
                src={prompt.imageSrc}
                alt={prompt.imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div className="space-y-6">
              <section className="soft-panel rounded-[28px] p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                  提示词
                </p>
                <p className="mt-4 text-base leading-7 text-[var(--color-ink)]">
                  {prompt.prompt}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CopyButton
                    text={prompt.prompt}
                    label="复制提示词"
                    copiedLabel="已复制提示词"
                    promptSlug={prompt.slug}
                  />
                  <DownloadButton
                    href={prompt.imageSrc}
                    slug={prompt.slug}
                    className="rounded-full border border-[var(--color-line)] bg-white/70 px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)]"
                  />
                </div>
              </section>

              {prompt.negativePrompt ? (
                <section className="soft-panel rounded-[28px] p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                    反向提示词
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    {prompt.negativePrompt}
                  </p>
                </section>
              ) : null}

              <section className="soft-panel rounded-[28px] p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                  使用说明
                </p>
                <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                  <p>
                    <span className="font-medium text-[var(--color-ink)]">适合场景：</span>{" "}
                    {prompt.useCase}
                  </p>
                  <p>
                    <span className="font-medium text-[var(--color-ink)]">可替换内容：</span>{" "}
                    主体、材质、配色、场景道具。
                  </p>
                  <p>
                    <span className="font-medium text-[var(--color-ink)]">画幅比例：</span>{" "}
                    {prompt.ratio}
                  </p>
                  <p>
                    <span className="font-medium text-[var(--color-ink)]">所属专题：</span>{" "}
                    <Link
                      href={`/collections/${prompt.collectionSlug}`}
                      className="text-[var(--color-brand-deep)] hover:underline"
                    >
                      查看专题内容
                    </Link>
                  </p>
                  <p>
                    <span className="font-medium text-[var(--color-ink)]">来源：</span>{" "}
                    <Link
                      href="/sources"
                      className="text-[var(--color-brand-deep)] hover:underline"
                    >
                      {prompt.sourceLabel}
                    </Link>
                  </p>
                  <p>{prompt.notes}</p>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="page-shell pt-14">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
              相关推荐
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              继续浏览相似案例
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/prompts/${item.slug}`}
                className="soft-panel overflow-hidden rounded-[22px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-sm text-[var(--color-brand-deep)]">{item.category}</p>
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="line-clamp-2 text-sm leading-6 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <PageCta title="继续发现更多提示词案例" href="/explore" label="浏览提示词" />
      </main>
      <SiteFooter />
    </>
  );
}
