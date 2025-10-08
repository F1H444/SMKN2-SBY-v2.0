"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Image,
  Code,
  Cpu,
  Wrench,
  Video,
  Building,
  Car,
  Bike,
  Home,
  CircuitBoard,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const jurusanData = [
  {
    id: "rpl",
    short: "RPL",
    title: "Rekayasa Perangkat Lunak",
    description:
      "Mempelajari pengembangan, pemeliharaan, dan manajemen kualitas perangkat lunak secara sistematis.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "tkj",
    short: "TKJ",
    title: "Teknik Komputer dan Jaringan",
    description:
      "Fokus pada perancangan, instalasi, dan konfigurasi infrastruktur jaringan komputer dan server.",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "tpm",
    short: "TPM",
    title: "Teknik Pemesinan",
    description:
      "Mengasah keterampilan dalam proses produksi manufaktur menggunakan mesin perkakas presisi.",
    icon: Wrench,
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "tsm",
    short: "TSM",
    title: "Teknik Sepeda Motor",
    description:
      "Spesialisasi dalam perawatan, perbaikan, dan modifikasi teknologi sepeda motor modern.",
    icon: Bike,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "tkr",
    short: "TKR",
    title: "Teknik Kendaraan Ringan",
    description:
      "Mempersiapkan tenaga ahli di bidang perawatan dan perbaikan mobil modern.",
    icon: Car,
    color: "from-red-500 to-rose-500",
  },
  {
    id: "dpib",
    short: "DPIB",
    title: "Desain Pemodelan & Info Bangunan",
    description:
      "Mempelajari perancangan bangunan, pemodelan 3D, dan manajemen informasi konstruksi (BIM).",
    icon: Building,
    color: "from-yellow-500 to-lime-500",
  },
  {
    id: "tkp",
    short: "TKP",
    title: "Teknik Konstruksi & Perumahan",
    description:
      "Fokus pada pelaksanaan, pengawasan, dan manajemen proyek konstruksi gedung dan perumahan.",
    icon: Home,
    color: "from-stone-500 to-neutral-500",
  },
  {
    id: "animasi",
    short: "ANI",
    title: "Animasi",
    description:
      "Mengembangkan kreativitas dalam pembuatan animasi 2D, 3D, dan efek visual untuk berbagai media.",
    icon: Image,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "elektro",
    short: "TEI",
    title: "Teknik Elektronika Industri",
    description:
      "Mempelajari perancangan, perakitan, dan pemeliharaan sistem kontrol elektronik di industri.",
    icon: CircuitBoard,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "tav",
    short: "TAV",
    title: "Teknik Audio Video",
    description:
      "Fokus pada perbaikan, instalasi, dan perawatan perangkat elektronik audio dan video.",
    icon: Video,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "titl",
    short: "TITL",
    title: "Teknik Instalasi Tenaga Listrik",
    description:
      "Berfokus pada instalasi, pemeliharaan, dan perbaikan sistem tenaga listrik di gedung dan industri.",
    icon: Zap,
    color: "from-sky-500 to-indigo-500",
  },
];

export default function JurusanPage() {
  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi scroll trigger untuk cards
      gsap.fromTo(
        ".jurusan-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".jurusan-grid",
            start: "top bottom-=100px",
            toggleActions: "play none none none",
          },
        }
      );

      // Hover effect untuk setiap card
      const cards = gsap.utils.toArray<HTMLElement>(".jurusan-card");
      const listeners: Array<{
        element: HTMLElement;
        moveHandler: (e: MouseEvent) => void;
        leaveHandler: () => void;
      }> = [];

      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            rotationY: (x / rect.width) * 20,
            rotationX: (-y / rect.height) * 20,
            transformPerspective: 1000,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.5,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            ease: "elastic.out(1, 0.5)",
            duration: 1.2,
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        // Simpan reference untuk cleanup
        listeners.push({
          element: card,
          moveHandler: handleMouseMove,
          leaveHandler: handleMouseLeave,
        });
      });

      // Cleanup event listeners
      return () => {
        listeners.forEach(({ element, moveHandler, leaveHandler }) => {
          element.removeEventListener("mousemove", moveHandler);
          element.removeEventListener("mouseleave", leaveHandler);
        });
      };
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={main}
      className="min-h-screen p-8 md:p-12 lg:p-16 text-slate-800 dark:text-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Jelajahi <span className="text-blue-500">Minat</span> dan{" "}
            <span className="text-purple-500">Bakatmu</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            SMKN 2 Surabaya menawarkan 11 program keahlian yang dirancang untuk
            mempersiapkanmu menjadi profesional yang siap bersaing di dunia
            industri.
          </p>
        </motion.div>

        <div className="jurusan-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {jurusanData.map((item) => (
            <div key={item.id} className="jurusan-card opacity-0">
              <Link
                href={`/jurusan/${item.id}`}
                className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 relative group overflow-hidden transition-colors duration-300 hover:border-blue-500 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${item.color}`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 z-10">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-300">
                    Selengkapnya
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>

                <div
                  className={`absolute -bottom-10 -right-10 w-28 h-28 bg-gradient-to-br ${item.color} rounded-full opacity-10 transition-all duration-500 ease-in-out group-hover:opacity-20 group-hover:scale-150`}
                ></div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
