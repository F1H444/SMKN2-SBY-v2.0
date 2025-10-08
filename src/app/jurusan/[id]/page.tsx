"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
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
} from "lucide-react";
import Link from "next/link";

// Data lengkap semua jurusan
const jurusanData = {
  rpl: {
    id: "rpl",
    short: "RPL",
    title: "Rekayasa Perangkat Lunak",
    description:
      "Mempelajari pengembangan, pemeliharaan, dan manajemen kualitas perangkat lunak secara sistematis.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    detailDescription:
      "Program keahlian Rekayasa Perangkat Lunak mempersiapkan siswa untuk menjadi developer profesional yang mampu merancang, mengembangkan, dan memelihara aplikasi berbasis web, mobile, dan desktop.",
    kompetensi: [
      "Pemrograman Web (HTML, CSS, JavaScript, PHP)",
      "Pengembangan Aplikasi Mobile (Android/iOS)",
      "Database Management (MySQL, PostgreSQL)",
      "UI/UX Design dan Prototyping",
      "Version Control dengan Git & GitHub",
      "Framework Modern (React, Laravel, Flutter)",
    ],
    prospekKerja: [
      "Full Stack Developer",
      "Mobile App Developer",
      "Front-end Developer",
      "Back-end Developer",
      "Software Engineer",
      "UI/UX Designer",
      "Quality Assurance Engineer",
    ],
  },
  tkj: {
    id: "tkj",
    short: "TKJ",
    title: "Teknik Komputer dan Jaringan",
    description:
      "Fokus pada perancangan, instalasi, dan konfigurasi infrastruktur jaringan komputer dan server.",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
    detailDescription:
      "Program keahlian Teknik Komputer dan Jaringan mempersiapkan siswa menjadi teknisi jaringan profesional yang mampu merancang, menginstal, mengkonfigurasi dan memelihara infrastruktur jaringan komputer.",
    kompetensi: [
      "Instalasi dan Konfigurasi Jaringan LAN/WAN",
      "Routing dan Switching (Cisco, MikroTik)",
      "Network Security dan Firewall",
      "Server Administration (Windows/Linux)",
      "Wireless Network Configuration",
      "Troubleshooting Jaringan",
    ],
    prospekKerja: [
      "Network Administrator",
      "Network Engineer",
      "System Administrator",
      "IT Support Specialist",
      "Network Security Analyst",
      "Data Center Technician",
    ],
  },
  tpm: {
    id: "tpm",
    short: "TPM",
    title: "Teknik Pemesinan",
    description:
      "Mengasah keterampilan dalam proses produksi manufaktur menggunakan mesin perkakas presisi.",
    icon: Wrench,
    color: "from-slate-500 to-gray-600",
    detailDescription:
      "Program keahlian Teknik Pemesinan mempersiapkan siswa menjadi operator dan teknisi mesin produksi yang terampil dalam mengoperasikan mesin perkakas konvensional dan CNC.",
    kompetensi: [
      "Pengoperasian Mesin Bubut dan Frais",
      "Pemrograman CNC (Computer Numerical Control)",
      "Teknik Pengukuran Presisi",
      "Membaca Gambar Teknik",
      "Pemilihan Material dan Tool",
      "Quality Control Produksi",
    ],
    prospekKerja: [
      "Operator Mesin CNC",
      "Machinist",
      "Quality Control Inspector",
      "Production Supervisor",
      "Tool & Die Maker",
      "Manufacturing Engineer",
    ],
  },
  tsm: {
    id: "tsm",
    short: "TSM",
    title: "Teknik Sepeda Motor",
    description:
      "Spesialisasi dalam perawatan, perbaikan, dan modifikasi teknologi sepeda motor modern.",
    icon: Bike,
    color: "from-orange-500 to-amber-500",
    detailDescription:
      "Program keahlian Teknik Sepeda Motor mempersiapkan siswa menjadi mekanik profesional yang ahli dalam perawatan, perbaikan, dan modifikasi sepeda motor modern.",
    kompetensi: [
      "Sistem Kelistrikan Sepeda Motor",
      "Engine Overhaul dan Tune-Up",
      "Sistem Injeksi Bahan Bakar (EFI)",
      "Diagnosa Kerusakan dengan Scanner",
      "Perawatan Berkala dan Service",
      "Modifikasi dan Custom Motor",
    ],
    prospekKerja: [
      "Mekanik Sepeda Motor",
      "Service Advisor",
      "Workshop Supervisor",
      "Technical Support Engineer",
      "Wirausaha Bengkel Motor",
      "Spare Parts Specialist",
    ],
  },
  tkr: {
    id: "tkr",
    short: "TKR",
    title: "Teknik Kendaraan Ringan",
    description:
      "Mempersiapkan tenaga ahli di bidang perawatan dan perbaikan mobil modern.",
    icon: Car,
    color: "from-red-500 to-rose-500",
    detailDescription:
      "Program keahlian Teknik Kendaraan Ringan mempersiapkan siswa menjadi teknisi otomotif yang kompeten dalam perawatan dan perbaikan kendaraan roda empat modern.",
    kompetensi: [
      "Sistem Kelistrikan dan Elektronika Mobil",
      "Engine Management System",
      "Sistem AC dan Kelistrikan Body",
      "Diagnosa dengan Scan Tool",
      "Overhaul Mesin dan Transmisi",
      "Sistem Rem dan Suspensi",
    ],
    prospekKerja: [
      "Teknisi Otomotif",
      "Service Advisor",
      "Auto Electrician",
      "Workshop Manager",
      "Technical Support",
      "Wirausaha Bengkel Mobil",
    ],
  },
  dpib: {
    id: "dpib",
    short: "DPIB",
    title: "Desain Pemodelan & Info Bangunan",
    description:
      "Mempelajari perancangan bangunan, pemodelan 3D, dan manajemen informasi konstruksi (BIM).",
    icon: Building,
    color: "from-yellow-500 to-lime-500",
    detailDescription:
      "Program keahlian DPIB mempersiapkan siswa menjadi drafter dan desainer bangunan yang mampu membuat gambar teknik dan model 3D menggunakan teknologi BIM (Building Information Modeling).",
    kompetensi: [
      "AutoCAD 2D dan 3D",
      "Building Information Modeling (BIM)",
      "SketchUp dan 3D Rendering",
      "Menggambar Konstruksi Bangunan",
      "RAB (Rencana Anggaran Biaya)",
      "Spesifikasi Teknis Bangunan",
    ],
    prospekKerja: [
      "Drafter Arsitektur",
      "BIM Modeler",
      "Surveyor",
      "Quantity Surveyor",
      "CAD Operator",
      "Estimator Biaya",
    ],
  },
  tkp: {
    id: "tkp",
    short: "TKP",
    title: "Teknik Konstruksi & Perumahan",
    description:
      "Fokus pada pelaksanaan, pengawasan, dan manajemen proyek konstruksi gedung dan perumahan.",
    icon: Home,
    color: "from-stone-500 to-neutral-500",
    detailDescription:
      "Program keahlian Teknik Konstruksi dan Perumahan mempersiapkan siswa menjadi teknisi konstruksi yang kompeten dalam pelaksanaan dan pengawasan proyek pembangunan.",
    kompetensi: [
      "Pekerjaan Beton dan Bekisting",
      "Pekerjaan Struktur Bangunan",
      "Ilmu Ukur Tanah (Surveying)",
      "Manajemen Proyek Konstruksi",
      "K3 (Keselamatan dan Kesehatan Kerja)",
      "Quality Control Konstruksi",
    ],
    prospekKerja: [
      "Site Engineer",
      "Surveyor Lapangan",
      "Supervisor Konstruksi",
      "Quality Control Inspector",
      "Estimator Proyek",
      "Mandor Bangunan",
    ],
  },
  animasi: {
    id: "animasi",
    short: "ANI",
    title: "Animasi",
    description:
      "Mengembangkan kreativitas dalam pembuatan animasi 2D, 3D, dan efek visual untuk berbagai media.",
    icon: ImageIcon,
    color: "from-purple-500 to-violet-500",
    detailDescription:
      "Program keahlian Animasi mempersiapkan siswa menjadi animator profesional yang mampu menciptakan karya animasi 2D, 3D, dan efek visual untuk film, game, dan media digital.",
    kompetensi: [
      "Animasi 2D (Adobe Animate, Toon Boom)",
      "Animasi 3D (Blender, Maya)",
      "Video Editing (Premiere Pro, After Effects)",
      "Character Design dan Rigging",
      "Storyboarding dan Concept Art",
      "Motion Graphics",
    ],
    prospekKerja: [
      "Animator 2D/3D",
      "Motion Graphics Designer",
      "Video Editor",
      "Character Designer",
      "Visual Effects Artist",
      "Game Animator",
    ],
  },
  elektro: {
    id: "elektro",
    short: "TEI",
    title: "Teknik Elektronika Industri",
    description:
      "Mempelajari perancangan, perakitan, dan pemeliharaan sistem kontrol elektronik di industri.",
    icon: CircuitBoard,
    color: "from-teal-500 to-cyan-500",
    detailDescription:
      "Program keahlian Teknik Elektronika Industri mempersiapkan siswa menjadi teknisi elektronika yang ahli dalam sistem kontrol otomatis dan instrumentasi industri.",
    kompetensi: [
      "PLC (Programmable Logic Controller)",
      "Sistem Kontrol dan Otomasi Industri",
      "Elektronika Digital dan Analog",
      "Pneumatik dan Hidrolik",
      "Sensor dan Instrumentasi",
      "Robotika Industri",
    ],
    prospekKerja: [
      "Teknisi Elektronika Industri",
      "PLC Programmer",
      "Maintenance Engineer",
      "Automation Technician",
      "Instrument Technician",
      "Control System Engineer",
    ],
  },
  tav: {
    id: "tav",
    short: "TAV",
    title: "Teknik Audio Video",
    description:
      "Fokus pada perbaikan, instalasi, dan perawatan perangkat elektronik audio dan video.",
    icon: Video,
    color: "from-fuchsia-500 to-pink-500",
    detailDescription:
      "Program keahlian Teknik Audio Video mempersiapkan siswa menjadi teknisi profesional dalam bidang perawatan dan perbaikan perangkat audio visual modern.",
    kompetensi: [
      "Service Elektronika Consumer",
      "Instalasi Sound System",
      "Perbaikan TV dan Monitor",
      "CCTV Installation",
      "Home Theater Setup",
      "Audio Mixing dan Recording",
    ],
    prospekKerja: [
      "Teknisi Audio Video",
      "CCTV Installer",
      "Sound Engineer",
      "Broadcasting Technician",
      "Home Theater Specialist",
      "Wirausaha Service Elektronik",
    ],
  },
  titl: {
    id: "titl",
    short: "TITL",
    title: "Teknik Instalasi Tenaga Listrik",
    description:
      "Berfokus pada instalasi, pemeliharaan, dan perbaikan sistem tenaga listrik di gedung dan industri.",
    icon: Zap,
    color: "from-sky-500 to-indigo-500",
    detailDescription:
      "Program keahlian Teknik Instalasi Tenaga Listrik mempersiapkan siswa menjadi teknisi listrik yang kompeten dalam instalasi dan pemeliharaan sistem kelistrikan.",
    kompetensi: [
      "Instalasi Listrik Rumah dan Gedung",
      "Instalasi Motor Listrik 3 Fasa",
      "Pemasangan Panel Listrik",
      "Sistem Pembangkit Listrik",
      "Solar Panel Installation",
      "Grounding dan Proteksi Listrik",
    ],
    prospekKerja: [
      "Teknisi Listrik",
      "Electrical Installer",
      "Maintenance Electrical",
      "Solar Panel Technician",
      "Building Electrician",
      "Wirausaha Instalasi Listrik",
    ],
  },
};

export default function JurusanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const jurusan = jurusanData[id as keyof typeof jurusanData];

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
    <div className="min-h-screen pt-24 pb-8 px-8 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/jurusan"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-700 rounded-lg text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Jurusan
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-start gap-6 mb-6">
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

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <IconComponent className="w-32 h-32 mx-auto mb-4 text-slate-400 dark:text-slate-600" />
                <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                  {jurusan.title}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detail Description */}
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
          {/* Kompetensi */}
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
              {jurusan.kompetensi.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Prospek Kerja */}
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
              {jurusan.prospekKerja.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
