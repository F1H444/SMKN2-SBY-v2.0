// app/(home)/logoShowcase.tsx (Bug Fixed & Ultra Optimized)

"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";

const logos = [
  { name: "Yamaha", url: "/img/showcase/yamaha.svg" },
  { name: "Toyota", url: "/img/showcase/toyota.svg" },
  { name: "pln", url: "/img/showcase/pln.svg" },
  { name: "astra", url: "/img/showcase/atlantic.svg" },
  { name: "modena", url: "/img/showcase/grafika.svg" },
  { name: "haleyora", url: "/img/showcase/haleyora.svg" },
];

export default function LogoShowcase() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Quadruple duplicate untuk seamless loop yang lebih smooth
  const duplicatedLogos = useMemo(
    () => [...logos, ...logos, ...logos, ...logos],
    []
  );

  // Preload images untuk performa lebih baik
  useEffect(() => {
    const preloadImages = logos.map((logo) => {
      const img = new window.Image();
      img.src = logo.url;
      return img;
    });

    return () => {
      preloadImages.forEach((img) => {
        img.src = "";
      });
    };
  }, []);

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
      <section className="relative w-full py-8 md:py-12 overflow-hidden">
        {/* Gradient overlays untuk efek fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

        <div className="relative z-0">
          <div
            className={`flex gap-8 md:gap-12 items-center ${
              isPaused ? "" : "animate-scroll"
            }`}
            style={{
              width: "max-content",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedLogos.map((logo, i) => {
              const isHovered = hoveredIndex === i;
              const isOtherHovered =
                hoveredIndex !== null && hoveredIndex !== i;

              return (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex-shrink-0 will-change-transform"
                  onMouseEnter={() => handleLogoMouseEnter(i)}
                  onMouseLeave={handleLogoMouseLeave}
                  onTouchStart={() => handleLogoMouseEnter(i)}
                  onTouchEnd={handleLogoMouseLeave}
                  style={{
                    opacity: isOtherHovered ? 0.4 : 1,
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <div className="flex items-center justify-center bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-xl shadow-lg w-40 h-24 md:w-48 md:h-28">
                    <Image
                      src={logo.url}
                      alt={logo.name}
                      width={160}
                      height={80}
                      className="w-32 h-16 md:w-40 md:h-20 object-contain pointer-events-none select-none"
                      style={{
                        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                        opacity: isHovered ? 1 : 0.7,
                        transition: "filter 0.3s ease, opacity 0.3s ease",
                      }}
                      quality={90}
                      priority={i < 6}
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-25%, 0, 0);
          }
        }

        .animate-scroll {
          animation: scroll 50s linear infinite;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 30s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation-duration: 80s;
          }
        }

        /* Force GPU acceleration & optimize rendering */
        .animate-scroll {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
          -webkit-transform: translate3d(0, 0, 0);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Prevent layout shift */
        .will-change-transform {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
