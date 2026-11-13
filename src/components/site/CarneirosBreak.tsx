import Image from "next/image";
import { DISCOVER_BACKGROUND } from "@/lib/images";

/** Faixa visual da igrejinha — entre região (Descubra) e Serviços. */
export function CarneirosBreak() {
  return (
    <section aria-label="Praia dos Carneiros" className="relative aspect-[16/10] overflow-hidden bg-beige sm:aspect-[21/9]">
      <Image
        src={DISCOVER_BACKGROUND}
        alt="Igrejinha de São Benedito na Praia dos Carneiros"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/25 via-transparent to-transparent" />
    </section>
  );
}
