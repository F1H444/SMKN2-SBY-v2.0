"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image"; // OPTIMASI: Menggunakan Image dari Next.js
import Link from "next/link"; // OPTIMASI: Menggunakan Link untuk navigasi
import {
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// --- OPTIMASI: Data statis didefinisikan di luar komponen ---
// Ini mencegah array dibuat ulang pada setiap render, menghemat sumber daya.
const MAIN_NAV_ITEMS = [
  { label: "Beranda", href: "/", icon: "🏠" },
  { label: "Tentang", href: "/tentang", icon: "📖" },
  { label: "Jurusan", href: "/jurusan", icon: "🎓" },
  { label: "Alumni", href: "/alumni", icon: "👥" },
  { label: "Ekstrakulikuler", href: "/eskul", icon: "⚽" },
  { label: "Berita", href: "/berita", icon: "📰" },
];

const CONTACT_INFO = [
  {
    icon: <MapPin size={20} />,
    text: "Jl. Tentara Genie Pelajar No. 26",
    label: "Alamat",
  },
  { icon: <Phone size={20} />, text: "0315343708", label: "Telepon" },
  {
    icon: <Mail size={20} />,
    text: "smekda.surabaya@gmail.com",
    label: "Email",
  },
];

const SOCIAL_MEDIA = [
  {
    name: "Facebook",
    icon: <Facebook size={20} />,
    gradient: "from-blue-600 to-blue-500",
    href: "https://web.facebook.com/official.smkn2sby/",
  },
  {
    name: "Instagram",
    icon: <Instagram size={20} />,
    gradient: "from-purple-600 via-pink-600 to-orange-500",
    href: "https://www.instagram.com/smkn2surabaya/?hl=en",
  },
  {
    name: "Youtube",
    icon: <Youtube size={20} />,
    gradient: "from-red-600 to-red-500",
    href: "http://www.youtube.com/@smkn2surabaya761",
  },
];

// --- KOMPONEN UTAMA ---
const Footer = () => {
  const footerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Pola IntersectionObserver yang efisien untuk memicu animasi saat terlihat
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -100px 0px" }
    );

    const footerElement = footerRef.current;
    if (!footerElement) return;
    
    observer.observe(footerElement);

    return () => {
      // Cleanup observer saat komponen di-unmount
      observer.disconnect();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`relative bg-slate-900 text-white overflow-hidden ${
        isInView ? "is-in-view" : ""
      }`}
    >
      <div className="absolute inset-0 -z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 rounded-full bg-gradient-to-t from-blue-950/40 to-transparent blur-3xl opacity-40"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#FFF 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div
            className="animated-item mb-12 sm:mb-16"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent truncate">
                    SMK Negeri 2
                  </h2>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  SMK BISA, SMK HEBAT, SMKN 2 SBY SMART BERKARAKTER
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Membangun generasi unggul yang siap menghadapi tantangan masa
                  depan dengan keterampilan dan karakter yang kuat.
                </p>
              </div>

              <div
                className="animated-item w-full sm:w-auto sm:max-w-xs bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 sm:p-6"
                style={{ transitionDelay: "0.2s" }}
              >
                <h3 className="text-base sm:text-lg font-bold mb-4 text-white">
                  Didukung Oleh
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* OPTIMASI: Menggunakan next/image */}
                  <Image
                    src="/img/support.webp"
                    alt="Dukungan dari berbagai partner industri"
                    width={200} // Ganti dengan lebar asli gambar Anda
                    height={50} // Ganti dengan tinggi asli gambar Anda
                    className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-8 mb-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {/* Quick Navigation */}
            <div
              className="animated-item space-y-4"
              style={{ transitionDelay: "0.3s" }}
            >
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full flex-shrink-0"></div>
                <span>Navigasi</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {MAIN_NAV_ITEMS.map((item) => (
                  // OPTIMASI: Menggunakan next/link untuk Client-Side Navigation
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative bg-slate-800/40 hover:bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 rounded-lg p-3 transition-all duration-200 transform hover:scale-102"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                        {item.label}
                      </span>
                    </div>
                    <ArrowRight className="absolute top-2.5 right-2.5 w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div
              className="animated-item space-y-4"
              style={{ transitionDelay: "0.4s" }}
            >
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full flex-shrink-0"></div>
                <span>Hubungi Kami</span>
              </h4>
              <div className="space-y-2.5">
                {CONTACT_INFO.map((contact) => (
                  <div
                    key={contact.label}
                    className="group bg-slate-800/40 hover:bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 rounded-lg p-3 transition-all duration-200"
                  >
                    <div className="flex gap-3 min-w-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-900/50 rounded-md flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        {contact.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">
                          {contact.label}
                        </p>
                        <p className="text-slate-300 text-xs sm:text-sm font-medium break-words">
                          {contact.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div
              className="animated-item space-y-4"
              style={{ transitionDelay: "0.5s" }}
            >
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full flex-shrink-0"></div>
                <span>Media Sosial</span>
              </h4>
              <div className="space-y-2.5">
                {SOCIAL_MEDIA.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-slate-800/40 hover:bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 hover:border-transparent rounded-lg p-3 transition-all duration-200 transform hover:scale-102 block overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                    ></div>
                    <div className="relative flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        {social.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">
                          {social.name}
                        </p>
                        <p className="text-slate-400 text-xs">Ikuti kami</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div
            className="animated-item border-t border-slate-700/50 pt-6 sm:pt-8"
            style={{ transitionDelay: "0.6s" }}
          >
            <p className="text-center sm:text-left text-xs sm:text-sm text-slate-400">
              © {new Date().getFullYear()} SMKN 2 Surabaya. Seluruh Hak Cipta
              Dilindungi.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* OPTIMASI: Animasi menggunakan opacity dan transform, yang efisien untuk browser. */
        .animated-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          will-change: opacity, transform; /* Memberi petunjuk ke browser */
        }
        .is-in-view .animated-item {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
