// app/(home)/page.tsx (Full Code - No Changes Needed)

import dynamic from "next/dynamic";
import Hero from "./hero";
import Footer from "@/components/ui/global/footer";
import Others from "./others";
import AlumniInspiration from "./alumni";
import WallOfDreams from "./wallofdreams";

const StatsSlider = dynamic(() => import("./stateSlider"));
const LogoShowcase = dynamic(() => import("./logoShowcase"));

export default function Home() {
  return (
    <>
      <Hero />
      <LogoShowcase />
      <StatsSlider />
      <Others />
      <AlumniInspiration />
      <WallOfDreams />
      <Footer />
    </>
  );
}
