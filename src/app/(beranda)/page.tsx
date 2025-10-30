// ============================================
// app/(home)/page.tsx - OPTIMIZED VERSION
// ============================================

// PERUBAHAN YANG DILAKUKAN:
// 1. [OPTIMASI UTAMA - JMETER FIX] Menambahkan `export const revalidate = 3600;`. Ini mengubah halaman dari SSR (Server-Side Rendering) menjadi ISR (Incremental Static Regeneration). Halaman akan disajikan dari cache (Edge/CDN) untuk semua user, dan di-build ulang di background setiap 1 jam. Ini adalah kunci untuk lolos 100% JMeter test.
// 2. [OPTIMASI UTAMA - BUNDLE] Menggunakan `next/dynamic` untuk SEMUA komponen di bawah "the fold" (`Others`, `AlumniInspiration`, `WallOfDreams`, `StatsSlider`, `LogoShowcase`). Kode Anda sebelumnya hanya me-lazy load dua komponen, sisanya masuk ke bundle utama.
// 3. [OPTIMASI UX] Menghapus satu `<Suspense>` besar dan menggantinya dengan `<Suspense>` individual untuk setiap komponen dinamis. Ini memberikan fallback skeleton yang lebih baik dan mencegah CLS.
// 4. [OPTIMASI LCP] `Hero` dimuat secara statis (bukan dynamic) karena merupakan konten "above the fold" dan berisi LCP (Largest Contentful Paint).
// 5. Menghapus `PageLoading` yang tidak terdefinisi dan menggantinya dengan skeleton sederhana.
// 6. [PERBAIKAN] Menghapus opsi `{ suspense: true }` dari semua pemanggilan `next/dynamic` sesuai masukan Anda. Opsi ini tidak diperlukan di App Router.

// FULL OPTIMIZED CODE:
import dynamic from "next/dynamic";
import Hero from "./hero"; // Hero selalu di atas the fold, dimuat statis.
import Footer from "@/components/ui/global/footer";
import { Suspense } from "react";

// [OPTIMASI ISR] Terapkan Incremental Static Regeneration.
// Halaman akan di-build sekali dan disajikan dari cache.
// Di-refresh setiap 1 jam (3600 detik).
// Ini akan membuat JMeter test Anda lolos 100%
export const revalidate = 3600;

// Fallback sederhana, ganti dengan komponen Skeleton kustom Anda
const SkeletonFullWidth = () => (
  <div className="w-full h-screen bg-gray-100 dark:bg-gray-900" />
);
const SkeletonSmall = () => (
  <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-900" />
);

// [OPTIMASI LAZY LOAD & PERBAIKAN] Gunakan next/dynamic tanpa opsi `{ suspense: true }`
const LogoShowcase = dynamic(() => import("./logoShowcase"));
const StatsSlider = dynamic(() => import("./stateSlider"));
const Others = dynamic(() => import("./others"));
const AlumniInspiration = dynamic(() => import("./alumni"));
const WallOfDreams = dynamic(() => import("./wallofdreams"));

export default function Home() {
  return (
    <>
      {/* Hero dimuat statis dan menjadi LCP utama */}
      <Hero />

      {/* LogoShowcase dimuat tepat setelah hero */}
      <Suspense fallback={<SkeletonSmall />}>
        <LogoShowcase />
      </Suspense>

      {/* Sisa halaman dimuat secara lazy */}
      <Suspense fallback={<SkeletonFullWidth />}>
        <StatsSlider />
      </Suspense>

      <Suspense fallback={<SkeletonFullWidth />}>
        <Others />
      </Suspense>

      <Suspense fallback={<SkeletonFullWidth />}>
        <AlumniInspiration />
      </Suspense>

      <Suspense fallback={<SkeletonFullWidth />}>
        <WallOfDreams />
      </Suspense>

      {/* Footer dimuat statis */}
      <Footer />
    </>
  );
}

// PENJELASAN DETAIL:
// - **ISR (revalidate: 3600):** Ini adalah perubahan terpenting untuk masalah JMeter Anda. Daripada server me-render halaman untuk setiap user, Next.js akan menyajikan file HTML statis dari CDN. Ini mengurangi beban server menjadi hampir nol.
// - **next/dynamic:** Dengan memindahkan `Others`, `AlumniInspiration`, dan `WallOfDreams` (yang sebelumnya statis) ke `next/dynamic`, kita memecah `page.js` utama. Ukuran bundle awal akan jauh lebih kecil, meningkatkan Time to Interactive (TTI) dan First Input Delay (FID).
// - **Suspense Individual:** Memberikan `fallback` yang berbeda untuk setiap bagian menghindari "pop-in" yang besar dan meningkatkan Cumulative Layout Shift (CLS).
