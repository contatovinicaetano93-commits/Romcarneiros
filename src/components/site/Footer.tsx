import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { LOGO_SRC } from "@/lib/images";

export function Footer() {
  return (
    <footer className="bg-foam px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Image
            src={LOGO_SRC}
            alt="ROM. CARNEIROS"
            width={140}
            height={76}
            className="h-10 w-auto"
          />
          <p className="mt-2 text-sm text-ink/45">{BRAND.domain}</p>
        </div>
        <div className="flex gap-5 text-sm text-ink/60">
          <a href="#descobrir" className="hover:text-ink">
            Destino
          </a>
          <a href="#servicos" className="hover:text-ink">
            Serviços
          </a>
          <Link href="/reservar" className="hover:text-ink">
            Reservar
          </Link>
          <a
            href={`https://wa.me/${BRAND.whatsappE164}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
