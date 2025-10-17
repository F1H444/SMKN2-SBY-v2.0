import HeroSection from "@/components/ui/global/hero";
import JurusanPage from "./eskul";
import Footer from "@/components/ui/global/footer";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Ekstrakulikuler"
        backgroundImage="/img/hero/eskul.webp"
        ctaText="Jelajahi Lebih Lanjut"
        ctaColor="bg-blue-600 hover:bg-blue-700"
      />
      <JurusanPage />
      <Footer />
    </>
  );
}
