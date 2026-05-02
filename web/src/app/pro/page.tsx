import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPurchaseMailto, proPack } from "@/data/pro-pack";
import { prompts } from "@/data/site-data";

export const metadata = {
  title: `${proPack.shortName} | ImagePromptive`,
  description: proPack.summary,
};

export default function ProPackPage() {
  const samplePrompts = proPack.sampleSlugs
    .map((slug) => prompts.find((prompt) => prompt.slug === slug))
    .filter((prompt) => Boolean(prompt));

  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="hero-wash overflow-hidden rounded-[36px] border border-white/50 px-8 py-10 shadow-[var(--shadow-soft)] md:px-10 md:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
                  Paid Prompt Pack
                </p>
                <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl">
                  {proPack.name}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                  {proPack.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={getPurchaseMailto()}
                    className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
                  >
                    联系购买
                  </a>
                  <Link
                    href="/explore"
                    className="rounded-full border border-[var(--color-line)] bg-white/70 px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)]"
                  >
                    先看免费案例
                  </Link>
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
                  当前为早期验证版：通过邮箱确认购买意向，后续人工发送下载文件。
                </p>
              </div>

              <div className="rounded-[32px] bg-[var(--color-ink)] p-8 text-white shadow-[var(--shadow-soft)]">
                <p className="text-sm text-white/70">首发验证价</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-6xl font-semibold tracking-tight">{proPack.price}</span>
                  <span className="pb-2 text-base text-white/45 line-through">
                    {proPack.originalPrice}
                  </span>
                </div>
                <div className="mt-8 space-y-3">
                  {proPack.includes.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell pt-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="soft-panel rounded-[32px] p-7">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                适合谁
              </p>
              <div className="mt-5 space-y-4">
                {proPack.audiences.map((item) => (
                  <p key={item} className="text-sm leading-7 text-[var(--color-muted)]">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="soft-panel rounded-[32px] p-7">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                为什么先做这个
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                先验证用户是否愿意为“省时间”付费
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                对早期产品来说，最重要的不是马上做复杂会员系统，而是确认用户是否愿意为了更高质量、更好整理、更容易复用的提示词包付费。
              </p>
            </div>
          </div>
        </section>

        <section className="page-shell pt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                样例方向
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                精选包会覆盖这些高复用场景
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {samplePrompts.map((item) => (
              <Link
                key={item!.slug}
                href={`/prompts/${item!.slug}`}
                className="soft-panel overflow-hidden rounded-[24px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={item!.imageSrc}
                    alt={item!.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <p className="text-sm text-[var(--color-brand-deep)]">{item!.category}</p>
                  <h3 className="text-xl font-semibold tracking-tight">{item!.title}</h3>
                  <p className="line-clamp-2 text-sm leading-6 text-[var(--color-muted)]">
                    {item!.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="page-shell pb-16 pt-14">
          <div className="rounded-[32px] border border-white/50 px-8 py-10 hero-wash shadow-[var(--shadow-soft)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
                  Next Step
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  想要这套精选包？先发邮件确认购买
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  邮箱：{proPack.email}。收到意向后，可以继续补齐支付方式和自动交付流程。
                </p>
              </div>
              <a
                href={getPurchaseMailto()}
                className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
              >
                联系购买
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
