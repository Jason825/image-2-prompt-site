import Image from "next/image";
import Link from "next/link";

export function TagCard({
  title,
  count,
  imageSrc,
  href,
}: {
  title: string;
  count: number;
  imageSrc: string;
  href: string;
}) {
  return (
    <article className="soft-panel overflow-hidden rounded-[24px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,40,34,0.12)]">
      <div className="relative h-36 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-white/5" />
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{count} 个案例</p>
        </div>
        <Link
          href={href}
          className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-brand-deep)]"
        >
          查看标签
        </Link>
      </div>
    </article>
  );
}
