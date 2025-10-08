"use client";
import React from "react";

interface HeroSectionProps {
  title?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  ctaColor?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Transformasi Digital untuk Bisnis Anda",
  ctaText = "Mulai Sekarang",
  ctaLink = "#",
  backgroundColor = "bg-gradient-to-br from-slate-50 to-slate-100",
  backgroundImage,
  ctaColor = "bg-purple-600 hover:bg-purple-700",
  onCtaClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    } else if (ctaLink === "#") {
      e.preventDefault();
      // Smooth scroll to next section
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="relative w-full max-w-[90rem] mx-auto">
        {/* Background Container */}
        <div
          className={`relative w-full mx-auto px-8 ${
            !backgroundImage ? backgroundColor : ""
          } rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[70vh] flex items-center justify-center`}
          style={
            backgroundImage
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
        >
          {/* Overlay untuk meningkatkan keterbacaan teks jika menggunakan image */}
          {backgroundImage && (
            <div className="absolute inset-0 bg-black/40 rounded-[2.5rem]"></div>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          {/* Content Container */}
          <div className="relative z-10 text-center max-w-4xl px-4">
            {/* Title */}
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold ${
                backgroundImage ? "text-white" : "text-gray-900"
              } leading-tight`}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* CTA Button - Outside and Below Background */}
        <div className="flex justify-center -mt-10 relative z-20">
          <div className="relative inline-block">
            <a
              href={ctaLink}
              onClick={handleClick}
              className={`relative z-10 inline-flex items-center gap-3 bg-white border-2 border-gray-800 text-gray-800 font-semibold text-lg px-16 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer`}
            >
              <span>{ctaText}</span>
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
            {/* Colored box behind CTA */}
            <div
              className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 ${
                ctaColor.split(" ")[0]
              } w-full h-16 rounded-2xl shadow-2xl`}
            ></div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(30px, 30px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 10s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
