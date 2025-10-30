"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EskulPage() {
  const main = useRef<HTMLDivElement>(null);
  const [dataEkskul, setDataEkskul] = useState<any[]>([]);

  // --- FUNGSI FETCH DATA (DENGAN DEBUGGING) ---
  const fetchEkskuls = async () => {
    // 1. Cek environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error(
        "Fetch Gagal: Environment variable NEXT_PUBLIC_API_URL tidak di-set."
      );
    }

    const targetUrl = `${apiUrl}/api/extras`;
    console.log(`Mencoba fetch ke: ${targetUrl}`); // Log 1: Cek URL

    try {
      const res = await fetch(targetUrl);

      // 2. Cek jika server error (bukan 200 OK)
      if (!res.ok) {
        console.error(
          `Fetch Gagal: Server merespons dengan status ${res.status}`
        ); // Log 2: Error HTTP
        setDataEkskul([]);
        return;
      }

      const result = await res.json();

      // 3. Cek struktur data (array langsung atau object { items: [...] })
      let dataArray = [];
      if (Array.isArray(result)) {
        dataArray = result;
        console.log(`Fetch Sukses: ${dataArray.length} data diterima (array).`); // Log 3: Sukses
      } else if (result && Array.isArray(result.items)) {
        dataArray = result.items;
        console.log(
          `Fetch Sukses: ${dataArray.length} data diterima (dari 'items').`
        ); // Log 3: Sukses
      } else {
        console.warn(
          "Fetch Sukses, tapi data bukan array atau tidak ada key 'items'.",
          result
        ); // Log 4: Data aneh
      }

      setDataEkskul(dataArray);
    } catch (error) {
      // 4. Cek error jaringan (CORS, API mati, dll)
      console.error("Fetch Error (Blok Catch):", error); // Log 5: Error Jaringan
      setDataEkskul([]);
    }
  };

  // --- useEffect 1: HANYA UNTUK FETCH DATA ---
  useEffect(() => {
    fetchEkskuls();
  }, []); // <-- Dependency kosong

  // --- useEffect 2: HANYA UNTUK ANIMASI ---
  useEffect(() => {
    if (dataEkskul.length === 0) {
      console.log("Menunggu data... Animasi GSAP belum berjalan."); // Log 6: Menunggu
      return;
    }

    console.log("Data siap. Menjalankan animasi GSAP..."); // Log 7: GSAP Jalan

    const ctx = gsap.context(() => {
      // Animasi scroll trigger untuk cards
      gsap.fromTo(
        ".eskul-card",
        { opacity: 0, y: 50, scale: 0.9 }, // 'from'
        {
          // 'to'
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".eskul-grid",
            start: "top bottom-=100px",
            toggleActions: "play none none none",
          },
        }
      );

      // Hover effect untuk setiap card
      const cards = gsap.utils.toArray<HTMLElement>(".eskul-card");
      const listeners: Array<{
        element: HTMLElement;
        moveHandler: (e: MouseEvent) => void;
        leaveHandler: () => void;
      }> = [];

      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            rotationY: (x / rect.width) * 20,
            rotationX: (-y / rect.height) * 20,
            transformPerspective: 1000,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.5,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            ease: "elastic.out(1, 0.5)",
            duration: 1.2,
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        listeners.push({
          element: card,
          moveHandler: handleMouseMove,
          leaveHandler: handleMouseLeave,
        });
      });

      return () => {
        listeners.forEach(({ element, moveHandler, leaveHandler }) => {
          element.removeEventListener("mousemove", moveHandler);
          element.removeEventListener("mouseleave", leaveHandler);
        });
      };
    }, main);

    return () => ctx.revert();
  }, [dataEkskul]); // <-- KUNCI: Jalankan ulang efek ini saat dataEkskul berubah

  // --- BAGIAN RENDER (JSX) ---
  return (
    <div
      ref={main}
      className="min-h-screen p-8 md:p-12 lg:p-16 text-slate-800 dark:text-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Temukan <span className="text-blue-500">Passion</span> dan{" "}
            <span className="text-purple-500">Bakatmu</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            SMKN 2 Surabaya menyediakan berbagai ekstrakurikuler untuk
            mengembangkan minat, bakat, dan karakter siswa di luar kegiatan
            akademik.
          </p>
        </motion.div>

        <div className="eskul-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {dataEkskul.map((item) => (
            <div key={item.ExtraID} className="eskul-card">
              <Link
                href={`/eskul/${item.ExtraName}?=${item.ExtraID}`}
                className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 relative group overflow-hidden transition-colors duration-300 hover:border-blue-500 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600`}
                    >
                      <span className="text-2xl font-bold">
                        {item.ExtraName.charAt(0)}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-gray-100">
                      {item.ExtraName}
                    </h3>

                    {/* ===== INI PERBAIKANNYA ===== */}
                    <p className="mt-2 text-slate-600 dark:text-gray-400 text-sm">
                      {item.ExtraSchedule}
                    </p>
                    {/* ============================= */}
                  </div>
                </div>

                <div className="mt-4 z-10">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-300">
                    Selengkapnya
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>

                <div
                  className={`absolute -bottom-10 -right-10 w-28 h-28 bg-blue-100 rounded-full opacity-10 transition-all duration-500 ease-in-out group-hover:opacity-20 group-hover:scale-150`}
                ></div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
