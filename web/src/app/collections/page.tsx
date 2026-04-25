import Image from "next/image";
import Link from "next/link";
import { CollectionsBrowser } from "@/components/collections-browser";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { collections, featuredCollection } from "@/data/site-data";

export default function CollectionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
              专题
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">
              专题合集
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              按风格、用途和视觉方向整理好的提示词专题集合。
            </p>
          </div>

          <CollectionsBrowser collections={collections} />
        </section>

        <section className="page-shell pt-14">
          <div className="relative overflow-hidden rounded-[36px] border border-white/40 px-8 py-10 shadow-[var(--shadow-soft)] md:px-10 md:py-12">
            <Image
              src={featuredCollection.imageSrc}
              alt={featuredCollection.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,28,27,0.76),rgba(16,28,27,0.18))]" />
            <div className="relative z-10 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                推荐专题
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
                {featuredCollection.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-white/82">
                {featuredCollection.description}
              </p>
              <Link
                href={`/collections/${featuredCollection.slug}`}
                className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-brand-soft)]"
              >
                浏览专题
              </Link>
            </div>
          </div>
        </section>

        <PageCta
          title="继续浏览更多提示词案例"
          href="/explore"
          label="浏览提示词"
        />
      </main>
      <SiteFooter />
    </>
  );
}
