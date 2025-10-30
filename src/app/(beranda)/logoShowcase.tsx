// ============================================
// app/(home)/logoShowcase.tsx - OPTIMIZED VERSION
// ============================================

// PERUBAHAN YANG DILAKUKAN:
// 1. [OPTIMASI IMAGE] Menghapus `priority` dan `loading="eager"` dari `next/image`. Karena seluruh komponen `LogoShowcase` sekarang di-lazy load (dari `page.tsx`), tidak ada gambar di dalamnya yang boleh menjadi prioritas. Membiarkan `next/image` menggunakan default (`loading="lazy"`) adalah pilihan yang tepat.
// 2. [OPTIMASI CSS] Menambahkan `will-change: transform` ke `.animate-scroll` dalam `<style jsx>`. Animasi `translate3d` sudah baik (memicu GPU), `will-change` memberikan petunjuk tambahan ke browser.
// 3. [OPTIMASI PRELOAD] Menghapus `useEffect` yang melakukan preload manual (`<link rel="preload">`). `next/image` modern (terutama dengan `loading="lazy"`) memiliki strategi loading internal yang canggih. Preload manual seringkali justru mengganggu prioritas browser. `IntersectionObserver` yang sudah ada cukup untuk memicu loading saat komponen mendekati viewport.

// FULL OPTIMIZED CODE:
// app/(home)/logoShowcase.tsx

"use client";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const logos = [
  { name: "Yamaha", url: "/img/showcase/yamaha.svg" },
  { name: "Toyota", url: "/img/showcase/toyota.svg" },
  { name: "PLN", url: "/img/showcase/pln.svg" },
  { name: "Astra", url: "/img/showcase/atlantic.svg" },
  { name: "Modena", url: "/img/showcase/grafika.svg" },
  { name: "Haleyora", url: "/img/showcase/haleyora.svg" },
];

export default function LogoShowcase() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const duplicatedLogos = useMemo(() => [...logos, ...logos, ...logos], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" } // trigger sedikit sebelum masuk viewport
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // [OPTIMASI] Menghapus useEffect manual preload.
  // IntersectionObserver di atas sudah cukup untuk memicu animasi,
  // dan `loading="lazy"` pada Image akan menangani pemuatan gambar.

  const handleLogoMouseEnter = useCallback((i: number) => {
    setIsPaused(true);
    setHoveredIndex(i);
  }, []);
  const handleLogoMouseLeave = useCallback(() => {
    setIsPaused(false);
    setHoveredIndex(null);
  }, []);

  return (
    <div className="relative -mt-20 md:-mt-28 z-20 mb-20 md:mb-28">
      <section
        ref={sectionRef}
        className="relative w-full py-8 md:py-12 overflow-hidden"
        aria-label="Logo showcase klien terpercaya"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-0">
          <div
            className={`flex gap-8 md:gap-12 items-center ${
              isVisible ? (isPaused ? "pause-animation" : "animate-scroll") : ""
            }`}
            style={{ width: "max-content" }}
            role="list"
            aria-label="Daftar logo klien"
          >
            {duplicatedLogos.map((logo, i) => {
              const isHovered = hoveredIndex === i;
              const isOtherHovered =
                hoveredIndex !== null && hoveredIndex !== i;
              return (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex-shrink-0 logo-item"
                  onMouseEnter={() => handleLogoMouseEnter(i)}
                  onMouseLeave={handleLogoMouseLeave}
                  onTouchStart={() => handleLogoMouseEnter(i)}
                  onTouchEnd={handleLogoMouseLeave}
                  style={{
                    opacity: isOtherHovered ? 0.4 : 1,
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                  role="listitem"
                  aria-label={`Logo ${logo.name}`}
                >
                  <div className="flex items-center justify-center bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-xl shadow-lg w-40 h-24 md:w-48 md:h-28">
                    <Image
                      src={logo.url}
                      alt={`Logo ${logo.name}`}
                      width={160}
                      height={80}
                      className="w-32 h-16 md:w-40 md:h-20 object-contain pointer-events-none select-none logo-image"
                      style={{
                        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                        opacity: isHovered ? 1 : 0.7,
                      }}
                      quality={85}
                      // [OPTIMASI IMAGE] Hapus priority dan loading="eager"
                      loading={"lazy"}
                      draggable={false}
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div id="state"></div>
      </section>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(-100% / 3), 0, 0);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          will-change: transform; /* [OPTIMASI CSS] */
        }
        .pause-animation {
          animation-play-state: paused;
        }
        .logo-item {
          will-change: transform, opacity;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .logo-image {
          will-change: filter, opacity;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
}

// PENJELASAN DETAIL:
// - **Image `priority` Removal:** Sama seperti `stateSlider.tsx`, komponen ini di-lazy load, jadi gambar di dalamnya bukan LCP. Menghapus `priority` memungkinkan browser menjadwalkan download gambar dengan lebih cerdas.
// - **Manual Preload Removal:** `IntersectionObserver` sudah memberi sinyal kapan animasi harus dimulai. `next/image` dengan `loading="lazy"` akan otomatis mengunduh gambar saat mendekati viewport. Menghapus preload manual menyederhanakan kode dan menyerahkan prioritas ke browser.
