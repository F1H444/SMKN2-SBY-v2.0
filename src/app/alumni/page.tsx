import HeroSection from "@/components/ui/global/hero";
import AlumniPage from "./alumni-terbaik";
import Bmw from "./bmw";
import Footer from "@/components/ui/global/footer";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
        <HeroSection
          title="Alumni"
          backgroundImage="/img/slider/alumni.webp"
          ctaText="Jelajahi Lebih Lanjut"
          ctaColor="bg-blue-600 hover:bg-blue-700"
        />
        <AlumniPage />
        <Bmw />
        <Footer />
      </div>
    </>
  );
}
