import HeroSection from "@/components/ui/global/hero";
import NewsPage from "./berita";
import Footer from "@/components/ui/global/footer";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Berita Terkini"
        backgroundImage="/img/smkn2.webp"
        ctaText="Jelajahi Lebih Lanjut"
        ctaColor="bg-blue-600 hover:bg-blue-700"
      />
      <NewsPage />
      <Footer />
    </>
  );
}
