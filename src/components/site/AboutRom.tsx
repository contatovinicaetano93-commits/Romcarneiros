import Image from "next/image";
import { ROMEU_IMAGE, LOGO_WHITE_SRC } from "@/lib/images";

export function AboutRom() {
  return (
    <section id="rom" className="paper-surface relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="watercolor-splash-soft pointer-events-none absolute -right-20 top-10 h-72 w-72 opacity-50" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative">
          <div className="rom-blob-mask relative aspect-[4/5] overflow-hidden bg-greige">
            <Image
              src={ROMEU_IMAGE}
              alt="Romeu Felipe — assinatura Rom"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="absolute -bottom-4 -right-2 md:-right-4">
            <Image
              src={LOGO_WHITE_SRC}
              alt="ROM. CARNEIROS"
              width={96}
              height={36}
              className="h-auto w-16 drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] md:w-20"
            />
          </div>
        </div>
        <div>
          <span className="accent-line mb-5" />
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-olive">Romeu Felipe</p>
          <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-ink md:text-5xl">
            A assinatura Rom
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/65">
            Cabelo, rosto e estética com olhar de verão nordestino — luz, sal e cuidado em cada
            atendimento da operação Carneiros.
          </p>
        </div>
      </div>
    </section>
  );
}
