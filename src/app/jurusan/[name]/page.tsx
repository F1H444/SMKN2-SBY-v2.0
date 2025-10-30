"use client";

// Impor hook dari React dan Next.js
import React, { useState, memo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Impor ikon
import {
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
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Image as ImageIcon, // Ganti nama agar tidak konflik dengan Next/Image
} from "lucide-react";

// Tipe data untuk respons API
interface ApiMajor {
  MajorID: number;
  MajorName: string;
  MajorLead: string;
  MajorDesc: string;
  MajorMaterials: string; // "Pemrograman, Basis Data, ..."
  MajorProspect: string; // "Programmer, Web Developer, ..."
  CreatedAt: string;
  Alumnis: null;
  Users: null;
}

// Tipe data untuk data yang digabungkan
interface Jurusan {
  id: number;
  title: string;
  description: string;
  detailDescription: string;
  kompetensi: string[];
  prospekKerja: string[];
  icon: React.ElementType;
  color: string;
  short: string;
  image: string;
}

// Data visual lokal untuk digabungkan dengan API
// Anda HARUS menyesuaikan path gambar (image) sesuai struktur folder Anda
const majorVisuals = {
  1: { icon: Code, color: "from-blue-500 to-sky-400", short: "RPL", image: "/images/jurusan/rpl.jpg" },
  2: { icon: Cpu, color: "from-red-500 to-orange-400", short: "TKJ", image: "/images/jurusan/tkj.jpg" },
  3: { icon: Wrench, color: "from-gray-600 to-gray-500", short: "TP", image: "/images/jurusan/mesin.jpg" },
  4: { icon: Bike, color: "from-green-500 to-lime-400", short: "TSM", image: "/images/jurusan/tsm.jpg" },
  5: { icon: Car, color: "from-yellow-500 to-amber-400", short: "TKR", image: "/images/jurusan/tkr.jpg" },
  6: { icon: Building, color: "from-indigo-500 to-purple-400", short: "DPIB", image: "/images/jurusan/dpib.jpg" },
  7: { icon: Home, color: "from-cyan-500 to-teal-400", short: "TKP", image: "/images/jurusan/tkp.jpg" },
  8: { icon: ImageIcon, color: "from-pink-500 to-rose-400", short: "ANM", image: "/images/jurusan/animasi.jpg" },
  9: { icon: CircuitBoard, color: "from-emerald-500 to-green-400", short: "TEI", image: "/images/jurusan/tei.jpg" },
  10: { icon: Video, color: "from-violet-500 to-fuchsia-400", short: "TAV", image: "/images/jurusan/tav.jpg" },
  11: { icon: Zap, color: "from-amber-500 to-orange-400", short: "TITL", image: "/images/jurusan/listrik.jpg" },
};
type MajorVisualsKey = keyof typeof majorVisuals;

// Komponen List (tidak berubah)
const ListItem = memo(
  ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <li className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <span className="text-slate-600 dark:text-slate-400">{text}</span>
    </li>
  )
);
ListItem.displayName = "ListItem";

const ProspekListItem = memo(
  ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <li className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
      <span className="text-slate-600 dark:text-slate-400">{text}</span>
    </li>
  )
);
ProspekListItem.displayName = "ProspekListItem";

// Komponen Halaman Utama
export default function JurusanDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Mengambil 'id' dari query URL

  const [major, setMajor] = useState<Jurusan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Hanya jalankan jika 'id' ada
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchMajor = async () => {
      setIsLoading(true);
      try {
        // Ganti URL ini dengan URL API Anda yang sebenarnya
        // Saya asumsikan /api/majors adalah endpoint yang mengembalikan array
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/majors`);
        
        if (!res.ok) {
          throw new Error("Gagal mengambil data jurusan");
        }

        const data: ApiMajor[] = await res.json();

        // Cari jurusan yang sesuai berdasarkan ID
        const apiData = data.find(m => m.MajorID.toString() === id);

        if (apiData) {
          // Ambil data visual yang sesuai
          const visualData = majorVisuals[apiData.MajorID as MajorVisualsKey];

          if (visualData) {
            // Gabungkan data dari API dan data visual lokal
            const combinedData: Jurusan = {
              id: apiData.MajorID,
              title: apiData.MajorName,
              description: apiData.MajorDesc,
              detailDescription: apiData.MajorDesc, // Menggunakan deskripsi yang sama
              kompetensi: apiData.MajorMaterials.split(',').map(s => s.trim()),
              prospekKerja: apiData.MajorProspect.split(',').map(s => s.trim()),
              ...visualData,
            };
            setMajor(combinedData);
          } else {
            console.error("Data visual tidak ditemukan untuk ID:", apiData.MajorID);
            setMajor(null);
          }
        } else {
          // Jurusan dengan ID tersebut tidak ditemukan di API
          setMajor(null);
        }
      } catch (error) {
        console.error("Error fetching major:", error);
        setMajor(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMajor();
  }, [id]); // Jalankan ulang effect jika 'id' berubah

  // Tampilan Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Memuat data jurusan...
          </h1>
        </div>
      </div>
    );
  }

  // Tampilan Jurusan Tidak Ditemukan
  if (!major) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Jurusan Tidak Ditemukan
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Jurusan yang Anda cari dengan ID &quot;{id}&quot; tidak tersedia.
          </p>
          <Link
            href="/jurusan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Jurusan
          </Link>
        </div>
      </div>
    );
  }

  // Tampilan Halaman Detail Jurusan (jika data ditemukan)
  const IconComponent = major.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/jurusan"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-lg text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Jurusan
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div
              className={`w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${major.color} shadow-lg`}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-500 mb-2">
                {major.short}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
                {major.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {major.description}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800 bg-slate-100 dark:bg-gray-900">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-slate-200 dark:bg-gray-800 animate-pulse" />
            )}
            <Image
              src={major.image}
              alt={`Suasana jurusan ${major.title}`}
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 1200px"
              className={`object-cover transition-opacity duration-500 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Tentang Program
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {major.detailDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Kompetensi yang Dipelajari
              </h2>
            </div>
            <ul className="space-y-3">
              {major.kompetensi.map((item) => (
                <ListItem key={item} icon={CheckCircle2} text={item} />
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Prospek Kerja
              </h2>
            </div>
            <ul className="space-y-3">
              {major.prospekKerja.map((item) => (
                <ProspekListItem key={item} icon={Briefcase} text={item} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}