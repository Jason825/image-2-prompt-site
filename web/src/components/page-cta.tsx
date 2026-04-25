import Link from "next/link";

export function PageCta({
  title,
  href,
  label,
}: {
  title: string;
  href: string;
  label: string;
}) {
  return (
    <section className="page-shell pb-16 pt-6">
      <div className="rounded-[32px] border border-white/50 px-8 py-10 hero-wash shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
              ImagePromptive
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
          </div>
          <Link
            href={href}
            className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}
