import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/images";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="inline-flex items-center rounded-sm bg-foam/90 p-1.5 shadow-sm">
          <Image
            src={LOGO_SRC}
            alt="ROM. CARNEIROS"
            width={120}
            height={64}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>
        <nav className="flex items-center gap-5 text-[13px] font-medium text-foam drop-shadow-[0_1px_8px_rgba(44,46,40,0.55)] md:gap-8">
          <a href="#inicio" className="hidden transition hover:text-foam sm:inline">
            Início
          </a>
          <a
            href="#descobrir"
            className="hidden underline decoration-olive decoration-2 underline-offset-8 sm:inline"
          >
            Destino
          </a>
          <a href="#servicos" className="hidden transition hover:text-foam sm:inline">
            Serviços
          </a>
          <Link href="/reservar" className="transition hover:text-foam">
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
}
