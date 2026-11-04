import Link from "next/link";
import { ADMIN_NAV } from "@/lib/admin-view";
import { BRAND } from "@/lib/constants";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-ink/10 bg-foam px-5 py-6 md:block">
      <p className="font-sans text-lg font-semibold lowercase tracking-[0.04em] text-ink">
        {BRAND.shortName.toLowerCase()}
        <span className="text-olive">.</span>
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink/40">Operação</p>
      <nav className="mt-8 flex flex-col gap-1">
        {ADMIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm text-ink/70 transition hover:bg-mist hover:text-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
