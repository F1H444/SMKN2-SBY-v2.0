// src/app/alumni/bmw.tsx

"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  Search,
  Briefcase,
  GraduationCap,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const alumniData = [
  {
    id: 1,
    name: "Rian Ardianto",
    role: "Atlet Bulu Tangkis Nasional",
    company: "PBSI",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rian",
  },
  {
    id: 2,
    name: "Dr. Eng. Ir. Herman Sasongko",
    role: "Dosen dan Peneliti",
    company: "Institut Teknologi Sepuluh Nopember (ITS)",
    status: "Melanjutkan",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Herman",
  },
  {
    id: 3,
    name: "Arief Muhammad",
    role: "Founder & Automotive Influencer",
    company: "Armuh Global Group",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arief",
  },
  {
    id: 4,
    name: "Bayu Skak",
    role: "Content Creator & Sutradara Film",
    company: "Skak Studios",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bayu",
  },
  {
    id: 5,
    name: "Agus Suhartono",
    role: "Insinyur Senior",
    company: "PT. PAL Indonesia",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agus",
  },
  {
    id: 6,
    name: "Dewi Lestari",
    role: "Mahasiswi Teknik Informatika",
    company: "Universitas Gadjah Mada (UGM)",
    status: "Melanjutkan",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi",
  },
  {
    id: 7,
    name: "Eko Prasetyo",
    role: "Spesialis Robotika",
    company: "PT. Sri Rejeki Isman (Sritex)",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eko",
  },
  {
    id: 8,
    name: "Fahmi Husaen",
    role: "Founder Startup Edukasi",
    company: "KelasKita",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahmi",
  },
  {
    id: 9,
    name: "Gita Savitri",
    role: "Mahasiswi S2 Kimia",
    company: "Freie Universität Berlin",
    status: "Melanjutkan",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=GitaSavitri",
  },
  {
    id: 10,
    name: "Hendi Setiono",
    role: "Founder & CEO",
    company: "Baba Rafi Enterprise",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hendi",
  },
  {
    id: 11,
    name: "Indra Wijaya",
    role: "Animator Profesional",
    company: "MD Animation",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Indra",
  },
  {
    id: 12,
    name: "Joko Anwar",
    role: "Sutradara & Penulis Skenario",
    company: "Come and See Pictures",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JokoAnwar",
  },
];

const ITEMS_PER_PAGE = 6;
const statusConfig = {
  Bekerja: {
    icon: Briefcase,
    color:
      "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800/60",
    label: "Bekerja",
  },
  Melanjutkan: {
    icon: GraduationCap,
    color:
      "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40 border-green-200 dark:border-green-800/60",
    label: "Melanjutkan",
  },
  Wirausaha: {
    icon: Rocket,
    color:
      "text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800/60",
    label: "Wirausaha",
  },
};

interface Alumni {
  id: number;
  name: string;
  role: string;
  company: string;
  status: string;
  image: string;
}

// ✅ Interface untuk prop 'config'
interface StatusConfig {
  icon: React.ElementType;
  color: string;
  label: string;
}

type StatusKey = keyof typeof statusConfig;

// ✅ Tipe 'any' diganti dengan 'StatusConfig'
const AlumniCard = ({
  alumni,
  config,
}: {
  alumni: Alumni;
  config: StatusConfig;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const rotateX = (y - 0.5) * -15;
    const rotateY = (x - 0.5) * 15;
    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.05,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10 transition-shadow duration-300 p-6 flex flex-col"
    >
      <div className="flex items-center gap-4 mb-5">
        <Image
          src={alumni.image}
          alt={alumni.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white dark:border-slate-700 shadow-md"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {alumni.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {alumni.role}
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 flex-grow">
        di{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {alumni.company}
        </span>
      </p>
      <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${config.color}`}
        >
          <config.icon className="w-4 h-4" />
          {config.label}
        </span>
      </div>
    </div>
  );
};

const DirektoriAlumni = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const mainRef = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredAlumni = useMemo(() => {
    return alumniData
      .filter((alumni) =>
        filterStatus === "Semua" ? true : alumni.status === filterStatus
      )
      .filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
  const paginatedAlumni = useMemo(
    () =>
      filteredAlumni.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [filteredAlumni, currentPage]
  );

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".anim-header", {
        y: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".anim-filter", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.3,
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current!.children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      });
    }, gridRef);
    return () => ctx.revert();
  }, [paginatedAlumni]);

  return (
    <div ref={mainRef} className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4 anim-header">
            Direktori Alumni
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto anim-header">
            Jelajahi jejak karir para alumni berprestasi kami di berbagai
            bidang.
          </p>
        </header>

        <section className="sticky top-4 z-20 anim-filter mb-12">
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama, posisi, atau institusi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 rounded-xl focus:ring-0 outline-none transition"
              />
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl">
              {["Semua", "Bekerja", "Melanjutkan", "Wirausaha"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => handleFilterChange(status)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors relative"
                  >
                    {filterStatus === status && (
                      <motion.div
                        layoutId="activeFilterHighlight"
                        className="absolute inset-0 bg-white dark:bg-slate-800 shadow-md rounded-lg z-0"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        filterStatus === status
                          ? "text-blue-600 dark:text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {status}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        <main>
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedAlumni.map((alumni) => {
              const key = alumni.status as StatusKey;
              const config = statusConfig[key];
              return (
                <AlumniCard key={alumni.id} alumni={alumni} config={config} />
              );
            })}
          </div>

          {filteredAlumni.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-slate-400">
                Tidak ada alumni yang cocok dengan kriteria Anda.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-16">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Halaman {currentPage} dari {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DirektoriAlumni;
