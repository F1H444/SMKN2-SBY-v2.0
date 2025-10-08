"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const mainNavItems = [
    { label: "Beranda", href: "/", icon: "🏠" },
    { label: "Tentang", href: "/tentang", icon: "📖" },
    { label: "Jurusan", href: "/jurusan", icon: "🎓" },
    { label: "Alumni", href: "/alumni", icon: "👥" },
    { label: "Ekstrakulikuler", href: "/eskul", icon: "⚽" },
    { label: "Berita", href: "/berita", icon: "📰" },
  ];

  const contactInfo = [
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

  const socialMedia = [
    {
      name: "Facebook",
      icon: <Facebook size={22} />,
      gradient: "from-blue-600 to-blue-500",
      href: "https://web.facebook.com/official.smkn2sby/",
    },
    {
      name: "Instagram",
      icon: <Instagram size={22} />,
      gradient: "from-purple-600 via-pink-600 to-orange-500",
      href: "https://www.instagram.com/smkn2surabaya/?hl=en",
    },
    {
      name: "Youtube",
      icon: <Youtube size={22} />,
      gradient: "from-red-600 to-red-500",
      href: "http://www.youtube.com/@smkn2surabaya761",
    },
  ];

  return (
    <footer ref={footerRef} className="relative text-white overflow-hidden">
      {/* Enhanced Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top Section - Brand & CTA */}
        <motion.div
          className="mb-16 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Brand */}
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  SMK Negeri 2 Surabaya
                </h2>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                SMK BISA, SMK HEBAT, SMKN 2 SBY SMART BERKARAKTER
              </p>
              <p className="text-slate-400 text-sm">
                Membangun generasi unggul yang siap menghadapi tantangan masa
                depan dengan keterampilan dan karakter yang kuat.
              </p>
            </div>

            {/* Newsletter CTA */}
            <motion.div
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 lg:p-8 max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-3 text-white">
                Tetap Terhubung
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                Dapatkan informasi terbaru dari SMKN 2 Surabaya
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Quick Links */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
              Navigasi Cepat
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {mainNavItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="group relative bg-slate-800/30 hover:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="absolute top-3 right-3 w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
              Hubungi Kami
            </h4>
            <div className="space-y-4">
              {contactInfo.map((contact, idx) => (
                <motion.div
                  key={idx}
                  className="group bg-slate-800/30 hover:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-4 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        {contact.label}
                      </p>
                      <p className="text-slate-300 text-sm font-medium break-words">
                        {contact.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
              Media Sosial
            </h4>
            <div className="space-y-4">
              {socialMedia.map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-slate-800/30 hover:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-transparent rounded-xl p-4 transition-all duration-300 hover:scale-105 block overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  ></div>
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{social.name}</p>
                      <p className="text-slate-400 text-xs">
                        Ikuti kami di {social.name}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-slate-700/50 pt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-400">
              <p className="text-center">
                © {new Date().getFullYear()} SMKN 2 Surabaya. Seluruh Hak Cipta
                Dilindungi.
              </p>
              <span className="hidden sm:block">•</span>
              <p className="text-center">
                Dibuat dengan <span className="text-red-500">❤️</span> untuk
                pendidikan Indonesia
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
              >
                Syarat Layanan
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
              >
                Sitemap
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
