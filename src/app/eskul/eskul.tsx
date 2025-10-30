"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Daftar Eskul disesuaikan berdasarkan list pada gambar
const eskulData = [
  {
    id: "basket",
    title: "Basket",
    description:
      "Olahraga basket yang melatih kerja sama tim, strategi, dan kemampuan fisik melalui permainan dinamis.",
    emoji: "🏀",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "futsal",
    title: "Futsal",
    description:
      "Olahraga futsal yang melatih kecepatan, teknik, dan koordinasi tim dalam permainan sepak bola indoor.",
    emoji: "⚽",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "badminton",
    title: "Badminton",
    description:
      "Olahraga bulu tangkis untuk mengasah ketangkasan, kecepatan, dan strategi permainan kompetitif.",
    emoji: "🏸",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "perisai-diri",
    title: "Perisai Diri", // Dianggap sebagai Seni Bela Diri/Pencak Silat
    description:
      "Seni bela diri Perisai Diri yang melatih pertahanan diri, kedisiplinan, dan kekuatan mental serta fisik.",
    emoji: "🥋",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "volly",
    title: "Volly",
    description:
      "Olahraga bola voli yang melatih koordinasi, refleks, dan kekompakan tim dalam permainan.",
    emoji: "🏐",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "dance",
    title: "Dance (Modern/Koreografi)", // Mengganti 'Dance' menjadi konteks yang lebih spesifik
    description:
      "Seni tari modern yang mengembangkan ekspresi, kreativitas, dan kepercayaan diri melalui gerakan koreografi.",
    emoji: "💃",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "paskibra",
    title: "Paskibra",
    description:
      "Pasukan Pengibar Bendera yang melatih kedisiplinan, keberanian, dan jiwa patriotisme.",
    emoji: "🚩",
    color: "from-red-500 to-rose-600",
  },
  {
    id: "elite-robotik",
    title: "ELITE (Robotik)",
    description:
      "Kegiatan robotik yang mengembangkan keterampilan dalam pemrograman, elektronika, dan perancangan mekanik.",
    emoji: "🤖",
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: "band",
    title: "Band",
    description:
      "Wadah bermusik bersama untuk mengekspresikan kreativitas melalui harmonisasi alat musik modern.",
    emoji: "🎸",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "pramuka",
    title: "Pramuka",
    description:
      "Kegiatan kepramukaan yang mengajarkan kepemimpinan, kemandirian, dan keterampilan survival di alam terbuka.",
    emoji: "⛺",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "tari",
    title: "Tari (Tradisional)", // Mengganti 'Tari' menjadi konteks yang lebih spesifik
    description:
      "Pelestarian tari tradisional Indonesia yang kaya akan nilai budaya dan filosofi nusantara.",
    emoji: "🎭",
    color: "from-fuchsia-500 to-violet-500",
  },
  {
    id: "jurnalistik",
    title: "Jurnalistik",
    description:
      "Kegiatan jurnalistik yang melatih kemampuan menulis, meliput berita, dan menyebarkan informasi.",
    emoji: "📰",
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "esport",
    title: "Esport",
    description:
      "Wadah bagi gamer kompetitif untuk melatih strategi, kerja sama tim, dan fokus dalam turnamen game.",
    emoji: "🎮",
    color: "from-red-600 to-gray-800",
  },
  {
    id: "sbl",
    title: "SBL (Sekolah Berwawasan Lingkungan)",
    description:
      "Kegiatan yang berfokus pada kesadaran lingkungan, konservasi, dan proyek-proyek hijau di sekolah.",
    emoji: "🌳",
    color: "from-lime-500 to-green-600",
  },
];

export default function EskulPage() {
  const main = useRef<HTMLDivElement>(null);
  const [dataEkskul, setDataEkskul] = useState([]); // Variabel ini sekarang tidak digunakan untuk data, tapi dipertahankan jika ada kebutuhan API di masa depan

  useEffect(() => {
    // Mematikan fetch API yang tidak perlu jika menggunakan data lokal
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/majors`)
    //   .then((res) => res.json())
    //   .then((result) => setDataEkskul(result.items))
    //   .catch(console.error);

    const ctx = gsap.context(() => {
      // Animasi scroll trigger untuk cards
      gsap.fromTo(
        ".eskul-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
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
  }, []);

  // Logika log dihapus karena dataEkskul tidak diisi dari fetch
  // if (dataEkskul) {
  //   console.log(dataEkskul);
  // } else console.log("eskul data still kosong");

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
          {eskulData.map((item) => (
            <div key={item.id} className="eskul-card opacity-0">
              <Link
                href={`/eskul/${item.id}`}
                className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 relative group overflow-hidden transition-colors duration-300 hover:border-blue-500 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-linear-to-br ${item.color}`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
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
                  className={`absolute -bottom-10 -right-10 w-28 h-28 bg-linear-to-br ${item.color} rounded-full opacity-10 transition-all duration-500 ease-in-out group-hover:opacity-20 group-hover:scale-150`}
                ></div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
