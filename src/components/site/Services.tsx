import Image from "next/image";
import Link from "next/link";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/catalog";
import { DISCOVER_BACKGROUND } from "@/lib/images";

export function Services() {
  return (
    <section id="servicos" className="bg-greige px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <span className="accent-line mb-5" />
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-olive">Serviços</p>
        <h2 className="mt-3 max-w-xl font-sans text-3xl font-bold tracking-tight text-ink md:text-5xl">
          O que você encontra na temporada
        </h2>
        <p className="mt-4 max-w-lg text-ink/60">
          Catálogo completo no painel. Sinal de 30% em todos os serviços — o restante no local.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.flatMap((category, index) => {
            const items = SERVICES.filter((s) => s.category === category.id);
            const card = (
              <article key={category.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-beige">
                  <Image
                    src={category.image}
                    alt={`Serviço ${category.label}`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 pt-16">
                    <h3 className="font-display text-2xl tracking-wide text-foam">{category.label}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink/65">{category.blurb}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink/80">
                  {items.map((service) => (
                    <li key={service.id} className="service-dot relative pl-4">
                      {service.name}
                    </li>
                  ))}
                </ul>
              </article>
            );

            // Foto da igrejinha entre o 2º e o 3º card (Rosto → Unhas)
            if (index === 2) {
              return [
                <div
                  key="carneiros-break"
                  className="relative -mx-5 aspect-[16/10] overflow-hidden bg-beige sm:col-span-2 sm:mx-0 sm:aspect-[21/9] lg:col-span-4"
                >
                  <Image
                    src={DISCOVER_BACKGROUND}
                    alt="Igrejinha de São Benedito na Praia dos Carneiros"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/25 via-transparent to-transparent" />
                </div>,
                card,
              ];
            }

            return [card];
          })}
        </div>

        <div className="mt-12">
          <Link
            href="/reservar"
            className="cta-green inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition"
          >
            Ver horários e reservar
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foam text-base font-bold text-olive">
              +
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
