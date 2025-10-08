import HeroSection from "@/components/ui/global/hero";
import PrincipalWelcome from "./sambutan";
import SMKN2History from "./sejarah";
import VisiMisiSMKN2 from "./visimisi";
import Footer from "@/components/ui/global/footer";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Tentang Kami"
        backgroundImage="/img/smkn2.webp"
        ctaText="Jelajahi Lebih Lanjut"
        ctaColor="bg-blue-600 hover:bg-blue-700"
      />
      <PrincipalWelcome />
      <SMKN2History />
      <VisiMisiSMKN2 />
      <Footer />
    </>
  );
}
