"use client";

import { useEffect, useRef, useState } from "react"; // Kembalikan useState
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Code,
  Cpu,
  Wrench,
  Video,
  Building,
  Car,
  Bike,
  Home,
  CircuitBoard,
  Zap,
  ArrowRight,
  HelpCircle, // Ikon default jika ID tidak cocok
} from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- PERBAIKAN 1: Ubah data array menjadi 'kamus' (object) ---
// Ini untuk data presentasi (visual)
// Kuncinya (1, 2, 3) harus cocok dengan MajorID dari API
const jurusanVisuals: any = {
  1: { icon: Code, color: "from-blue-500 to-cyan-500" }, // RPL
  2: { icon: Cpu, color: "from-green-500 to-emerald-500" }, // TKJ
  3: { icon: Wrench, color: "from-slate-500 to-gray-600" }, // TPM
  4: { icon: Bike, color: "from-orange-500 to-amber-500" }, // TSM
  5: { icon: Car, color: "from-red-500 to-rose-500" }, // TKR
  6: { icon: Building, color: "from-yellow-500 to-lime-500" }, // DPIB
  7: { icon: Home, color: "from-stone-500 to-neutral-500" }, // TKP
  8: { icon: ImageIcon, color: "from-purple-500 to-violet-500" }, // Animasi
  9: { icon: CircuitBoard, color: "from-teal-500 to-cyan-500" }, // TEI
  10: { icon: Video, color: "from-fuchsia-500 to-pink-500" }, // TAV
  11: { icon: Zap, color: "from-sky-500 to-indigo-500" }, // TITL
};

// Fallback jika ada data API tapi visualnya tidak ada
const defaultVisual = { icon: HelpCircle, color: "from-gray-500 to-gray-600" };

export default function JurusanPage() {
  const main = useRef<HTMLDivElement>(null);

  // --- PERBAIKAN 2: State untuk menampung data GABUNGAN ---
  const [jurusanList, setJurusanList] = useState<any[]>([]);

  // --- PERBAIKAN 3: useEffect untuk FETCH dan GABUNGKAN data ---
  useEffect(() => {
    const fetchAndMergeMajors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/majors`
        );
        const result = await res.json();

        let apiData = [];
        // Cek jika API mengembalikan { data: [...] }
        if (result && Array.isArray(result.data)) {
          apiData = result.data;
        } else if (Array.isArray(result)) {
          apiData = result; // Atau jika API mengembalikan [...]
        } else {
          console.error("Format data API tidak terduga", result);
          return;
        }

        // Gabungkan data API dengan data visual
        const combinedData = apiData.map((major: any) => {
          const visual = jurusanVisuals[major.MajorID] || defaultVisual;
          return {
            ...major, // Data dari API (MajorID, MajorName, MajorDesc)
            ...visual, // Data dari 'kamus' (icon, color)
          };
        });

        setJurusanList(combinedData); // Simpan data gabungan ke state
      } catch (error) {
        console.error("Gagal mengambil data jurusan:", error);
      }
    };

    fetchAndMergeMajors();
  }, []); // <-- Dependency kosong, fetch hanya sekali

  // --- PERBAIKAN 4: useEffect untuk GSAP (terpisah) ---
  // Ini baru berjalan SETELAH 'jurusanList' terisi
  useEffect(() => {
    // Jangan jalankan animasi jika data belum siap
    if (jurusanList.length === 0) {
      return;
    }

    // Data sudah siap, jalankan animasi
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".jurusan-card",
        { opacity: 0, y: 50, scale: 0.95 }, // 'from'
        {
          // 'to'
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".jurusan-grid",
            start: "top bottom-=150px",
            toggleActions: "play none none none",
          },
        }
      );
    }, main);
    return () => ctx.revert();
  }, [jurusanList]); // <-- KUNCI: Jalankan ulang saat 'jurusanList' berubah

  return (
    <div
      ref={main}
      className="min-h-screen p-8 md:p-12 lg:p-16 bg-white dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Jelajahi <span className="text-blue-500">Minat</span> dan{" "}
            <span className="text-purple-500">Bakatmu</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            SMKN 2 Surabaya menawarkan {jurusanList.length} program keahlian
            yang dirancang untuk mempersiapkanmu menjadi profesional yang siap
            bersaing di dunia industri.
          </p>
        </motion.div>

        {/* --- PERBAIKAN 5: Render dari 'jurusanList' (state) --- */}
        <div className="jurusan-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {jurusanList.map((item) => {
            const IconComponent = item.icon; // Ikon dari data gabungan
            return (
              <div
                key={item.MajorID} // Key dari API
                className="jurusan-card" // Hapus opacity-0
                style={{ perspective: "1000px" }}
              >
                <Link
                  href={`/jurusan/${item.MajorName}?=${item.MajorID}`} // Link dari API
                  className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col justify-between block"
                >
                  <div>
                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center bg-linear-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-gray-100">
                        {item.MajorName} {/* Judul dari API */}
                      </h3>
                      <p className="mt-2 text-slate-600 dark:text-gray-400 text-sm">
                        {item.MajorDesc} {/* Deskripsi dari API */}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 z-10">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                      Selengkapnya
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute -bottom-10 -right-10 w-28 h-28 bg-linear-to-br ${item.color} rounded-full opacity-10 transition-all duration-500 ease-in-out group-hover:opacity-20 group-hover:scale-150`}
                  ></div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
