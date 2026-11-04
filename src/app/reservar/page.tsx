import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { ReserveForm } from "@/components/site/ReserveForm";
import { BRAND, OPERATION } from "@/lib/constants";
import { LOGO_SRC } from "@/lib/images";

export const metadata: Metadata = {
  title: "Reservar",
};

export default function ReservarPage() {
  return (
    <main className="min-h-screen bg-sand-light">
      <header className="border-b border-ink/10 bg-foam">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
          <Link href="/" className="inline-flex items-center">
            <Image
              src={LOGO_SRC}
              alt="ROM. CARNEIROS"
              width={120}
              height={45}
              className="h-9 w-auto"
            />
          </Link>
          <a
            href={`https://wa.me/${BRAND.whatsappE164}`}
            className="text-sm text-olive"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <h1 className="font-display text-4xl text-ink md:text-5xl">Reservar horário</h1>
        <p className="mt-3 max-w-xl text-ink/70">
          Serviços em sequência · sinal de {OPERATION.depositPercent}% ·{" "}
          {OPERATION.cancelPolicy}
        </p>
        <div className="mt-10">
          <ReserveForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
