"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
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
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, memo } from "react";

// Data lengkap dan diperbarui dengan path gambar dan konten yang sesuai.
const jurusanData = {
  rpl: {
    id: "rpl",
    short: "RPL",
    title: "Rekayasa Perangkat Lunak",
    description:
      "Mendalami cara pengembangan perangkat lunak secara sistematis dan profesional.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    image: "/img/detailjurusan/rpl.webp",
    detailDescription:
      "Program keahlian RPL mendidik siswa untuk menjadi pengembang perangkat lunak yang kompeten, mampu merancang, membangun, dan mengelola aplikasi web, mobile, dan desktop menggunakan teknologi terkini.",
    kompetensi: [
      "Pemrograman web",
      "Pemrograman perangkat bergerak",
      "Pemrograman berbasis objek",
    ],
    prospekKerja: [
      "Software engineer/programmer",
      "Mobile computing",
      "IT Consultant",
      "System analyst",
      "Game developer",
      "Software tester",
    ],
  },
  tkj: {
    id: "tkj",
    short: "TKJ",
    title: "Teknik Komputer dan Jaringan",
    description:
      "Mempelajari cara merakit komputer dan menginstal program komputer.",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
    image: "/img/detailjurusan/tkj.webp",
    detailDescription:
      "Siswa TKJ dipersiapkan untuk menjadi ahli di bidang infrastruktur teknologi informasi, mulai dari perakitan, instalasi, hingga administrasi jaringan dan server yang kompleks.",
    kompetensi: [
      "Administrasi infrastruktur Jaringan",
      "Praktikum Routing Dinamis dengan protokol OSPF",
      "Konfigurasi Routing dinamis dengan Protokol RIP",
    ],
    prospekKerja: [
      "Teknisi",
      "Marketer / Sales",
      "PNS",
      "Desainer",
      "Programmer",
      "System Analyst",
      "Network Administrator",
      "Game Developer",
    ],
  },
  tpm: {
    id: "tpm",
    short: "TPM",
    title: "Teknik Pemesinan",
    description: "Mempersiapkan tenaga kerja terampil di bidang pemesinan.",
    icon: Wrench,
    color: "from-slate-500 to-gray-600",
    image: "/img/detailjurusan/tpm.webp",
    detailDescription:
      "Jurusan ini fokus pada pembentukan tenaga ahli yang mahir dalam mengoperasikan mesin produksi presisi, baik manual maupun berbasis komputer (CNC), untuk menciptakan komponen industri.",
    kompetensi: [
      "Mengoperasikan mesin produksi manual maupun CNC (Computer Numerical Control)",
    ],
    prospekKerja: [
      "Bekerja di Industri Otomotif",
      "Bekerja bagian Konveksi energi",
      "Bekerja pada industri Bioteknologi",
      "Bergabung dengan PJB (Pembangkit Jawa Bali)",
      "Bekerja pada Industri pertambangan",
      "Drafter",
    ],
  },
  tkr: {
    id: "tkr",
    short: "TKR",
    title: "Teknik Kendaraan Ringan",
    description:
      "Menekankan keahlian pada penguasaan jasa perbaikan kendaraan ringan.",
    icon: Car,
    color: "from-red-500 to-rose-500",
    image: "/img/detailjurusan/tkr.webp",
    detailDescription:
      "Program ini dirancang untuk menghasilkan mekanik dan teknisi handal yang mampu melakukan diagnosa, perawatan, dan perbaikan pada sistem-sistem kompleks kendaraan roda empat modern.",
    kompetensi: [
      "Memahami dasar - dasar mesin",
      "Sampai memperbaiki, menerapkan, memelihara komponen sistem kerja mesin",
    ],
    prospekKerja: [
      "Industri Otomotif",
      "Mekanik",
      "Operator alat berat",
      "Wirausaha",
      "Sektor swasta dll",
    ],
  },
  tkp: {
    id: "tkp",
    short: "TKP",
    title: "Teknik Konstruksi & Perumahan",
    description: "Mempelajari ilmu tentang konstruksi bangunan dan furniture.",
    icon: Home,
    color: "from-stone-500 to-neutral-500",
    image: "/img/detailjurusan/tkp.webp",
    detailDescription:
      "Siswa dididik untuk menguasai berbagai aspek dalam dunia konstruksi, mulai dari perencanaan, pengukuran, pelaksanaan, hingga pengawasan proyek bangunan dan properti.",
    kompetensi: [
      "Gambar manual dan mekanika teknik",
      "Teknik pengukuran tanah dan dasar-dasar konstruksi bangunan",
      "Perencanaan, pelaksanaan serta pengawasan",
      "Bisnis Konstruksi dan Properti",
      "Estimasi biaya, pengelolaan konstruksi & properti",
      "Produk kreatif & kewirausahaan",
    ],
    prospekKerja: [
      "Drafter",
      "Quantity Surveyor",
      "Quality Control",
      "Pelaksana lapangan",
      "Logistik",
      "Konstruksi perencana",
      "Pengendali proyek",
      "Kontraktor/Pemborong",
    ],
  },
  titl: {
    id: "titl",
    short: "TITL",
    title: "Teknik Instalasi Tenaga Listrik",
    description:
      "Mendidik keahlian dalam perencanaan dan pemasangan instalasi penerangan.",
    icon: Zap,
    color: "from-sky-500 to-indigo-500",
    image: "/img/detailjurusan/titl.webp",
    detailDescription:
      "Program ini mempersiapkan teknisi ahli di bidang ketenagalistrikan, mulai dari instalasi skala rumah tangga hingga sistem yang lebih kompleks seperti panel surya dan PLC.",
    kompetensi: [
      "Praktik Instalasi penerangan listrik",
      "Merakit panel Surya",
      "PLC (Programable logic Controller)",
      "Merawat dan memperbaiki alat rumah dll",
    ],
    prospekKerja: [
      "Bekerja di bidang pembangkitan, transmisi, distribusi, dan juga pemanfaatan tenaga listrik sebagai peneliti, perancang, insinyur operasi, dan juga pemeliharaan sistem dan peralatan tenaga listrik di instansi pemerintahan dan berbagai industri ketenagalistrikan.",
    ],
  },
  tav: {
    id: "tav",
    short: "TAV",
    title: "Teknik Audio Video",
    description:
      "Jurusan dalam bidang elektronika, khususnya pengolahan sistem audio dan video.",
    icon: Video,
    color: "from-fuchsia-500 to-pink-500",
    image: "/img/detailjurusan/tav.webp",
    detailDescription:
      "Siswa dibekali keterampilan untuk menjadi teknisi ahli dalam instalasi, perbaikan, dan pemeliharaan berbagai perangkat audio dan video, serta menerapkan standar keselamatan kerja (K3).",
    kompetensi: [
      "Menerapkan dasar-dasar Kelistrikan, Elektronika dan Teknik Digital",
      "Menerapkan keselamatan, kesehatan kerja (K3)",
    ],
    prospekKerja: [
      "Teknisi instalasi audio Vidio",
      "Sound Enginner",
      "Wirausaha",
      "Sektor swasta",
    ],
  },
  tei: {
    // ID SUDAH KONSISTEN
    id: "tei",
    short: "TEI",
    title: "Teknik Elektronika Industri",
    description:
      "Mendidik siswa agar mempunyai kemampuan di bidang sistem kontrol dan maintenance.",
    icon: CircuitBoard,
    color: "from-teal-500 to-cyan-500",
    image: "/img/detailjurusan/tei.webp",
    detailDescription:
      "Fokus jurusan ini adalah pada sistem kontrol dan pemeliharaan peralatan industri berbasis 'electrical control' dan 'micro processor' yang erat kaitannya dengan proses produksi.",
    kompetensi: [
      "Pengetahuan dan keterampilan elektronika umum, mikrokontroller dan mikroprocessor, pneumatic dan PLC, programming berbasis komputer yang erat kaitannya dengan proses produksi di industri.",
    ],
    prospekKerja: [
      "Teknisi industri",
      "Sound Enginner",
      "Wirausaha",
      "Sektor swasta",
    ],
  },
  animasi: {
    id: "animasi",
    short: "ANI",
    title: "Animasi",
    description:
      "Mempelajari teori dan teknik dalam membuat animasi 2D, 3D, film, dan game.",
    icon: ImageIcon,
    color: "from-purple-500 to-violet-500",
    image: "/img/detailjurusan/ani.webp",
    detailDescription:
      "Jurusan Animasi, yang berdiri sejak 2005, membekali siswa dengan keterampilan kreatif dan teknis untuk menghasilkan konten visual bergerak untuk berbagai platform.",
    kompetensi: [
      "3D (Dimensi) Modelling",
      "Illustration",
      "Storyboard artist",
      "Animate 2D dan 3D",
    ],
    prospekKerja: [
      "Animator",
      "Ilustrator",
      "Storyboard Artist",
      "Desain Karakter",
      "Desainer Grafis",
      "Konten Kreator",
    ],
  },
  dpib: {
    id: "dpib",
    short: "DPIB",
    title: "Desain Pemodelan & Info Bangunan",
    description:
      "Mempelajari perancangan bangunan, pemodelan 3D, dan manajemen BIM.",
    icon: Building,
    color: "from-yellow-500 to-lime-500",
    image: "/img/detailjurusan/dpib.webp", // Gambar default
    detailDescription:
      "Program keahlian DPIB mempersiapkan siswa menjadi drafter dan desainer bangunan yang mampu membuat gambar teknik dan model 3D menggunakan teknologi BIM.",
    kompetensi: [
      "AutoCAD 2D dan 3D",
      "Building Information Modeling (BIM)",
      "SketchUp dan 3D Rendering",
      "RAB (Rencana Anggaran Biaya)",
    ],
    prospekKerja: [
      "Drafter Arsitektur",
      "BIM Modeler",
      "Surveyor",
      "Quantity Surveyor",
      "Estimator Biaya",
    ],
  },
  tsm: {
    id: "tsm",
    short: "TSM",
    title: "Teknik Sepeda Motor",
    description:
      "Spesialisasi dalam perawatan, perbaikan, dan modifikasi sepeda motor.",
    icon: Bike,
    color: "from-orange-500 to-amber-500",
    image: "/img/detailjurusan/default.webp", // Gambar default
    detailDescription:
      "Program keahlian Teknik Sepeda Motor mempersiapkan siswa menjadi mekanik profesional yang ahli dalam perawatan, perbaikan, dan modifikasi sepeda motor modern.",
    kompetensi: [
      "Sistem Kelistrikan Sepeda Motor",
      "Engine Overhaul dan Tune-Up",
      "Sistem Injeksi Bahan Bakar (EFI)",
      "Diagnosa Kerusakan",
    ],
    prospekKerja: [
      "Mekanik Sepeda Motor",
      "Service Advisor",
      "Workshop Supervisor",
      "Wirausaha Bengkel Motor",
    ],
  },
};

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

export default function JurusanDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const jurusan = jurusanData[id as keyof typeof jurusanData];

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!jurusan) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Jurusan Tidak Ditemukan
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Jurusan yang Anda cari tidak tersedia.
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

  const IconComponent = jurusan.icon;

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
              className={`w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${jurusan.color} shadow-lg`}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-500 mb-2">
                {jurusan.short}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
                {jurusan.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {jurusan.description}
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
              src={jurusan.image}
              alt={`Suasana jurusan ${jurusan.title}`}
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 1200px"
              className={`object-contain transition-opacity duration-500 ${
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
            {jurusan.detailDescription}
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
              {jurusan.kompetensi.map((item) => (
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
              {jurusan.prospekKerja.map((item) => (
                <ProspekListItem key={item} icon={Briefcase} text={item} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
