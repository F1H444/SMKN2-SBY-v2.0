// ============================================
// app/(home)/others.tsx - OPTIMIZED VERSION
// ============================================

// PERUBAHAN YANG DILAKUKAN:
// 1. [OPTIMASI BUNDLE] Impor `lucide-react` dikembalikan ke impor standar (e.g., `import { Code } from "lucide-react"`). Optimasi bundle (tree-shaking) akan ditangani secara otomatis oleh Next.js melalui `next.config.js`.
// 2. [OPTIMASI REACT] Semua optimasi `memo` dan `useRef` dipertahankan untuk mencegah re-render yang tidak perlu saat scroll.
// 3. [OPTIMASI CSS] Penggunaan `contain: content` dan `will-change: transform` pada section-section dipertahankan untuk performa rendering dan animasi yang lebih baik.

// FULL OPTIMIZED CODE:
"use client";
import { useState, useRef, useEffect, memo } from "react";
import React from "react";
import Link from "next/link";
// [OPTIMASI BUNDLE] Impor ikon standar. Tree-shaking ditangani oleh next.config.js
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
} from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Jurusan {
  id: string;
  short: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}
interface Eskul {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
}
interface Achievement {
  id: number;
  title: string;
  event: string;
  icon: string;
  bgColor: string;
}

// --- DATA STATIS DIDEFINISIKAN DI LUAR KOMPONEN ---

// Data jurusan
const jurusanData: Jurusan[] = [
  {
    id: "rpl",
    short: "RPL",
    title: "Rekayasa Perangkat Lunak",
    description:
      "Mempelajari pengembangan, pemeliharaan, dan manajemen kualitas perangkat lunak.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "tkj",
    short: "TKJ",
    title: "Teknik Komputer dan Jaringan",
    description:
      "Fokus pada perancangan, instalasi, dan konfigurasi infrastruktur jaringan.",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "tpm",
    short: "TPM",
    title: "Teknik Pemesinan",
    description:
      "Mengasah keterampilan produksi manufaktur menggunakan mesin perkakas presisi.",
    icon: Wrench,
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "tsm",
    short: "TSM",
    title: "Teknik Sepeda Motor",
    description:
      "Spesialisasi dalam perawatan, perbaikan, dan modifikasi sepeda motor.",
    icon: Bike,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "tkr",
    short: "TKR",
    title: "Teknik Kendaraan Ringan",
    description:
      "Mempersiapkan tenaga ahli di bidang perawatan dan perbaikan mobil modern.",
    icon: Car,
    color: "from-red-500 to-rose-500",
  },
  {
    id: "dpib",
    short: "DPIB",
    title: "Desain Pemodelan & Info Bangunan",
    description:
      "Mempelajari perancangan bangunan, pemodelan 3D, dan manajemen BIM.",
    icon: Building,
    color: "from-yellow-500 to-lime-500",
  },
  {
    id: "tkp",
    short: "TKP",
    title: "Teknik Konstruksi & Perumahan",
    description: "Fokus pada pelaksanaan dan pengawasan proyek konstruksi.",
    icon: Home,
    color: "from-stone-500 to-neutral-500",
  },
  {
    id: "animasi",
    short: "ANI",
    title: "Animasi",
    description:
      "Mengembangkan kreativitas dalam pembuatan animasi 2D, 3D, dan efek visual.",
    icon: ImageIcon,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "tei",
    short: "TEI",
    title: "Teknik Elektronika Industri",
    description:
      "Mempelajari perancangan dan pemeliharaan sistem kontrol elektronik.",
    icon: CircuitBoard,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "tav",
    short: "TAV",
    title: "Teknik Audio Video",
    description:
      "Fokus pada perbaikan, instalasi, dan perawatan perangkat audio visual.",
    icon: Video,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "titl",
    short: "TITL",
    title: "Teknik Instalasi Tenaga Listrik",
    description: "Berfokus pada instalasi dan perbaikan sistem tenaga listrik.",
    icon: Zap,
    color: "from-sky-500 to-indigo-500",
  },
];

// Data eskul
const eskulData: Eskul[] = [
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
    title: "Perisai Diri",
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
    title: "Dance (Modern/Koreografi)",
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
    title: "Tari (Tradisional)",
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

// Data prestasi
const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "Juara 1 Lomba Kompetensi Siswa",
    event: "LKS Tingkat Provinsi Jawa Timur",
    icon: "🏆",
    bgColor: "bg-yellow-600",
  },
  {
    id: 2,
    title: "Medali Emas Robotika Nasional",
    event: "Kompetisi Robot Indonesia",
    icon: "🤖",
    bgColor: "bg-blue-600",
  },
  {
    id: 3,
    title: "Juara Umum Basket Regional",
    event: "Turnamen Antar SMK Se-Jatim",
    icon: "🏀",
    bgColor: "bg-orange-600",
  },
  {
    id: 4,
    title: "Best Animation Film Festival",
    event: "Festival Film Pelajar Nasional",
    icon: "🎬",
    bgColor: "bg-purple-600",
  },
];

// --- SUB-KOMPONEN YANG DI-MEMOIZE ---
const ArrowIcon = memo(
  ({ direction = "right" }: { direction?: "left" | "right" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  )
);
ArrowIcon.displayName = "ArrowIcon";

const ProfileSection = memo(() => (
  <section className="scroll-section perf-section flex-shrink-0 w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
    <div className="max-w-6xl w-full">
      <div className="glass-effect-light rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2">
          <div className="relative h-48 sm:h-64 md:h-full overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://assets.mixkit.co/videos/preview/mixkit-students-in-a-classroom-studying-4968-large.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/video/profilsekolah.webm" type="video/webm" />
              <source src="/video/profilsekolah.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-4 py-6 sm:p-8 lg:p-12 text-gray-900 dark:text-white">
            <span className="inline-block px-4 py-1.5 bg-indigo-600 text-white text-xs sm:text-sm font-bold rounded-full mb-4">
              Profil Sekolah
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black mb-4 leading-tight text-gray-900 dark:text-white text-balance">
              Sekolah Kejuruan Terdepan di Indonesia
            </h2>
            <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              SMK Negeri 2 Surabaya adalah institusi pendidikan vokasi tertua di
              Jawa Timur, berdiri sejak era kolonial Belanda dengan nama
              Koningin Emma School (KES).
            </p>
            <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Berlokasi di Jl. Tentara Genie Pelajar No.26, Surabaya. Kami
              berkomitmen menghasilkan lulusan berkualitas tinggi.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="px-3 sm:px-4 py-2 glass-effect-light rounded-lg font-semibold text-xs sm:text-sm text-gray-800 dark:text-white">
                ✓ Akreditasi A
              </span>
              <span className="px-3 sm:px-4 py-2 glass-effect-light rounded-lg font-semibold text-xs sm:text-sm text-gray-800 dark:text-white">
                ✓ Sertifikasi ISO
              </span>
              <span className="px-3 sm:px-4 py-2 glass-effect-light rounded-lg font-semibold text-xs sm:text-sm text-gray-800 dark:text-white">
                ✓ Link & Match Industri
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));
ProfileSection.displayName = "ProfileSection";

const JurusanSection = memo(
  ({
    scrollRef,
    onScroll,
  }: {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    onScroll: (dir: "left" | "right") => void;
  }) => (
    <section className="scroll-section perf-section flex-shrink-0 w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-6 sm:mb-10">
          <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full mb-4">
            Program Keahlian
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 text-balance">
            11 Kompetensi Keahlian Unggulan
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-3xl mx-auto px-4">
            Pilih jurusan sesuai passion dan raih masa depan cemerlang.
          </p>
        </div>
        <div>
          <div
            ref={scrollRef}
            className="inner-scroll-container snap-x-mandatory flex gap-4 sm:gap-6 overflow-x-auto py-4 px-4"
          >
            {jurusanData.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="card-hover snap-center glass-effect-light rounded-xl sm:rounded-2xl p-5 flex-shrink-0 w-[85vw] sm:w-80 md:w-96"
                >
                  <div
                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm mb-4 shadow-lg`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => onScroll("left")}
              className="scroll-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect-light flex items-center justify-center text-gray-900 dark:text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800"
              aria-label="Scroll left"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              onClick={() => onScroll("right")}
              className="scroll-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect-light flex items-center justify-center text-gray-900 dark:text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800"
              aria-label="Scroll right"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
);
JurusanSection.displayName = "JurusanSection";

const EskulSection = memo(
  ({
    scrollRef,
    onScroll,
  }: {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    onScroll: (dir: "left" | "right") => void;
  }) => (
    <section className="scroll-section perf-section flex-shrink-0 w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-6 sm:mb-10">
          <span className="inline-block px-4 py-1.5 bg-purple-600 text-white text-sm font-bold rounded-full mb-4">
            Aktivitas Siswa
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 text-balance">
            Ekstrakurikuler Pilihan
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-3xl mx-auto px-4">
            Kembangkan bakat dan minat di luar jam pelajaran akademik.
          </p>
        </div>
        <div>
          <div
            ref={scrollRef}
            className="inner-scroll-container snap-x-mandatory flex gap-4 sm:gap-6 overflow-x-auto py-4 px-4"
          >
            {eskulData.map((item) => (
              <div
                key={item.id}
                className="card-hover snap-center glass-effect-light rounded-xl sm:rounded-2xl p-5 flex-shrink-0 w-[85vw] sm:w-80 md:w-96"
              >
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-base mb-4 shadow-md`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => onScroll("left")}
              className="scroll-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect-light flex items-center justify-center text-gray-900 dark:text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 dark:focus-visible:ring-offset-gray-800"
              aria-label="Scroll left"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              onClick={() => onScroll("right")}
              className="scroll-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect-light flex items-center justify-center text-gray-900 dark:text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 dark:focus-visible:ring-offset-gray-800"
              aria-label="Scroll right"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
);
EskulSection.displayName = "EskulSection";

const AchievementsSection = memo(() => (
  <section className="scroll-section perf-section flex-shrink-0 w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
    <div className="max-w-6xl w-full">
      <div className="text-center mb-8 md:mb-12">
        <span className="inline-block px-4 py-1.5 bg-yellow-600 text-white text-sm font-bold rounded-full mb-4">
          Prestasi
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 text-balance">
          Pencapaian Terbaru
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-2xl mx-auto px-4">
          Kebanggaan sekolah di berbagai kompetisi.
        </p>
      </div>
      <div className="space-y-3 sm:space-y-5 w-full">
        {achievementsData.map((item) => (
          <div
            key={item.id}
            className={`card-hover ${item.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl flex items-center gap-4 sm:gap-5`}
          >
            <div className="text-3xl sm:text-5xl flex-shrink-0">
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-xl font-bold mb-1">
                {item.title}
              </h3>
              <p className="text-white/90 text-sm sm:text-base">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));
AchievementsSection.displayName = "AchievementsSection";

// Komponen Berita CTA
const NewsCtaSection = memo(() => (
  <section className="scroll-section perf-section flex-shrink-0 w-full min-w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
    <div className="max-w-6xl w-full">
      <div className="glass-effect-light rounded-2xl lg:rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <span className="inline-block px-4 py-1.5 bg-teal-600 text-white text-xs sm:text-sm font-bold rounded-full mb-4">
          Berita & Informasi
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 text-gray-900 dark:text-white text-balance">
          Ikuti Kabar Terbaru Kami
        </h2>
        <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          Lihat semua kegiatan, pengumuman, dan artikel terbaru dari SMKN 2
          Surabaya. Jangan lewatkan informasi penting!
        </p>
        <Link
          href="/berita"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Lihat Semua Berita
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </section>
));
NewsCtaSection.displayName = "NewsCtaSection";

// --- KOMPONEN UTAMA ---
const Others = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const jurusanScrollRef = useRef<HTMLDivElement>(null);
  const eskulScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // useEffect untuk memperbaiki scroll "mental" di mobile
  useEffect(() => {
    document.documentElement.style.overscrollBehaviorY = "none";
    return () => {
      document.documentElement.style.overscrollBehaviorY = "auto";
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const scrollableHeight =
              container.scrollHeight - window.innerHeight;
            if (scrollableHeight > 0) {
              const progress = Math.max(
                0,
                Math.min(1, -rect.top / scrollableHeight)
              );
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft =
                  progress *
                  (scrollContainerRef.current.scrollWidth -
                    scrollContainerRef.current.clientWidth);
              }
              setScrollProgress(progress * 100);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const createScrollHandler =
    (ref: React.RefObject<HTMLDivElement | null>) =>
    (direction: "left" | "right") => {
      if (ref.current) {
        const scrollAmount = ref.current.clientWidth * 0.9;
        ref.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <style jsx global>{`
        .horizontal-scroll-container,
        .inner-scroll-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .horizontal-scroll-container::-webkit-scrollbar,
        .inner-scroll-container::-webkit-scrollbar {
          display: none;
        }
        /* CSS untuk Scroll Snap */
        .snap-x-mandatory {
          scroll-snap-type: x mandatory;
          scroll-padding: 1rem;
        }
        .snap-center {
          scroll-snap-align: center;
        }
        .snap-start {
          scroll-snap-align: start;
        }

        .perf-section {
          contain: content;
        }
        .scroll-section {
          transform: translateZ(0);
          will-change: transform;
        }
        .card-hover {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover) {
          .card-hover:hover {
            transform: translateY(-8px);
          }
        }
        .glass-effect-light {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .dark .glass-effect-light {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .text-balance {
          text-wrap: balance;
        }
      `}</style>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200/30 dark:bg-white/5 z-50">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
        <div
          ref={scrollContainerRef}
          className="horizontal-scroll-container h-full w-full overflow-x-hidden flex items-center"
        >
          <ProfileSection />
          <JurusanSection
            scrollRef={jurusanScrollRef}
            onScroll={createScrollHandler(jurusanScrollRef)}
          />
          <EskulSection
            scrollRef={eskulScrollRef}
            onScroll={createScrollHandler(eskulScrollRef)}
          />
          <AchievementsSection />
          <NewsCtaSection />
        </div>
      </div>
    </div>
  );
};
export default memo(Others);
