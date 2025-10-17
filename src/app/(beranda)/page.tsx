// app/(home)/page.tsx

import dynamic from "next/dynamic";
import Hero from "./hero";
import Footer from "@/components/ui/global/footer";
import Others from "./others";
import AlumniInspiration from "./alumni";
import WallOfDreams from "./wallofdreams";

// OPTIMASI: Lazy load komponen yang berada di bawah "the fold" (tidak langsung terlihat).
// Ini adalah strategi code-splitting paling efektif untuk mempercepat waktu muat awal.
const StatsSlider = dynamic(() => import("./stateSlider"));
const LogoShowcase = dynamic(() => import("./logoShowcase"));

export default function Home() {
  return (
    <>
      {/* Komponen yang langsung terlihat dimuat secara normal */}
      <Hero />

      {/* Komponen di bawahnya akan dimuat secara dinamis saat dibutuhkan */}
      <LogoShowcase />
      <StatsSlider />
      <Others />
      <AlumniInspiration />
      <WallOfDreams />
      <Footer />
    </>
  );
}
