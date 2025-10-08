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

// Data Alumni
const alumniData = [
  {
    id: 1,
    name: "Aulia Rahman",
    role: "Software Engineer",
    company: "Google",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aulia",
  },
  {
    id: 2,
    name: "Bima Sakti",
    role: "Mahasiswa S2 AI",
    company: "Stanford University",
    status: "Melanjutkan",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bima",
  },
  {
    id: 3,
    name: "Citra Lestari",
    role: "Founder & CEO",
    company: "KopiKita Startup",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Citra",
  },
  {
    id: 4,
    name: "Doni Firmansyah",
    role: "Data Scientist",
    company: "Meta",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Doni",
  },
  {
    id: 5,
    name: "Eka Putri",
    role: "Founder",
    company: "Eco-Friendly Products",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eka",
  },
  {
    id: 6,
    name: "Fajar Nugroho",
    role: "Cybersecurity Analyst",
    company: "BNI",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fajar",
  },
  {
    id: 7,
    name: "Gita Soraya",
    role: "Mahasiswa Kedokteran",
    company: "Universitas Indonesia",
    status: "Melanjutkan",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gita",
  },
  {
    id: 8,
    name: "Hadi Santoso",
    role: "Product Manager",
    company: "Traveloka",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hadi",
  },
  {
    id: 9,
    name: "Indah Permata",
    role: "Digital Marketing Agency",
    company: "Indah Creative",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Indah",
  },
  {
    id: 10,
    name: "Joko Wibowo",
    role: "Mahasiswa S3 Teknik",
    company: "MIT",
    status: "Melanjutkan",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joko",
  },
  {
    id: 11,
    name: "Kartika Sari",
    role: "UI/UX Designer",
    company: "Tokopedia",
    status: "Bekerja",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kartika",
  },
  {
    id: 12,
    name: "Luthfi Hamzah",
    role: "Owner Restoran",
    company: "Dapur Nusantara",
    status: "Wirausaha",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luthfi",
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

const AlumniCard = ({ alumni, config }: { alumni: Alumni; config: any }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
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
        <img
          src={alumni.image}
          alt={alumni.name}
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
  const gridRef = useRef(null);

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

  const handleFilterChange = (status: React.SetStateAction<string>) => {
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
    if (gridRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(gridRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
        });
      }, gridRef);
      return () => ctx.revert();
    }
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
            {/* --- PERBAIKAN FILTER DISINI --- */}
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
              const config = statusConfig[alumni.status];
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
