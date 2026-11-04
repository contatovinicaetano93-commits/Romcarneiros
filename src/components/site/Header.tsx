import Image from "next/image";
import Link from "next/link";
import { LOGO_WHITE_SRC } from "@/lib/images";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="inline-flex items-center">
          <Image
            src={LOGO_WHITE_SRC}
            alt="ROM. CARNEIROS"
            width={140}
            height={53}
            className="h-8 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:h-10"
            priority
          />
        </Link>
        <nav className="flex items-center gap-5 text-[13px] font-semibold text-foam [text-shadow:0_1px_10px_rgba(0,0,0,0.65)] md:gap-8">
          <a href="#inicio" className="hidden transition hover:text-foam/90 sm:inline">
            Início
          </a>
          <a
            href="#descobrir"
            className="hidden underline decoration-olive decoration-2 underline-offset-8 sm:inline"
          >
            Destino
          </a>
          <a href="#servicos" className="hidden transition hover:text-foam/90 sm:inline">
            Serviços
          </a>
          <Link href="/reservar" className="transition hover:text-foam/90">
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
}
