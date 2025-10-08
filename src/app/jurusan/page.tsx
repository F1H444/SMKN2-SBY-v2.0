import HeroSection from "@/components/ui/global/hero";
import JurusanPage from "./info-jurusan";
import Footer from "@/components/ui/global/footer";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Jurusan Yang Tersedia"
        backgroundImage="/img/smkn2.webp"
        ctaText="Jelajahi Lebih Lanjut"
        ctaColor="bg-blue-600 hover:bg-blue-700"
      />
      <JurusanPage />
      <Footer/>
    </>
  );
}
