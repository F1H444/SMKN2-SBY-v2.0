"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Code,
  Cpu,
  Wrench,
  Video,
  Building,
  Bike,
  Home,
  CircuitBoard,
  Zap,
  ArrowLeft,
  CheckCircle2,
  Target,
  Trophy,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, memo } from "react";

// PERUBAHAN KUNCI: Data lengkap untuk semua eskul dan path gambar telah diperbarui.
const eskulData = {
  ambalan: {
    id: "ambalan",
    title: "Ambalan (Pramuka)",
    description:
      "Mengajarkan kepemimpinan, kemandirian, dan keterampilan survival di alam terbuka.",
    icon: Home,
    color: "from-green-500 to-emerald-500",
    image: "/img/detaileskul/ambalan.webp",
    detailDescription:
      "Ambalan Pramuka SMKN 2 Surabaya merupakan wadah pembinaan karakter dan kepemimpinan. Anggota dibina untuk menjadi individu yang mandiri, disiplin, dan memiliki jiwa kepemimpinan yang kuat melalui berbagai kegiatan outdoor dan indoor.",
    jadwal: "Jumat, 15:00 - 17:00 WIB",
    lokasi: "Lapangan Upacara & Ruang Pramuka",
    pembina: "Kakak Pembina Pramuka",
    kegiatanUtama: [
      "Latihan Rutin Kepramukaan (PBB, Sandi, Morse)",
      "Kegiatan Perkemahan dan Hiking",
      "Pelantikan Anggota Baru",
      "Bakti Sosial dan Pengabdian Masyarakat",
      "Pelatihan Kepemimpinan dan Outbound",
      "Lomba Kepramukaan Tingkat Kota/Provinsi",
    ],
    prestasi: [
      "Juara 1 Lomba Pionering Tingkat Kota (2024)",
      "Juara 2 Lomba PBB Pramuka Jatim (2023)",
      "Juara Umum Jambore Kwarcab Surabaya (2023)",
    ],
  },
  badminton: {
    id: "badminton",
    title: "Badminton",
    description:
      "Mengasah ketangkasan, kecepatan, dan strategi permainan kompetitif.",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    image: "/img/detaileskul/badminton.webp",
    detailDescription:
      "Ekstrakurikuler Badminton SMKN 2 Surabaya membina siswa dalam olahraga bulu tangkis dengan fokus pada peningkatan teknik, strategi, dan mental bertanding untuk mengembangkan atlet yang berprestasi di tingkat regional maupun nasional.",
    jadwal: "Selasa & Kamis, 15:30 - 17:30 WIB",
    lokasi: "GOR Sekolah",
    pembina: "Pelatih Badminton Bersertifikat",
    kegiatanUtama: [
      "Latihan Teknik Dasar (Footwork, Stroke, Smash)",
      "Sparring dan Game Practice",
      "Physical Training dan Conditioning",
      "Analisis Video dan Strategi Permainan",
      "Try Out dengan Sekolah Lain",
      "Turnamen Internal dan Eksternal",
    ],
    prestasi: [
      "Juara 1 Tunggal Putra SMKN Cup (2024)",
      "Juara 2 Ganda Putri O2SN Kota (2024)",
      "Juara 3 Beregu Putra Popda Jatim (2023)",
    ],
  },
  band: {
    id: "band",
    title: "Band",
    description:
      "Wadah bermusik bersama untuk mengekspresikan kreativitas melalui harmonisasi alat musik modern.",
    icon: Video,
    color: "from-purple-500 to-pink-500",
    image: "/img/detaileskul/band.webp",
    detailDescription:
      "Ekstrakurikuler Band SMKN 2 Surabaya adalah tempat bagi siswa yang memiliki passion dalam musik untuk mengekspresikan kreativitas mereka. Anggota band dilatih untuk tampil di berbagai acara sekolah dan eksternal.",
    jadwal: "Rabu & Sabtu, 15:00 - 17:00 WIB",
    lokasi: "Studio Musik Sekolah",
    pembina: "Guru Seni Budaya & Musisi Profesional",
    kegiatanUtama: [
      "Latihan Instrumen (Gitar, Bass, Drum, Keyboard)",
      "Latihan Vokal dan Harmonisasi",
      "Cover Lagu dan Aransemen",
      "Pembuatan Lagu Original",
      "Performa di Event Sekolah (HUT, Pensi, dll)",
      "Recording dan Audio Production",
    ],
    prestasi: [
      "Juara 1 Band Competition SMA/SMK Se-Surabaya (2024)",
      "Best Vocal Performance Festival Musik Pelajar (2023)",
      "Tampil di Acara Peringatan HUT RI (2023)",
    ],
  },
  basket: {
    id: "basket",
    title: "Basket",
    description:
      "Olahraga basket yang melatih kerja sama tim, strategi, dan kemampuan fisik melalui permainan dinamis.",
    icon: CircuitBoard,
    color: "from-orange-500 to-red-500",
    image: "/img/detaileskul/basket.webp",
    detailDescription:
      "Ekstrakurikuler Basket SMKN 2 Surabaya membina siswa menjadi atlet basket yang tangguh dengan fokus pada teamwork, strategi permainan, dan sportivitas. Tim basket sekolah rutin bertanding di berbagai kompetisi.",
    jadwal: "Senin, Rabu, Jumat, 15:30 - 17:30 WIB",
    lokasi: "Lapangan Basket Sekolah",
    pembina: "Pelatih Basket Berlisensi",
    kegiatanUtama: [
      "Latihan Fundamental (Dribbling, Passing, Shooting)",
      "Team Defense dan Offensive Strategies",
      "Scrimmage dan Full Game Practice",
      "Physical Conditioning dan Strength Training",
      "Video Analysis dan Scouting",
    ],
    prestasi: [
      "Juara 2 DBL East Java Series (2024)",
      "Juara 3 Surabaya Basketball League (2024)",
      "Best Team Spirit O2SN Jatim (2023)",
    ],
  },
  dance: {
    id: "dance",
    title: "Dance (Tari)",
    description:
      "Seni tari yang mengembangkan ekspresi, kreativitas, dan kepercayaan diri melalui gerakan koreografi.",
    icon: ImageIcon,
    color: "from-pink-500 to-rose-500",
    image: "/img/detaileskul/dancer.webp",
    detailDescription:
      "Ekstrakurikuler Dance SMKN 2 Surabaya merupakan wadah bagi siswa untuk mengembangkan kemampuan menari, berkreasi, dan tampil percaya diri. Berbagai genre tari seperti modern, tradisional, dan K-Pop menjadi fokus pembelajaran.",
    jadwal: "Selasa & Kamis, 15:00 - 17:00 WIB",
    lokasi: "Aula Sekolah / Studio Dance",
    pembina: "Koreografer & Instruktur Tari",
    kegiatanUtama: [
      "Latihan Teknik Dasar Tari",
      "Koreografi Modern Dance dan Contemporary",
      "Tari Tradisional Nusantara",
      "K-Pop Dance Cover",
      "Performa di Event Sekolah dan Eksternal",
    ],
    prestasi: [
      "Juara 1 Dance Competition Se-Jatim (2024)",
      "Best Choreography Festival Seni Pelajar (2023)",
      "Juara Favorit K-Pop Dance Cover Contest (2024)",
    ],
  },
  futsal: {
    id: "futsal",
    title: "Futsal",
    description:
      "Olahraga futsal yang melatih kecepatan, teknik, dan koordinasi tim dalam permainan sepak bola indoor.",
    icon: Bike,
    color: "from-blue-500 to-cyan-500",
    image: "/img/detaileskul/futsal.webp",
    detailDescription:
      "Ekstrakurikuler Futsal SMKN 2 Surabaya membina siswa dalam olahraga futsal dengan standar kompetitif. Program latihan mencakup peningkatan skill individu, strategi tim, dan mental bertanding.",
    jadwal: "Senin, Rabu, Jumat, 16:00 - 18:00 WIB",
    lokasi: "Lapangan Futsal Sekolah",
    pembina: "Pelatih Futsal Berlisensi AFC",
    kegiatanUtama: [
      "Latihan Teknik (Dribbling, Passing, Shooting)",
      "Taktik dan Formasi Tim",
      "Small Sided Games dan Full Match",
      "Physical Training dan Stamina",
      "Tournament Preparation",
    ],
    prestasi: [
      "Juara 1 Futsal Competition Pelajar Se-Surabaya (2024)",
      "Juara 2 Liga Futsal O2SN Jatim (2024)",
      "Best Player Award SMKN Futsal Cup (2023)",
    ],
  },
  jurnalis: {
    id: "jurnalis",
    title: "Jurnalis",
    description:
      "Kegiatan jurnalistik yang melatih kemampuan menulis, meliput berita, dan menyebarkan informasi.",
    icon: Code,
    color: "from-slate-500 to-gray-600",
    image: "/img/detaileskul/jurnalis.webp",
    detailDescription:
      "Ekstrakurikuler Jurnalis adalah wadah bagi siswa yang tertarik dalam dunia jurnalistik dan media. Anggota dilatih dalam penulisan berita, fotografi, videografi, dan mengelola media sekolah.",
    jadwal: "Kamis, 15:00 - 17:00 WIB",
    lokasi: "Ruang Redaksi / Lab Komputer",
    pembina: "Guru Bahasa Indonesia & Jurnalis Profesional",
    kegiatanUtama: [
      "Teknik Penulisan Berita (5W+1H)",
      "Fotografi Jurnalistik dan Editing",
      "Videografi dan Video Editing",
      "Wawancara dan Reportase",
      "Pengelolaan Media Sosial Sekolah",
    ],
    prestasi: [
      "Juara 1 Lomba Jurnalistik Siswa Tingkat Jatim (2024)",
      "Best Photo Journalism Competition (2023)",
      "Media Sekolah Terbaik Se-Surabaya (2023)",
    ],
  },
  paskibra: {
    id: "paskibra",
    title: "Paskibra",
    description:
      "Pasukan Pengibar Bendera yang melatih kedisiplinan, keberanian, dan jiwa patriotisme.",
    icon: Wrench,
    color: "from-red-500 to-rose-600",
    image: "/img/detaileskul/paskib.webp",
    detailDescription:
      "Paskibra SMKN 2 Surabaya membina siswa menjadi pasukan pengibar bendera yang disiplin, berani, dan penuh dedikasi. Anggota Paskibra menjadi representasi sekolah dalam upacara bendera.",
    jadwal: "Selasa & Kamis, 15:30 - 17:30 WIB",
    lokasi: "Lapangan Upacara",
    pembina: "Pembina Paskibra & TNI",
    kegiatanUtama: [
      "Latihan PBB (Peraturan Baris Berbaris)",
      "Formasi dan Regulasi Pengibar Bendera",
      "Physical Training dan Ketahanan Fisik",
      "Latihan Komando dan Kepemimpinan",
      "Seleksi Paskibraka Tingkat Kota/Provinsi",
    ],
    prestasi: [
      "Paskibraka HUT RI Tingkat Kota Surabaya (2024)",
      "Juara 1 Lomba PBB Pelajar Se-Jatim (2024)",
      "Best Discipline Award Paskibra Competition (2023)",
    ],
  },
  sbl: {
    id: "sbl",
    title: "Seni Bela Diri",
    description:
      "Seni bela diri yang melatih pertahanan diri, disiplin, dan kekuatan mental serta fisik.",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    image: "/img/detaileskul/pencak.webp",
    detailDescription:
      "Ekstrakurikuler Seni Bela Diri mengajarkan berbagai teknik seperti Pencak Silat, Karate, dan Taekwondo. Fokusnya pada pertahanan diri, pembentukan karakter, dan sportivitas.",
    jadwal: "Rabu & Jumat, 15:30 - 17:30 WIB",
    lokasi: "Aula Sekolah / Lapangan",
    pembina: "Pelatih Bela Diri Bersertifikat",
    kegiatanUtama: [
      "Teknik Dasar (Pukulan, Tendangan, Tangkisan)",
      "Jurus dan Koreografi Bela Diri",
      "Sparring dan Aplikasi Praktis",
      "Physical Conditioning dan Flexibility",
      "Persiapan Ujian Kenaikan Tingkat",
    ],
    prestasi: [
      "Juara 1 Pencak Silat O2SN Tingkat Kota (2024)",
      "Medali Emas Karate Popda Jatim (2024)",
      "Juara 2 Taekwondo Championship (2023)",
    ],
  },
  ski: {
    id: "ski",
    title: "Seni Karawitan",
    description:
      "Seni musik tradisional Jawa yang melestarikan budaya melalui gamelan dan vokal.",
    icon: Building,
    color: "from-yellow-500 to-lime-500",
    image: "/img/detaileskul/ski.webp",
    detailDescription:
      "Ekstrakurikuler Seni Karawitan adalah wadah pelestarian seni musik tradisional Jawa. Anggota dilatih memainkan berbagai instrumen gamelan dan vokal tradisional.",
    jadwal: "Rabu, 15:00 - 17:00 WIB",
    lokasi: "Pendopo / Ruang Karawitan",
    pembina: "Dalang & Seniman Karawitan",
    kegiatanUtama: [
      "Belajar Instrumen Gamelan (Saron, Kendang, dll)",
      "Vokal Tradisional Jawa (Sindhèn)",
      "Tabuh dan Gendhing Jawa",
      "Performa di Acara Sekolah dan Budaya",
    ],
    prestasi: [
      "Juara 1 Lomba Karawitan Pelajar Tingkat Jatim (2024)",
      "Best Performance Festival Budaya Nusantara (2023)",
      "Penghargaan Pelestari Budaya dari Pemkot (2024)",
    ],
  },
  skk: {
    id: "skk",
    title: "Seni Kriya Kayu",
    description:
      "Seni kerajinan kayu yang mengasah kreativitas dalam menciptakan produk berbahan dasar kayu.",
    icon: Wrench,
    color: "from-stone-500 to-neutral-500",
    image: "/img/detaileskul/skk.webp",
    detailDescription:
      "Ekstrakurikuler Seni Kriya Kayu melatih siswa dalam seni kerajinan dan pengolahan kayu, dari desain hingga finishing untuk menghasilkan produk kriya berkualitas.",
    jadwal: "Kamis, 15:00 - 17:00 WIB",
    lokasi: "Workshop Kayu / Lab Kriya",
    pembina: "Guru Kriya & Pengrajin Kayu",
    kegiatanUtama: [
      "Teknik Dasar Pengerjaan Kayu",
      "Desain dan Sketsa Produk Kriya",
      "Penggunaan Alat (Gergaji, Pahat, dll)",
      "Ukir Kayu dan Relief",
      "Finishing dan Pewarnaan Kayu",
    ],
    prestasi: [
      "Juara 1 Lomba Kriya Kayu Pelajar Se-Jatim (2024)",
      "Best Creative Product Exhibition (2023)",
      "Karya Terpilih Pameran Nasional Kriya (2024)",
    ],
  },
  tari: {
    id: "tari",
    title: "Tari Tradisional",
    description:
      "Pelestarian tari tradisional Indonesia yang kaya akan nilai budaya nusantara.",
    icon: ImageIcon,
    color: "from-fuchsia-500 to-violet-500",
    image: "/img/detaileskul/tari.webp",
    detailDescription:
      "Ekstrakurikuler Tari Tradisional fokus pada pelestarian dan pengembangan tari-tari tradisional Indonesia, khususnya Jawa Timur. Anggota dilatih menguasai berbagai tarian klasik dan kreasi baru.",
    jadwal: "Selasa & Jumat, 15:00 - 17:00 WIB",
    lokasi: "Pendopo / Aula Budaya",
    pembina: "Koreografer Tari Tradisional",
    kegiatanUtama: [
      "Tari Klasik Jawa (Gambyong, Srimpi, dll)",
      "Tari Kreasi Nusantara",
      "Teknik Dasar Tari Tradisional",
      "Pengenalan Busana dan Tata Rias Tari",
      "Pementasan di Acara Budaya",
    ],
    prestasi: [
      "Juara 1 Lomba Tari Tradisional Tingkat Nasional (2024)",
      "Best Costume & Performance Award (2023)",
      "Penghargaan Duta Budaya Kota Surabaya (2023)",
    ],
  },
  voli: {
    id: "voli",
    title: "Voli",
    description:
      "Olahraga bola voli yang melatih koordinasi, refleks, dan kekompakan tim.",
    icon: Cpu,
    color: "from-teal-500 to-cyan-500",
    image: "/img/detaileskul/voli.webp",
    detailDescription:
      "Ekstrakurikuler Voli SMKN 2 Surabaya membina siswa dalam olahraga bola voli dengan standar kompetitif. Program latihan dirancang untuk meningkatkan kemampuan teknik individu dan kerja sama tim.",
    jadwal: "Selasa, Kamis, Sabtu, 15:30 - 17:30 WIB",
    lokasi: "Lapangan Voli Sekolah",
    pembina: "Pelatih Voli Berlisensi",
    kegiatanUtama: [
      "Teknik Dasar (Passing, Service, Smash, Block)",
      "Formasi dan Rotasi Tim",
      "Strategi Offensive dan Defensive",
      "Scrimmage dan Match Practice",
      "Physical Training dan Conditioning",
    ],
    prestasi: [
      "Juara 2 Voli Putra O2SN Tingkat Provinsi (2024)",
      "Juara 1 Voli Putri SMKN Cup (2024)",
      "Best Setter Award Tournament Pelajar (2023)",
    ],
  },
};

const KegiatanListItem = memo(({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
    <span className="text-slate-600 dark:text-slate-400">{text}</span>
  </li>
));
KegiatanListItem.displayName = "KegiatanListItem";

const PrestasiListItem = memo(({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
    <span className="text-slate-600 dark:text-slate-400">{text}</span>
  </li>
));
PrestasiListItem.displayName = "PrestasiListItem";

export default function EskulDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const eskul = eskulData[id as keyof typeof eskulData];

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!eskul) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ekstrakurikuler Tidak Ditemukan
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Ekstrakurikuler yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/eskul"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Ekstrakurikuler
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = eskul.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/eskul"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-lg text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Ekstrakurikuler
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
              className={`w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${eskul.color} shadow-lg`}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
                {eskul.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {eskul.description}
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
              src={eskul.image}
              alt={`Suasana ekstrakurikuler ${eskul.title}`}
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
            Tentang Ekstrakurikuler
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {eskul.detailDescription}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Jadwal
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {eskul.jadwal}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Lokasi
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {eskul.lokasi}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Pembina
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {eskul.pembina}
              </p>
            </div>
          </div>
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
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Kegiatan Utama
              </h2>
            </div>
            <ul className="space-y-3">
              {eskul.kegiatanUtama.map((item) => (
                <KegiatanListItem key={item} text={item} />
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
              <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Prestasi
              </h2>
            </div>
            <ul className="space-y-3">
              {eskul.prestasi.map((item) => (
                <PrestasiListItem key={item} text={item} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
