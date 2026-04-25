import Image from "next/image";
import Link from "next/link";

export function CategoryCard({
  title,
  description,
  count,
  imageSrc,
  href,
}: {
  title: string;
  description: string;
  count: number;
  imageSrc: string;
  href: string;
}) {
  return (
    <article className="soft-panel overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-muted)]">{count} 个案例</span>
          <Link
            href={href}
            className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
          >
            查看分类
          </Link>
        </div>
      </div>
    </article>
  );
}
