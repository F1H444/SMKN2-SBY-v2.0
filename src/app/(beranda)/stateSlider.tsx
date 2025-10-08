"use client";

import { useState, useEffect, useCallback } from "react";
import CountUp from "react-countup";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";
import Image from "next/image";

const stats = [
  {
    number: 113,
    label: "Tahun",
    desc: "Mengabdi dan Berkarya untuk Mencerdaskan Bangsa",
  },
  {
    number: 1000,
    label: "Mitra Industri",
    desc: "Berkolaborasi untuk Masa Depan Siswa",
  },
  {
    number: 2313,
    label: "Alumni Berkualitas",
    desc: "Siap Bersaing dan Menggapai Cita-Cita Lebih Tinggi",
  },
  {
    number: 354,
    label: "Prestasi",
    desc: "Mengukir Jejak Gemilang di Tingkat Lokal hingga Nasional",
  },
];

const socials = [
  {
    icon: <FaFacebook />,
    color: "text-blue-400",
    link: "https://web.facebook.com/official.smkn2sby/",
    label: "Facebook",
  },
  {
    icon: <FaInstagram />,
    color: "text-pink-400",
    link: "https://www.instagram.com/smkn2surabaya/",
    label: "Instagram",
  },
  {
    icon: <FaYoutube />,
    color: "text-red-400",
    link: "http://www.youtube.com/@smkn2surabaya761",
    label: "YouTube",
  },
  {
    icon: <FaTiktok />,
    color: "text-white",
    link: "https://www.tiktok.com/@smknegeri2surabaya",
    label: "TikTok",
  },
];

const slides = [
  {
    image: "/img/smkn2.webp",
    alt: "foto sekolah",
  },
  {
    image: "/img/slider/industri.jpg",
    alt: "foto industri",
  },
  {
    image: "/img/slider/alumni.webp",
    alt: "school photo slider",
  },
  {
    image: "/img/slider/prestasi.jpg",
    alt: "school photo slider",
  },
];

const quotes = [
  "113 tahun perjalanan penuh dedikasi. Terus mengabdi dan berkarya demi mencerdaskan setiap anak bangsa.",
  "Kolaborasi dengan mitra industri membuka jalan menuju masa depan pendidikan yang relevan dan adaptif.",
  "Ribuan alumni kami telah membuktikan, pendidikan yang kuat adalah kunci meraih cita-cita.",
  "Prestasi bukan tujuan akhir, tapi bukti nyata dari proses belajar yang bermakna.",
];

export default function StateSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-transparent dark:bg-transparent overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 order-2 lg:order-1">
          {stats.map((item, i) => (
            <div
              key={i}
              className="group bg-white/90 dark:bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border-2 border-gray-300/60 dark:border-gray-700/50 hover:border-purple-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-gradient-to-br hover:from-purple-50 hover:to-white dark:hover:from-purple-900/20 dark:hover:to-transparent transition-all duration-300 flex flex-col justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[280px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-purple-200/30 to-transparent dark:from-purple-600/20 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CountUp
                  end={item.number}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
                +
              </h3>
              <p className="font-bold text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100 mt-2 sm:mt-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                {item.label}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 mt-1 sm:mt-2 leading-relaxed line-clamp-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Slider */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2 w-full lg:w-[115%] lg:-ml-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
            {/* Slides */}
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  i === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                  className="object-cover select-none"
                />
              </div>
            ))}

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black/20 to-purple-900/70 flex flex-col justify-between pointer-events-none">
              {/* Social Media Icons */}
              <div className="flex justify-center mt-4 sm:mt-6 pointer-events-auto">
                <div className="bg-white/15 dark:bg-black/40 backdrop-blur-lg px-4 sm:px-5 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-xl sm:rounded-2xl md:rounded-3xl flex gap-3 sm:gap-4 md:gap-5 lg:gap-7 shadow-2xl border border-purple-300/30 dark:border-purple-700/30">
                  {socials.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transform transition hover:scale-125 hover:-translate-y-1 cursor-pointer text-2xl sm:text-3xl md:text-4xl ${s.color} drop-shadow-lg`}
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="text-center px-4 sm:px-6 mb-4 sm:mb-6 md:mb-8">
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-xl mx-auto drop-shadow-lg transition-opacity duration-500">
                  {quotes[currentSlide]}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-purple-500/80 to-purple-600/90 hover:scale-110 hover:from-purple-600 hover:to-purple-700 text-white p-2 sm:p-3 rounded-full shadow-xl transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-purple-500/80 to-purple-600/90 hover:scale-110 hover:from-purple-600 hover:to-purple-700 text-white p-2 sm:p-3 rounded-full shadow-xl transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-6 sm:w-8 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? "bg-purple-500 dark:bg-purple-400 w-8 sm:w-12"
                      : "bg-purple-300/40 dark:bg-purple-600/40 hover:bg-purple-400/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
