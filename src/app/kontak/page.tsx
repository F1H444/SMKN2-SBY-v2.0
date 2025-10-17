// app/kontak/page.tsx

"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTheme } from "next-themes";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Loader,
  CheckCircle,
  XCircle,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";

// Ganti dengan data Anda dari akun EmailJS
const EMAILJS_SERVICE_ID = "service_puhu6dn";
const EMAILJS_TEMPLATE_ID = "template_ypwhovc";
const EMAILJS_PUBLIC_KEY = "miRxqF594MTQK2w0a";

const ContactPage = () => {
  const { resolvedTheme } = useTheme();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    if (form.current) {
      emailjs
        .sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          form.current,
          EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            setStatus({
              type: "success",
              message: "Pesan Anda berhasil terkirim. Terima kasih!",
            });
            form.current?.reset();
          },
          (error) => {
            setStatus({
              type: "error",
              message: "Gagal mengirim pesan. Silakan coba lagi nanti.",
            });
          }
        )
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-500 dark:text-cyan-300" />,
      title: "Alamat",
      details: "Jl. Tentara Genie Pelajar No. 26",
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-500 dark:text-cyan-300" />,
      title: "Telepon",
      details: "0315343708",
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-500 dark:text-cyan-300" />,
      title: "Email",
      details: "smekda.surabaya@gmail.com",
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      href: "https://web.facebook.com/official.smkn2sby/",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/smkn2surabaya/?hl=en",
    },
    {
      name: "Youtube",
      icon: <Youtube size={20} />,
      href: "http://www.youtube.com/@smkn2surabaya761",
    },
  ];

  // Variants untuk container utama
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  // Variants untuk kolom kiri dan kanan
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  // Variants untuk item di dalam kolom
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-start lg:items-center justify-center p-4 sm:p-6 lg:p-8 pt-32 lg:pt-8 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background Video (Hanya untuk Dark Mode) */}
      {resolvedTheme === "dark" && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
          key="dark-video"
        >
          <source
            src="https://cdn.pixabay.com/video/2024/05/27/211515_large.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Aurora Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-to-tr from-blue-200/50 via-purple-200/30 to-blue-300/50 dark:from-blue-600/30 dark:via-cyan-500/10 dark:to-purple-600/30 rounded-full filter blur-3xl opacity-50 animate-pulse z-0"></div>

      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 backdrop-blur-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Column: Contact Info */}
        <motion.div
          className="p-8 sm:p-12 flex flex-col justify-between bg-black/5 dark:bg-black/20"
          variants={columnVariants}
        >
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent mb-4 py-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Hubungi Kami
            </motion.h1>
            <motion.p
              className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Punya pertanyaan atau butuh informasi? Kami siap membantu Anda.
            </motion.p>
          </div>

          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <div className="bg-white/50 dark:bg-gradient-to-br dark:from-blue-500/50 dark:to-cyan-500/30 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-white">
                    {info.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    {info.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-4">
              Ikuti Kami
            </h3>
            <div className="flex gap-4 text-slate-600 dark:text-white">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-200/70 dark:bg-slate-700/50 rounded-full hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500/50 transition-colors border border-slate-300 dark:border-slate-600"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          className="p-8 sm:p-12 bg-white/50 dark:bg-slate-900/60"
          variants={columnVariants}
        >
          <form
            ref={form}
            onSubmit={sendEmail}
            className="h-full flex flex-col"
          >
            <div className="space-y-6 flex-grow">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label
                  htmlFor="user_name"
                  className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full bg-slate-100 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Masukkan Nama Anda"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label
                  htmlFor="user_email"
                  className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                >
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full bg-slate-100 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Masukkan Email Anda"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                >
                  Pesan Anda
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-slate-100 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                  placeholder="Tuliskan pesan Anda di sini..."
                ></textarea>
              </motion.div>
            </div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/40"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin w-5 h-5" /> Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Kirim Pesan
                  </>
                )}
              </button>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-3 p-3 mt-4 rounded-lg text-sm ${
                    status.type === "success"
                      ? "bg-green-500/10 text-green-600 dark:text-green-300 border border-green-500/30"
                      : "bg-red-500/10 text-red-600 dark:text-red-300 border border-red-500/30"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  {status.message}
                </motion.div>
              )}
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
