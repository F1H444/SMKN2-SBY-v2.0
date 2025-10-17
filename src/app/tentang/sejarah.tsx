"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Shield,
  School,
  Building,
  Layers,
  Zap,
  MonitorSmartphone,
} from "lucide-react";

// Data untuk konten halaman (tidak diubah)
const milestones = [
  {
    year: "1912",
    title: "Era KES (Koningen Emma School)",
    desc: "Didirikan pada masa kolonial Belanda, menjadi SMK tertua di Jawa Timur.",
    icon: School,
  },
  {
    year: "1921",
    title: "Lulusan Pertama",
    desc: "Meluluskan angkatan pertama dengan jurusan pionir Bangunan Gedung & Bangunan Air.",
    icon: GraduationCap,
  },
  {
    year: "1942-1945",
    title: "Masa Perjuangan",
    desc: "Berubah nama menjadi Kogyo Ghakko dan sempat menjadi Markas Tentara Pelajar.",
    icon: Shield,
  },
  {
    year: "1950",
    title: "Menjadi STM 1 Surabaya",
    desc: "Resmi berganti nama menjadi Sekolah Teknologi Menengah (STM 1) setelah pengakuan kedaulatan.",
    icon: Building,
  },
  {
    year: "1997",
    title: "Transformasi Menjadi SMK",
    desc: "Berubah nama menjadi SMKN 2 Surabaya, mengikuti kebijakan pendidikan nasional.",
    icon: Layers,
  },
  {
    year: "2000-an",
    title: "Modernisasi & Ekspansi",
    desc: "Pengembangan jurusan modern seperti RPL, TKJ, dan Animasi.",
    icon: Zap,
  },
  {
    year: "Saat Ini",
    title: "Era Digital & Pusat Keunggulan",
    desc: "Terakreditasi A dan menjadi SMK Pusat Keunggulan di era digital modern.",
    icon: MonitorSmartphone,
  },
];

interface Milestone {
  year: string;
  title: string;
  desc: string;
  icon: any;
}

const MilestoneCard = ({
  milestone,
  isEven,
}: {
  milestone: Milestone;
  isEven: boolean;
}) => {
  const Icon = milestone.icon;

  return (
    <motion.div
      className="flex w-full mb-8 last:mb-0"
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={`w-full flex ${
          isEven ? "md:flex-row-reverse" : "md:flex-row"
        } flex-col md:items-center items-center`}
      >
        <div className="md:w-5/12 w-full">
          <div
            className={`p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 w-full ${
              isEven ? "md:text-right" : "md:text-left"
            } text-center`}
          >
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {milestone.year}
            </span>
            <h3 className="text-xl font-bold mt-1 mb-2 text-slate-900 dark:text-white">
              {milestone.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {milestone.desc}
            </p>
          </div>
        </div>

        <div className="md:w-2/12 w-full flex justify-center items-center my-4 md:my-0">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center z-10 shadow-md">
            <Icon className="w-8 h-8" />
          </div>
        </div>

        <div className="md:w-5/12 w-full"></div>
      </div>
    </motion.div>
  );
};

export default function SMKN2History() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    // MODIFIKASI: Latar belakang gradient dihapus dan diganti bg-transparent
    <div className="bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* --- Hero Section (tidak diubah) --- */}
        <motion.section
          className="text-center mb-20 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Jejak Sejarah
            </span>
            <br />
            SMKN 2 Surabaya
          </motion.h1>
          <motion.p
            className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Lebih dari satu abad mengukir prestasi, dari era kolonial hingga
            menjadi pusat keunggulan di era digital.
          </motion.p>
        </motion.section>

        {/* --- Timeline Section --- */}
        <section className="relative" ref={timelineRef}>
          <div className="relative max-w-4xl mx-auto">
            {/* Garis Latar Belakang */}
            <div
              className="absolute left-1/2 top-0 w-1 bg-slate-300 dark:bg-slate-700 -translate-x-1/2"
              style={{ height: "100%" }}
            >
              {/* Garis Biru yang Bergerak (ANIMASI UTAMA) */}
              <motion.div
                className="w-full bg-blue-500 dark:bg-blue-400 origin-top"
                style={{ scaleY }}
              />
            </div>

            {/* Mapping milestones */}
            {milestones.map((milestone, idx) => (
              <MilestoneCard
                key={idx}
                milestone={milestone}
                isEven={idx % 2 === 0}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
