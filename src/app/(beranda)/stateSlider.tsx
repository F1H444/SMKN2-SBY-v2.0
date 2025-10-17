// app/(home)/stateSlider.tsx (Full Code - Optimized)

"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const FacebookIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
));
FacebookIcon.displayName = "FacebookIcon";
const InstagramIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
));
InstagramIcon.displayName = "InstagramIcon";
const YouTubeIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
));
YouTubeIcon.displayName = "YouTubeIcon";
const TikTokIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
));
TikTokIcon.displayName = "TikTokIcon";

const CountUp = memo(
  ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            let startTime = 0;
            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              const easeOut = progress * (2 - progress);
              setCount(Math.floor(easeOut * end));
              if (progress < 1) requestAnimationFrame(animate);
              else setCount(end);
            };
            requestAnimationFrame(animate);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (elementRef.current) observer.observe(elementRef.current);
      return () => observer.disconnect();
    }, [end, duration]);
    return <span ref={elementRef}>{count.toLocaleString("id-ID")}</span>;
  }
);
CountUp.displayName = "CountUp";

const stats = [
  {
    number: 113,
    label: "Tahun",
    desc: "Mengabdi dan Berkarya untuk Mencerdaskan Bangsa",
  },
  {
    number: 339,
    label: "Mitra Industri",
    desc: "Berkolaborasi untuk Masa Depan Siswa",
  },
  {
    number: 6500,
    label: "Alumni Berkualitas",
    desc: "Siap Bersaing dan Menggapai Cita-Cita Lebih Tinggi",
  },
  {
    number: 800,
    label: "Prestasi",
    desc: "Mengukir Jejak Gemilang di Tingkat Lokal hingga Nasional",
  },
];
const socials = [
  {
    icon: <FacebookIcon />,
    color: "text-blue-400",
    link: "https://web.facebook.com/official.smkn2sby/",
    label: "Facebook",
  },
  {
    icon: <InstagramIcon />,
    color: "text-pink-400",
    link: "https://www.instagram.com/smkn2surabaya/",
    label: "Instagram",
  },
  {
    icon: <YouTubeIcon />,
    color: "text-red-400",
    link: "http://www.youtube.com/@smkn2surabaya761",
    label: "YouTube",
  },
  {
    icon: <TikTokIcon />,
    color: "text-white dark:text-gray-100",
    link: "https://www.tiktok.com/@smknegeri2surabaya",
    label: "TikTok",
  },
];
const slides = [
  { image: "/img/smkn2.webp", alt: "Foto gedung SMKN 2 Surabaya" },
  {
    image: "/img/slider/industri.webp",
    alt: "Kerjasama dengan mitra industri",
  },
  { image: "/img/slider/alumni.webp", alt: "Alumni SMKN 2 Surabaya" },
  { image: "/img/slider/prestasi.webp", alt: "Prestasi siswa SMKN 2 Surabaya" },
];
const quotes = [
  "113 tahun perjalanan penuh dedikasi. Terus mengabdi dan berkarya demi mencerdaskan setiap anak bangsa.",
  "Kolaborasi dengan mitra industri membuka jalan menuju masa depan pendidikan yang relevan dan adaptif.",
  "Ribuan alumni kami telah membuktikan, pendidikan yang kuat adalah kunci meraih cita-cita.",
  "Prestasi bukan tujuan akhir, tapi bukti nyata dari proses belajar yang bermakna.",
];

const StatCard = memo(({ item }: { item: (typeof stats)[0] }) => (
  <article className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border-2 border-gray-300/60 dark:border-gray-600/60 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[280px] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-purple-200/30 dark:from-purple-600/20 to-transparent rounded-bl-full -z-10" />
    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
      <CountUp end={item.number} />
      <span>+</span>
    </h3>
    <p className="font-bold text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100 mt-2 sm:mt-3">
      {item.label}
    </p>
    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1 sm:mt-2 leading-relaxed line-clamp-3">
      {item.desc}
    </p>
  </article>
));
StatCard.displayName = "StatCard";

const Slide = memo(
  ({
    slide,
    isActive,
    index,
  }: {
    slide: (typeof slides)[0];
    isActive: boolean;
    index: number;
  }) => (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        quality={85}
        className="object-cover select-none"
      />
    </div>
  )
);
Slide.displayName = "Slide";

export default function StateSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % slides.length),
    []
  );
  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length),
    []
  );
  const goToSlide = useCallback((index: number) => setCurrentSlide(index), []);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3500);
    return () => clearInterval(intervalRef.current);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-transparent overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch relative z-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 order-2 lg:order-1">
          {stats.map((item, i) => (
            <StatCard key={i} item={item} />
          ))}
        </div>
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2 w-full lg:w-[115%] lg:-ml-6"
          role="region"
          aria-label="Slider foto sekolah"
        >
          <div className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
            {slides.map((slide, i) => (
              <Slide
                key={i}
                slide={slide}
                isActive={i === currentSlide}
                index={i}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black/20 to-purple-900/70 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-center mt-4 sm:mt-6 pointer-events-auto">
                <nav
                  className="bg-white/15 dark:bg-gray-900/40 backdrop-blur-lg px-4 sm:px-5 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-xl sm:rounded-2xl md:rounded-3xl flex gap-3 sm:gap-4 md:gap-5 lg:gap-7 shadow-2xl border border-purple-300/30 dark:border-purple-500/30"
                  aria-label="Media sosial"
                >
                  {socials.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transform transition hover:scale-125 cursor-pointer ${s.color} drop-shadow-lg`}
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="text-center px-4 sm:px-6 mb-4 sm:mb-6 md:mb-8">
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-xl mx-auto drop-shadow-lg transition-opacity duration-500">
                  {quotes[currentSlide]}
                </p>
              </div>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-purple-500/80 to-purple-600/90 hover:scale-110 text-white p-2 sm:p-3 rounded-full shadow-xl transition-all duration-300"
              aria-label="Slide sebelumnya"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-purple-500/80 to-purple-600/90 hover:scale-110 text-white p-2 sm:p-3 rounded-full shadow-xl transition-all duration-300"
              aria-label="Slide selanjutnya"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <div
              className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2"
              role="tablist"
              aria-label="Navigasi slide"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? "bg-purple-500 w-8 sm:w-12"
                      : "bg-purple-300/40 w-6 sm:w-8 hover:bg-purple-400/60"
                  }`}
                  aria-label={`Ke slide ${i + 1}`}
                  role="tab"
                  aria-selected={i === currentSlide}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
