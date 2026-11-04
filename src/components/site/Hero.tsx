"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OPERATION } from "@/lib/constants";
import { HERO_SLIDES, LOGO_SRC } from "@/lib/images";

const INTERVAL_MS = 2000;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="inicio" className="relative min-h-[100svh] overflow-hidden bg-olive-deep">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero-slide ${i === index ? "is-active" : ""}`}
          style={{ backgroundImage: `url(${slide.src})` }}
          role="img"
          aria-label={slide.alt}
          aria-hidden={i !== index}
        />
      ))}

      {/* Scrim na paleta oliva/ink — lê o texto sem matar a foto */}
      <div className="hero-scrim absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 pb-32 pt-28 md:px-8 md:pb-40">
        <div className="max-w-lg">
          <div className="animate-rise mb-7">
            <Image
              src={LOGO_SRC}
              alt="ROM. CARNEIROS"
              width={280}
              height={106}
              className="logo-mark h-auto w-[168px] md:w-[220px]"
              priority
            />
          </div>
          <p className="hero-copy animate-rise-delay max-w-md text-base font-medium leading-relaxed md:text-lg">
            Beleza na praia do Nordeste — operação de {OPERATION.startDate.slice(8)}/
            {OPERATION.startDate.slice(5, 7)} a {OPERATION.endDate.slice(8)}/
            {OPERATION.endDate.slice(5, 7)}. Junte-se à temporada.
          </p>
          <div className="animate-rise-delay-2 mt-8">
            <Link
              href="/reservar"
              className="cta-green inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold shadow-lg shadow-ink/40 transition"
            >
              Reservar horário
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foam text-base font-bold text-olive">
                +
              </span>
            </Link>
          </div>
          <div className="animate-rise-delay-2 mt-8 flex gap-2">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Ir para imagem ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-olive" : "w-1.5 bg-beige/55"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hero-watercolor z-10" aria-hidden />
    </section>
  );
}
