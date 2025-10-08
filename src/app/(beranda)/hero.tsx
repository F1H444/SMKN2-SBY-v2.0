"use client";

import React, { useCallback } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  // gunakan useCallback agar fungsi tidak re-render
  const scrollToNextSection = useCallback(() => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const stats = [
    { value: "2000+", label: "Siswa Aktif" },
    { value: "50+", label: "Guru Pengajar" },
    { value: "11", label: "Program Keahlian" },
  ];

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      {/* Background Image (lazy di bawah fold) */}
      <div className="absolute inset-0">
        <img
          src="/img/smkn2.webp"
          alt="foto sekolah"
          className="w-full h-full object-cover object-center opacity-35 dark:opacity-20 select-none"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-purple-50/60 to-transparent dark:from-gray-900/95 dark:via-purple-950/60" />
      </div>

      {/* Aksen Lembut (blur dinonaktifkan di mobile) */}
      <div className="hidden sm:block absolute top-24 right-12 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl animate-pulse" />
      <div
        className="hidden sm:block absolute bottom-24 left-12 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "800ms" }}
      />

      {/* Konten */}
      <div className="relative z-10 flex items-center min-h-[100svh]">
        <div className="container mx-auto px-5 sm:px-6 lg:px-16 max-w-7xl">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 dark:bg-gray-800/70 backdrop-blur-md border border-purple-200/40 dark:border-purple-700/40 shadow-sm mb-6 transition-all duration-300 hover:scale-[1.03]">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Sekolah Dengan Akreditasi A
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.1] tracking-tight">
              <span className="block text-gray-900 dark:text-white">
                Membangun Generasi
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Terampil & Profesional
              </span>
            </h1>

            {/* Deskripsi */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Sekolah Menengah Kejuruan unggulan yang mengintegrasikan
              pendidikan karakter, kompetensi teknis, dan kesiapan industri.
            </p>

            {/* CTA */}
            <button
              onClick={scrollToNextSection}
              className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-7 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="relative">Jelajahi Sekolah Kami</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Statistik */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-12">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl px-4 py-5 sm:px-6 sm:py-6 border border-white/40 dark:border-gray-700/40 shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-br from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-28 pointer-events-none bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-gray-900/90 dark:via-gray-900/50 dark:to-transparent" />
    </section>
  );
}
