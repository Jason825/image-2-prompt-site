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
      className={`transition-colors ${
        active ? "text-[var(--color-ink)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
      }`}
    >
      {label}
    </Link>
  );
}
