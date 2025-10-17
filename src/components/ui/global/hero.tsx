"use client";
import React, { memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaColor?: string,
  backgroundImage?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = memo(
  ({
    title = "Transformasi Digital untuk Bisnis Anda",
    ctaText = "Mulai Sekarang",
    ctaLink = "#",
    backgroundImage,
    onCtaClick,
  }) => {
    // OPTIMASI: State untuk melacak status pemuatan gambar.
    // Jika tidak ada `backgroundImage`, anggap sudah "selesai dimuat".
    const [isImageLoaded, setIsImageLoaded] = useState(!backgroundImage);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onCtaClick) {
        e.preventDefault();
        onCtaClick();
      } else if (ctaLink === "#") {
        e.preventDefault();
        const viewportHeight = window.innerHeight;
        window.scrollTo({
          top: viewportHeight,
          behavior: "smooth",
        });
      }
    };

    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-4">
          <div className="hero-card relative w-full mx-auto px-6 sm:px-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-2xl overflow-hidden min-h-[70vh] flex items-center justify-center">
            {backgroundImage && (
              <>
                {/* OPTIMASI: Skeleton loader akan tampil sebelum gambar selesai dimuat */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
                )}

                <Image
                  src={backgroundImage}
                  alt="Latar belakang hero section"
                  fill
                  priority // Tetap penting untuk LCP (Largest Contentful Paint)
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 1280px"
                  // OPTIMASI: Menggunakan onLoad untuk memicu transisi saat gambar siap
                  onLoad={() => setIsImageLoaded(true)}
                  className={`object-cover transition-opacity duration-500 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/30" />
              </>
            )}

            <header className="relative z-10 text-center max-w-4xl px-4">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight ${
                  backgroundImage
                    ? "text-white drop-shadow-lg"
                    : "text-gray-900"
                }`}
              >
                {title}
              </h1>
            </header>
          </div>

          <div className="flex justify-center -mt-10 relative z-20">
            <div className="relative inline-block group">
              <div
                className="absolute inset-0 bg-purple-600 rounded-2xl transform translate-y-2 transition-transform duration-300 ease-out group-hover:translate-y-1 -z-10"
                aria-hidden="true"
              />
              <Link
                href={ctaLink}
                onClick={handleClick}
                className="relative z-0 inline-flex items-center gap-3 bg-white border-2 border-gray-800 text-gray-800 font-semibold text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-lg transition-transform duration-300 ease-out transform group-hover:-translate-y-1"
                aria-label={ctaText}
              >
                <span>{ctaText}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-1"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero-card::before,
          .hero-card::after {
            content: "";
            position: absolute;
            z-index: 0;
            width: 20rem;
            height: 20rem;
            border-radius: 9999px;
            opacity: 0.2;
            pointer-events: none;
          }
          .hero-card::before {
            top: -10rem;
            right: -10rem;
            background-image: radial-gradient(circle, #bfdbfe, transparent 70%);
          }
          .hero-card::after {
            bottom: -10rem;
            left: -10rem;
            background-image: radial-gradient(circle, #e9d5ff, transparent 70%);
          } 
        `}</style>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export default HeroSection;
