import HeroSection from "@/components/ui/global/hero";
import PrincipalWelcome from "./sambutan";
import SMKN2History from "./sejarah";
import VisiMisiSMKN2 from "./visimisi";
import FacilitiesPage from "./(360)/360derajat";
import Footer from "@/components/ui/global/footer";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
        <HeroSection
          title="Tentang Kami"
          backgroundImage="/img/hero/tentang.webp"
          ctaText="Jelajahi Lebih Lanjut"
          ctaColor="bg-blue-600 hover:bg-blue-700"
        />
        <PrincipalWelcome />
        <SMKN2History />
        <FacilitiesPage />
        <VisiMisiSMKN2 />
        <Footer />
      </div>
    </>
  );
}
