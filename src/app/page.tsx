import { AboutRom } from "@/components/site/AboutRom";
import { DiscoverCarneiros } from "@/components/site/DiscoverCarneiros";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ReserveCta } from "@/components/site/ReserveCta";
import { Services } from "@/components/site/Services";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <DiscoverCarneiros />
      <Services />
      <AboutRom />
      <ReserveCta />
      <Footer />
    </main>
  );
}
