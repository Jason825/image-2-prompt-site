"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={[
        "group relative inline-flex items-center rounded-full px-3 py-1.5 text-sm transition duration-200",
        active
          ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-deep)]"
          : "text-[var(--color-muted)] hover:-translate-y-0.5 hover:bg-white/80 hover:text-[var(--color-ink)]",
      ].join(" ")}
    >
      <span>{label}</span>
      <span
        className={[
          "absolute inset-x-3 bottom-0 h-px origin-left rounded-full bg-[var(--color-brand)] transition-transform duration-200",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        ].join(" ")}
      />
    </Link>
  );
}
