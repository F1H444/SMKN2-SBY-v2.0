// app/(home)/others.tsx (Full Code - Optimized)

"use client";
import { useState, useRef, useEffect, memo } from "react";
import React from "react";

// --- TYPE DEFINITIONS ---
interface Jurusan {
  id: number;
  title: string;
  icon: string;
  description: string;
  color: string;
}
interface Eskul {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  participants: string;
}
interface Achievement {
  id: number;
  title: string;
  event: string;
  icon: string;
  bgColor: string;
}
interface News {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

// --- DATA STATIS DIDEFINISIKAN DI LUAR KOMPONEN ---
const jurusanData: Jurusan[] = [
  {
    id: 1,
    title: "Rekayasa Perangkat Lunak",
    icon: "RPL",
    description:
      "Mempelajari pengembangan, pemeliharaan, dan manajemen kualitas perangkat lunak.",
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Teknik Komputer & Jaringan",
    icon: "TKJ",
    description:
      "Fokus pada perancangan, instalasi, dan konfigurasi infrastruktur jaringan dan server.",
    color: "bg-green-600",
  },
  {
    id: 3,
    title: "Teknik Pemesinan",
    icon: "TPM",
    description:
      "Mengasah keterampilan produksi manufaktur menggunakan mesin perkakas presisi.",
    color: "bg-slate-600",
  },
  {
    id: 4,
    title: "Teknik Sepeda Motor",
    icon: "TSM",
    description:
      "Spesialisasi dalam perawatan, perbaikan, dan modifikasi teknologi sepeda motor.",
    color: "bg-orange-600",
  },
  {
    id: 5,
    title: "Teknik Kendaraan Ringan",
    icon: "TKR",
    description:
      "Memperdalam tenaga ahli di bidang perawatan dan perbaikan mobil modern.",
    color: "bg-red-600",
  },
  {
    id: 6,
    title: "Desain Pemodelan & Info Bangunan",
    icon: "DPIB",
    description:
      "Mempelajari perancangan bangunan, pemodelan 3D, dan manajemen informasi konstruksi (BIM).",
    color: "bg-amber-600",
  },
  {
    id: 7,
    title: "Teknik Konstruksi & Perumahan",
    icon: "TKP",
    description:
      "Fokus pada pelaksanaan, pengawasan, dan manajemen proyek konstruksi.",
    color: "bg-teal-600",
  },
  {
    id: 8,
    title: "Animasi",
    icon: "ANI",
    description:
      "Mengembangkan kreativitas dalam pembuatan animasi 2D, 3D, dan efek visual.",
    color: "bg-purple-600",
  },
  {
    id: 9,
    title: "Teknik Elektronika Industri",
    icon: "TEI",
    description:
      "Mempelajari perancangan, perakitan, dan pemeliharaan sistem kontrol elektronik.",
    color: "bg-indigo-600",
  },
  {
    id: 10,
    title: "Teknik Audio Video",
    icon: "TAV",
    description:
      "Fokus pada perbaikan, instalasi, dan perawatan perangkat elektronik audio dan video.",
    color: "bg-fuchsia-600",
  },
  {
    id: 11,
    title: "Teknik Instalasi Tenaga Listrik",
    icon: "TITL",
    description:
      "Berfokus pada instalasi, pemeliharaan, dan perbaikan sistem tenaga listrik.",
    color: "bg-sky-600",
  },
];
const eskulData: Eskul[] = [
  {
    id: 1,
    name: "Ambalan (Pramuka)",
    description:
      "Mengajarkan kepemimpinan, kemandirian, dan keterampilan bertahan hidup.",
    icon: "🏕️",
    color: "bg-green-700",
    participants: "50+ Siswa",
  },
  {
    id: 2,
    name: "Badminton",
    description:
      "Mengasah ketangkasan, kecepatan, dan strategi permainan kompetitif.",
    icon: "🏸",
    color: "bg-orange-600",
    participants: "35+ Siswa",
  },
  {
    id: 3,
    name: "Band",
    description:
      "Wadah bermusik bersama untuk mengekspresikan kreativitas dan harmoni.",
    icon: "🎸",
    color: "bg-purple-600",
    participants: "20+ Siswa",
  },
  {
    id: 4,
    name: "Basket",
    description: "Melatih kerja sama tim, strategi, dan kemampuan fisik.",
    icon: "🏀",
    color: "bg-red-600",
    participants: "40+ Siswa",
  },
  {
    id: 5,
    name: "Dance (Tari)",
    description: "Mengembangkan ekspresi, kreativitas, dan kepercayaan diri.",
    icon: "💃",
    color: "bg-pink-600",
    participants: "30+ Siswa",
  },
  {
    id: 6,
    name: "Futsal",
    description:
      "Melatih kecepatan, teknik, dan koordinasi tim dalam sepak bola indoor.",
    icon: "⚽",
    color: "bg-blue-600",
    participants: "45+ Siswa",
  },
  {
    id: 7,
    name: "Jurnalis",
    description:
      "Melatih kemampuan menulis, meliput berita, dan menyebarkan informasi.",
    icon: "📰",
    color: "bg-slate-600",
    participants: "25+ Siswa",
  },
  {
    id: 8,
    name: "Paskibra",
    description: "Melatih kedisiplinan, keberanian, dan jiwa patriotisme.",
    icon: "🇮🇩",
    color: "bg-red-700",
    participants: "35+ Siswa",
  },
  {
    id: 9,
    name: "Seni Bela Diri",
    description:
      "Melatih pertahanan diri, disiplin, dan kekuatan mental serta fisik.",
    icon: "🥋",
    color: "bg-amber-600",
    participants: "30+ Siswa",
  },
  {
    id: 10,
    name: "Voli",
    description: "Melatih koordinasi, refleks, dan kekompakan tim.",
    icon: "🏐",
    color: "bg-teal-600",
    participants: "38+ Siswa",
  },
];
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
const newsData: News[] = [
  {
    id: 1,
    title: "SMKN 2 Surabaya Raih Akreditasi A",
    date: "15 Sep 2024",
    excerpt:
      "Prestasi membanggakan dengan akreditasi A dari BAN-SM untuk seluruh program keahlian.",
  },
  {
    id: 2,
    title: "MoU dengan Industri Jepang",
    date: "22 Agu 2024",
    excerpt:
      "Kerjasama internasional membuka peluang magang dan sertifikasi siswa di Jepang.",
  },
  {
    id: 3,
    title: "Workshop AI dan Machine Learning",
    date: "10 Agu 2024",
    excerpt:
      "Siswa RPL dan TKJ mengikuti pelatihan intensif teknologi AI dari pakar industri.",
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
  <section className="scroll-section perf-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div className="max-w-6xl w-full">
      <div className="glass-effect-light rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 sm:h-80 md:h-full overflow-hidden">
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
          <div className="p-6 sm:p-8 lg:p-12 text-gray-900 dark:text-white">
            <span className="inline-block px-4 py-1.5 bg-indigo-600 text-white text-xs sm:text-sm font-bold rounded-full mb-4">
              Profil Sekolah
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 leading-tight text-gray-900 dark:text-white text-balance">
              Sekolah Kejuruan Terdepan di Indonesia
            </h2>
            <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              SMK Negeri 2 Surabaya adalah institusi pendidikan vokasi tertua di
              Jawa Timur, berdiri sejak era kolonial Belanda dengan nama
              Koningen Emma School (KES).
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
    <section className="scroll-section perf-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
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
        <div className="relative">
          <button
            onClick={() => onScroll("left")}
            className="scroll-btn absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect-light flex items-center justify-center text-gray-900 dark:text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800"
            aria-label="Scroll left"
          >
            <ArrowIcon direction="left" />
          </button>
          <div
            ref={scrollRef}
            className="inner-scroll-container flex gap-4 sm:gap-6 overflow-x-auto px-12 sm:px-16 py-4"
          >
            {jurusanData.map((item) => (
              <div
                key={item.id}
                className="card-hover glass-effect-light rounded-xl sm:rounded-2xl p-5 flex-shrink-0 w-[75vw] sm:w-72 md:w-80"
              >
                <div
                  className={`w-14 h-14 rounded-lg ${item.color} flex items-center justify-center text-white font-bold text-sm mb-4 shadow-lg`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => onScroll("right")}
            className="scroll-btn absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect-light flex items-center justify-center text-gray-900 dark:text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800"
            aria-label="Scroll right"
          >
            <ArrowIcon direction="right" />
          </button>
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
    <section className="scroll-section perf-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <div className="text-center mb-6 sm:mb-10">
          <span className="inline-block px-4 py-1.5 bg-purple-600 text-white text-sm font-bold rounded-full mb-4">
            Aktivitas Siswa
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 text-balance">
            13 Ekstrakurikuler Pilihan
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-3xl mx-auto px-4">
            Kembangkan bakat dan minat di luar jam pelajaran akademik.
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => onScroll("left")}
            className="scroll-btn absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect-light flex items-center justify-center text-gray-900 dark:text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 dark:focus-visible:ring-offset-gray-800"
            aria-label="Scroll left"
          >
            <ArrowIcon direction="left" />
          </button>
          <div
            ref={scrollRef}
            className="inner-scroll-container flex gap-4 sm:gap-6 overflow-x-auto px-12 sm:px-16 py-4"
          >
            {eskulData.map((item) => (
              <div
                key={item.id}
                className="card-hover glass-effect-light rounded-xl sm:rounded-2xl p-5 flex-shrink-0 w-[75vw] sm:w-72 md:w-80"
              >
                <div
                  className={`w-14 h-14 rounded-lg ${item.color} flex items-center justify-center text-white font-bold text-base mb-4 shadow-md`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="flex items-center text-sm text-gray-600 dark:text-slate-400">
                  <span className="mr-2" aria-hidden="true">
                    👥
                  </span>
                  {item.participants}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onScroll("right")}
            className="scroll-btn absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect-light flex items-center justify-center text-gray-900 dark:text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 dark:focus-visible:ring-offset-gray-800"
            aria-label="Scroll right"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  )
);
EskulSection.displayName = "EskulSection";

const AchievementsSection = memo(() => (
  <section className="scroll-section perf-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div className="max-w-4xl w-full h-full flex flex-col justify-center">
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
      <div className="space-y-4 sm:space-y-5 w-full">
        {achievementsData.map((item) => (
          <div
            key={item.id}
            className={`card-hover ${item.bgColor} rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-xl flex items-center gap-5`}
          >
            <div className="text-4xl sm:text-5xl flex-shrink-0">
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold mb-1">
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

const NewsSection = memo(() => (
  <section className="scroll-section perf-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div className="max-w-4xl w-full h-full flex flex-col justify-center">
      <div className="text-center mb-8 md:mb-12">
        <span className="inline-block px-4 py-1.5 bg-teal-600 text-white text-sm font-bold rounded-full mb-4">
          Berita Terkini
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 text-balance">
          Kabar Terbaru
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-2xl mx-auto px-4">
          Update kegiatan dan pencapaian sekolah.
        </p>
      </div>
      <div className="space-y-4 sm:space-y-5 w-full">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="card-hover glass-effect-light rounded-xl sm:rounded-2xl p-5 sm:p-7"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              {item.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400 pt-4 border-t border-gray-300/30 dark:border-white/10">
              <span>📅 {item.date}</span>
              <button className="text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 dark:focus-visible:ring-offset-gray-800">
                Baca Selengkapnya →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));
NewsSection.displayName = "NewsSection";

// --- KOMPONEN UTAMA ---
const Others = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const jurusanScrollRef = useRef<HTMLDivElement>(null);
  const eskulScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
        const scrollAmount = ref.current.clientWidth * 0.75;
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
        .scroll-btn:active {
          transform: translateY(-50%) scale(0.95);
        }
        .text-balance {
          text-wrap: balance;
        }
      `}</style>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200/30 dark:bg-white/5 z-50">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-150 ease-linear"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <div
          ref={scrollContainerRef}
          className="horizontal-scroll-container h-full w-full overflow-x-hidden flex"
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
          <NewsSection />
        </div>
      </div>
    </div>
  );
};
export default memo(Others);
