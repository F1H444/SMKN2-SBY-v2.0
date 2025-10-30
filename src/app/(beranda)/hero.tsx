// ============================================
// app/(home)/hero.tsx - OPTIMIZED VERSION
// ============================================

// PERUBAHAN YANG DILAKUKAN:
// 1. [OPTIMASI REACT] Menghapus `React.memo` dari `Badge` dan `Statistics`. Komponen ini tidak menerima props dan datanya statis, sehingga tidak akan pernah di-render ulang kecuali parent-nya (HeroSection) di-render ulang. `memo` di sini hanya menambah overhead perbandingan.
// 2. [OPTIMASI CSS] Menambahkan `will-change: transform` pada elemen dengan transisi/animasi `hover` (tombol CTA dan ikon panah) untuk memberi petunjuk pada browser agar mengoptimalkan (menggunakan GPU).
// 3. [OPTIMASI IMAGE] Menambahkan `sizes="100vw"` pada LCP `next/image`. Ini adalah best practice untuk gambar dengan `fill` yang memenuhi viewport, membantu browser memprioritaskan download gambar dengan ukuran yang tepat.

// FULL OPTIMIZED CODE:
// app/(home)/hero.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const ArrowIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M5 12h12m-4-4 4 4-4 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// [OPTIMASI] React.memo tidak diperlukan untuk komponen statis tanpa props.
const Badge = () => (
  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3 py-1.5 backdrop-blur-[2px] dark:border-gray-700 dark:bg-gray-800/60">
    <span className="h-2 w-2 rounded-full bg-purple-500" />
    <p className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400 sm:text-sm">
      Akreditasi A
    </p>
  </div>
);
Badge.displayName = "Badge";

const STATS = [
  { value: "2000+", label: "Siswa Aktif" },
  { value: "50+", label: "Guru Pengajar" },
  { value: "11", label: "Program Keahlian" },
];

// [OPTIMASI] React.memo tidak diperlukan untuk komponen statis tanpa props.
const Statistics = () => (
  <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
    {STATS.map((stat) => (
      <div
        key={stat.label}
        className="rounded-2xl border border-gray-200 bg-white/60 px-3 py-4 backdrop-blur-[2px] dark:border-gray-700 dark:bg-gray-800/60 sm:px-5 sm:py-6"
      >
        <p className="mb-1 bg-gradient-to-br from-purple-600 to-purple-400 bg-clip-text text-2xl font-extrabold text-transparent dark:from-purple-400 dark:to-purple-300 sm:text-4xl lg:text-5xl">
          {stat.value}
        </p>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm lg:text-base">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
);
Statistics.displayName = "Statistics";

export default function HeroSection() {
  return (
    <section
      className={`${inter.className} relative w-full min-h-svh overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950`}
    >
      <div className="absolute inset-0">
        <Image
          src="/img/smkn2.webp"
          alt="" // alt kosong karena murni dekoratif
          fill
          priority // [SANGAT PENTING] Memuat gambar ini sebagai LCP
          placeholder="blur"
          quality={80}
          className="object-cover object-center opacity-20 select-none dark:opacity-10"
          blurDataURL="data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAQCdASoIAAUAAkA4JaQAA3AD/uA3AA/cAD/9oA/9oAP/oAf/tAD/9oA/9oA/9gA/9gA/9gA/9gA/9gA/9gA/9gA/9gA/9gA/9gA+AA/cAAA"
          sizes="100vw" // [OPTIMASI] Menambahkan sizes prop untuk `fill`
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/50 to-purple-50/30 dark:from-gray-950/90 dark:via-gray-950/60 dark:to-purple-950/30" />
      </div>

      <div className="relative z-10 flex min-h-svh items-center">
        <div className="container mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-16">
          <div className="max-w-3xl">
            <Badge />
            <h1 className="mb-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Membangun Generasi{" "}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-purple-400">
                Terampil & Profesional
              </span>
            </h1>
            <p className="mb-8 max-w-2xl text-balance text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg lg:text-xl">
              Sekolah Menengah Kejuruan unggulan yang mengintegrasikan
              pendidikan karakter, kompetensi teknis, dan kesiapan industri.
            </p>
            <Link
              href="#state"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-purple-600 will-change-transform" // [OPTIMASI CSS] will-change untuk hover
            >
              <span>Jelajahi Sekolah Kami</span>
              <ArrowIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 will-change-transform" />
            </Link>
            <Statistics />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
    </section>
  );
}

// PENJELASAN DETAIL:
// - **`React.memo` Removal:** Menghapus `memo` yang tidak perlu akan sedikit mengurangi *memory footprint* dan kompleksitas.
// - **`will-change: transform`:** Memberi petunjuk pada browser untuk mempromosikan tombol CTA dan ikon panah ke *layer compositor* mereka sendiri, membuat animasi `translate-y` dan `translate-x` lebih mulus (bebas jank) karena dijalankan di GPU.
// - **`sizes="100vw"`:** Memastikan browser mengunduh gambar LCP dengan resolusi yang tepat sesegera mungkin.
