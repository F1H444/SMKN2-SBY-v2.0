"use client";
import { useState, useRef, useEffect } from "react";
import React from "react";

const Others = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Throttled mouse move handler
  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Optimized scroll logic
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const container = containerRef.current;
          const scrollContent = scrollContainerRef.current;
          if (!container || !scrollContent) return;

          const rect = container.getBoundingClientRect();
          const scrollableHeight = container.scrollHeight - window.innerHeight;
          const progress = Math.max(
            0,
            Math.min(1, -rect.top / scrollableHeight)
          );

          const horizontalScrollWidth =
            scrollContent.scrollWidth - scrollContent.clientWidth;
          scrollContent.scrollLeft = progress * horizontalScrollWidth;

          setScrollProgress(progress * 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // MODIFIKASI: Hapus kelas latar belakang dari div ini
    <div
      ref={containerRef}
      className="relative h-[600vh]"
      style={{
        ["--mouse-x" as string]: `${mousePosition.x}px`,
        ["--mouse-y" as string]: `${mousePosition.y}px`,
      } as React.CSSProperties}
    >
      <style jsx global>{`
        /* MODIFIKASI: Sesuaikan efek spotlight agar lebih transparan atau dinonaktifkan sesuai kebutuhan. */
        /* Jika ingin sepenuhnya transparan, Anda bisa menghapus properti background di sini */
        .spotlight-effect {
          /* background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(120, 81, 222, 0.1), /* Kurangi opacity */
            transparent 80%
          ); */
          /* Atau biarkan kosong jika Anda tidak ingin ada efek spotlight */
          background: transparent; /* Pilihan ini akan membuat latar belakang sepenuhnya transparan */
        }

        .dark .spotlight-effect {
          /* background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(120, 81, 222, 0.1), /* Kurangi opacity */
            transparent 80%
          ); */
          background: transparent; /* Pilihan ini akan membuat latar belakang sepenuhnya transparan */
        }

        .horizontal-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .horizontal-scroll-container::-webkit-scrollbar {
          display: none;
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

        /* Glass effect sudah cukup transparan */
        .glass-effect {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .dark .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Glass effect light juga sudah cukup transparan */
        .glass-effect-light {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .dark .glass-effect-light {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        video {
          will-change: transform;
        }

        @media (max-width: 768px) {
          .card-hover:active {
            transform: translateY(-4px);
          }
        }
      `}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* MODIFIKASI: Sesuaikan efek spotlight atau hapus jika ingin benar-benar transparan */}
        {/* Jika ingin ada spotlight tetapi transparan, uncomment bagian ini dan sesuaikan opacity-nya */}
        <div className="absolute inset-0 spotlight-effect">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200/30 dark:bg-white/5 z-50">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="horizontal-scroll-container h-full w-full overflow-x-hidden flex"
          >
            {/* Profile Section */}
            <section className="scroll-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div className="max-w-6xl w-full">
                <div className="glass-effect-light rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
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
                        <source
                          src="/video/profilsekolah.mp4"
                          type="video/mp4"
                        />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6 sm:p-8 md:p-12 text-gray-900 dark:text-white">
                      <span className="inline-block px-4 py-1 bg-indigo-600 text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4">
                        Profil Sekolah
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 leading-tight text-gray-900 dark:text-white">
                        Sekolah Kejuruan Terdepan di Indonesia
                      </h2>
                      <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                        SMK Negeri 2 Surabaya adalah institusi pendidikan vokasi
                        tertua di Jawa Timur, berdiri sejak era kolonial Belanda
                        dengan nama Koningen Emma School (KES).
                      </p>
                      <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                        Berlokasi di Jl. Tentara Genie Pelajar No.26, Surabaya.
                        Kami berkomitmen menghasilkan lulusan berkualitas
                        tinggi.
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect-light rounded-lg font-semibold text-xs sm:text-sm text-gray-800 dark:text-white">
                          ✓ Akreditasi A
                        </span>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect-light rounded-lg font-semibold text-xs sm:text-sm text-gray-800 dark:text-white">
                          ✓ Sertifikasi ISO
                        </span>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect-light rounded-lg font-semibold text-xs sm:text-sm text-gray-800 dark:text-white">
                          ✓ Link & Match Industri
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Jurusan Section */}
            <section className="scroll-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div className="max-w-7xl w-full h-full flex flex-col justify-center">
                <div className="text-center mb-6 sm:mb-10">
                  <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4">
                    Program Keahlian
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3">
                    11 Kompetensi Keahlian Unggulan
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-2xl mx-auto px-4">
                    Pilih jurusan sesuai passion dan raih masa depan cemerlang.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto pr-2 sm:pr-4">
                  {jurusan.map((item) => (
                    <div
                      key={item.id}
                      className="card-hover glass-effect-light rounded-xl sm:rounded-2xl p-4 sm:p-5"
                    >
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${item.color} flex items-center justify-center text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4 shadow-lg`}
                      >
                        {item.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Ekstrakurikuler Section */}
            <section className="scroll-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div className="max-w-7xl w-full h-full flex flex-col justify-center">
                <div className="text-center mb-6 sm:mb-10">
                  <span className="inline-block px-4 py-1.5 bg-purple-600 text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4">
                    Aktivitas Siswa
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3">
                    13 Ekstrakurikuler Pilihan
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-2xl mx-auto px-4">
                    Kembangkan bakat dan minat di luar jam pelajaran akademik.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto pr-2 sm:pr-4">
                  {eskul.map((item) => (
                    <div
                      key={item.id}
                      className="card-hover glass-effect-light rounded-xl sm:rounded-2xl p-4 sm:p-5"
                    >
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${item.color} flex items-center justify-center text-white font-bold text-sm sm:text-base mb-3 sm:mb-4 shadow-md`}
                      >
                        {item.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-600 dark:text-slate-400">
                        <span className="mr-1.5">👥</span>
                        {item.participants}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Prestasi Section */}
            <section className="scroll-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div className="max-w-4xl w-full h-full flex flex-col justify-center">
                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                  <span className="inline-block px-4 py-1.5 bg-yellow-600 text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4">
                    Prestasi
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Pencapaian Terbaru
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-2xl mx-auto px-4">
                    Kebanggaan sekolah di berbagai kompetisi.
                  </p>
                </div>
                <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-3xl mx-auto w-full">
                  {achievements.map((item) => (
                    <div
                      key={item.id}
                      className={`card-hover ${item.bgColor} rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 text-white shadow-xl flex items-center gap-4 sm:gap-5 md:gap-6`}
                    >
                      <div className="text-4xl sm:text-5xl md:text-6xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                          {item.title}
                        </h3>
                        <p className="text-white/90 text-sm sm:text-base">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* News Section */}
            <section className="scroll-section flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div className="max-w-4xl w-full h-full flex flex-col justify-center">
                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                  <span className="inline-block px-4 py-1.5 bg-teal-600 text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4">
                    Berita Terkini
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Kabar Terbaru
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-slate-300 max-w-2xl mx-auto px-4">
                    Update kegiatan dan pencapaian sekolah.
                  </p>
                </div>
                <div className="space-y-4 sm:space-y-5 max-w-3xl mx-auto w-full">
                  {news.map((item) => (
                    <div
                      key={item.id}
                      className="card-hover glass-effect-light rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7"
                    >
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-slate-400 pt-3 sm:pt-4 border-t border-gray-300/30 dark:border-white/10">
                        <span>📅 {item.date}</span>
                        <button className="text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                          Baca →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STATIC DATA ---
const jurusan = [
  {
    id: 1,
    title: "Rekayasa Perangkat Lunak",
    short: "RPL",
    description:
      "Mempelajari pengembangan, pemeliharaan, dan manajemen kualitas perangkat lunak secara sistematis.",
    icon: "RPL",
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Teknik Komputer dan Jaringan",
    short: "TKJ",
    description:
      "Fokus pada perancangan, instalasi, dan konfigurasi infrastruktur jaringan komputer dan server.",
    icon: "TKJ",
    color: "bg-green-600",
  },
  {
    id: 3,
    title: "Teknik Pemesinan",
    short: "TPM",
    description:
      "Mengasah keterampilan dalam proses produksi manufaktur menggunakan mesin perkakas presisi.",
    icon: "TPM",
    color: "bg-slate-600",
  },
  {
    id: 4,
    title: "Teknik Sepeda Motor",
    short: "TSM",
    description:
      "Spesialisasi dalam perawatan, perbaikan, dan modifikasi teknologi sepeda motor modern.",
    icon: "TSM",
    color: "bg-orange-600",
  },
  {
    id: 5,
    title: "Teknik Kendaraan Ringan",
    short: "TKR",
    description:
      "Memperdalam tenaga ahli di bidang perawatan dan perbaikan mobil modern.",
    icon: "TKR",
    color: "bg-red-600",
  },
  {
    id: 6,
    title: "Desain Pemodelan & Info Bangunan",
    short: "DPIB",
    description:
      "Mempelajari perancangan bangunan, pemodelan 3D, dan manajemen informasi konstruksi (BIM).",
    icon: "DPIB",
    color: "bg-amber-600",
  },
  {
    id: 7,
    title: "Teknik Konstruksi & Perumahan",
    short: "TKP",
    description:
      "Fokus pada pelaksanaan, pengawasan, dan manajemen proyek konstruksi gedung dan perumahan.",
    icon: "TKP",
    color: "bg-teal-600",
  },
  {
    id: 8,
    title: "Animasi",
    short: "ANI",
    description:
      "Mengembangkan kreativitas dalam pembuatan animasi 2D, 3D, dan efek visual untuk berbagai media.",
    icon: "ANI",
    color: "bg-purple-600",
  },
  {
    id: 9,
    title: "Teknik Elektronika Industri",
    short: "TEI",
    description:
      "Mempelajari perancangan, perakitan, dan pemeliharaan sistem kontrol elektronik di industri.",
    icon: "TEI",
    color: "bg-indigo-600",
  },
  {
    id: 10,
    title: "Teknik Audio Video",
    short: "TAV",
    description:
      "Fokus pada perbaikan, instalasi, dan perawatan perangkat elektronik audio dan video.",
    icon: "TAV",
    color: "bg-fuchsia-600",
  },
  {
    id: 11,
    title: "Teknik Instalasi Tenaga Listrik",
    short: "TITL",
    description:
      "Berfokus pada instalasi, pemeliharaan, dan perbaikan sistem tenaga listrik di gedung dan industri.",
    icon: "TITL",
    color: "bg-sky-600",
  },
];

const eskul = [
  {
    id: 1,
    name: "Ambalan (Pramuka)",
    description:
      "Kegiatan kepramukaan yang mengajarkan kepemimpinan, kemandirian, dan keterampilan survival di alam terbuka.",
    icon: "🏕️",
    color: "bg-green-700",
    participants: "50+ Siswa",
  },
  {
    id: 2,
    name: "Badminton",
    description:
      "Olahraga bulu tangkis untuk mengasah ketangkasan, kecepatan, dan strategi permainan kompetitif.",
    icon: "🏸",
    color: "bg-orange-600",
    participants: "35+ Siswa",
  },
  {
    id: 3,
    name: "Band",
    description:
      "Wadah bermusik bersama untuk mengekspresikan kreativitas melalui harmonisasi alat musik modern.",
    icon: "🎸",
    color: "bg-purple-600",
    participants: "20+ Siswa",
  },
  {
    id: 4,
    name: "Basket",
    description:
      "Olahraga basket yang melatih kerja sama tim, strategi, dan kemampuan fisik melalui permainan dinamis.",
    icon: "🏀",
    color: "bg-red-600",
    participants: "40+ Siswa",
  },
  {
    id: 5,
    name: "Dance (Tari)",
    description:
      "Seni tari yang mengembangkan ekspresi, kreativitas, dan kepercayaan diri melalui gerakan koreografi.",
    icon: "💃",
    color: "bg-pink-600",
    participants: "30+ Siswa",
  },
  {
    id: 6,
    name: "Futsal",
    description:
      "Olahraga futsal yang melatih kecepatan, teknik, dan koordinasi tim dalam permainan sepak bola indoor.",
    icon: "⚽",
    color: "bg-blue-600",
    participants: "45+ Siswa",
  },
  {
    id: 7,
    name: "Jurnalis",
    description:
      "Kegiatan jurnalistik yang melatih kemampuan menulis, meliput berita, dan menyebarkan informasi.",
    icon: "📰",
    color: "bg-slate-600",
    participants: "25+ Siswa",
  },
  {
    id: 8,
    name: "Paskibra",
    description:
      "Pasukan Pengibar Bendera yang melatih kedisiplinan, keberanian, dan jiwa patriotisme.",
    icon: "🇮🇩",
    color: "bg-red-700",
    participants: "35+ Siswa",
  },
  {
    id: 9,
    name: "SBL (Seni Bela Diri)",
    description:
      "Seni beladiri yang melatih pertahanan diri, disiplin, dan kekuatan mental serta fisik.",
    icon: "🥋",
    color: "bg-amber-600",
    participants: "30+ Siswa",
  },
  {
    id: 10,
    name: "SKI (Seni Karawitan)",
    description:
      "Seni musik tradisional Jawa yang melestarikan budaya melalui gamelan dan vokal.",
    icon: "🎵",
    color: "bg-lime-600",
    participants: "18+ Siswa",
  },
  {
    id: 11,
    name: "SKK (Seni Kriya Kayu)",
    description:
      "Seni kerajinan kayu yang mengasah kreativitas dalam menciptakan produk berbahan dasar kayu.",
    icon: "🪵",
    color: "bg-amber-700",
    participants: "22+ Siswa",
  },
  {
    id: 12,
    name: "Tari Tradisional",
    description:
      "Pelestarian tari tradisional Indonesia yang kaya akan nilai budaya dan filosofi nusantara.",
    icon: "🎭",
    color: "bg-violet-600",
    participants: "28+ Siswa",
  },
  {
    id: 13,
    name: "Voli",
    description:
      "Olahraga bola voli yang melatih koordinasi, refleks, dan kekompakan tim dalam permainan.",
    icon: "🏐",
    color: "bg-teal-600",
    participants: "38+ Siswa",
  },
];

const achievements = [
  {
    id: 1,
    title: "Juara 1 Lomba Kompetensi Siswa",
    event: "LKS Tingkat Provinsi Jawa Timur",
    year: "2024",
    category: "Teknik",
    icon: "🏆",
    bgColor: "bg-yellow-600",
  },
  {
    id: 2,
    title: "Medali Emas Robotika Nasional",
    event: "Kompetisi Robot Indonesia",
    year: "2024",
    category: "Teknologi",
    icon: "🤖",
    bgColor: "bg-blue-600",
  },
  {
    id: 3,
    title: "Juara Umum Basket Regional",
    event: "Turnamen Antar SMK Se-Jatim",
    year: "2024",
    category: "Olahraga",
    icon: "🏀",
    bgColor: "bg-orange-600",
  },
  {
    id: 4,
    title: "Best Animation Film Festival",
    event: "Festival Film Pelajar Nasional",
    year: "2024",
    category: "Seni",
    icon: "🎬",
    bgColor: "bg-purple-600",
  },
];

const news = [
  {
    id: 1,
    title: "SMKN 2 Surabaya Raih Akreditasi A",
    date: "15 Sep 2024",
    excerpt:
      "Prestasi membanggakan dengan akreditasi A dari BAN-SM untuk seluruh program keahlian.",
    category: "Prestasi",
  },
  {
    id: 2,
    title: "MoU dengan Industri Jepang",
    date: "22 Agu 2024",
    excerpt:
      "Kerjasama internasional membuka peluang magang dan sertifikasi siswa di Jepang.",
    category: "Kerjasama",
  },
  {
    id: 3,
    title: "Workshop AI dan Machine Learning",
    date: "10 Agu 2024",
    excerpt:
      "Siswa RPL dan SIJA mengikuti pelatihan intensif teknologi AI dari expert industri.",
    category: "Event",
  },
];

export default React.memo(Others);
