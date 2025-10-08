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

const eskulData = {
  ambalan: {
    id: "ambalan",
    title: "Ambalan (Pramuka)",
    description:
      "Kegiatan kepramukaan yang mengajarkan kepemimpinan, kemandirian, dan keterampilan survival di alam terbuka.",
    icon: Home,
    color: "from-green-500 to-emerald-500",
    detailDescription:
      "Ambalan Pramuka SMKN 2 Surabaya merupakan wadah pembinaan karakter dan kepemimpinan melalui kegiatan kepramukaan. Anggota dibina untuk menjadi individu yang mandiri, disiplin, dan memiliki jiwa kepemimpinan yang kuat melalui berbagai kegiatan outdoor dan indoor.",
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
      "Penghargaan Gudep Teladan Tingkat Kota (2024)",
    ],
  },
  badminton: {
    id: "badminton",
    title: "Badminton",
    description:
      "Olahraga bulu tangkis untuk mengasah ketangkasan, kecepatan, dan strategi permainan kompetitif.",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    detailDescription:
      "Ekstrakurikuler Badminton SMKN 2 Surabaya membina siswa dalam olahraga bulu tangkis dengan fokus pada peningkatan teknik, strategi, dan mental bertanding. Program latihan dirancang untuk mengembangkan atlet yang berprestasi di tingkat regional maupun nasional.",
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
      "Finalis Turnamen Antar Pelajar Se-Jawa (2023)",
    ],
  },
  band: {
    id: "band",
    title: "Band",
    description:
      "Wadah bermusik bersama untuk mengekspresikan kreativitas melalui harmonisasi alat musik modern.",
    icon: Video,
    color: "from-purple-500 to-pink-500",
    detailDescription:
      "Ekstrakurikuler Band SMKN 2 Surabaya adalah tempat bagi siswa yang memiliki passion dalam musik untuk mengekspresikan kreativitas mereka. Dengan berbagai formasi alat musik seperti gitar, bass, drum, keyboard, dan vokal, anggota band dilatih untuk tampil di berbagai acara sekolah dan eksternal.",
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
      "Album Mini 5 Lagu Original (2024)",
    ],
  },
  basket: {
    id: "basket",
    title: "Basket",
    description:
      "Olahraga basket yang melatih kerja sama tim, strategi, dan kemampuan fisik melalui permainan dinamis.",
    icon: CircuitBoard,
    color: "from-orange-500 to-red-500",
    detailDescription:
      "Ekstrakurikuler Basket SMKN 2 Surabaya membina siswa menjadi atlet basket yang tangguh dengan fokus pada teamwork, strategi permainan, dan sportivitas. Tim basket sekolah rutin bertanding di berbagai kompetisi tingkat kota hingga provinsi.",
    jadwal: "Senin, Rabu, Jumat, 15:30 - 17:30 WIB",
    lokasi: "Lapangan Basket Sekolah",
    pembina: "Pelatih Basket Berlisensi",
    kegiatanUtama: [
      "Latihan Fundamental (Dribbling, Passing, Shooting)",
      "Team Defense dan Offensive Strategies",
      "Scrimmage dan Full Game Practice",
      "Physical Conditioning dan Strength Training",
      "Video Analysis dan Scouting",
      "Friendly Match dengan Sekolah Lain",
    ],
    prestasi: [
      "Juara 2 DBL East Java Series (2024)",
      "Juara 3 Surabaya Basketball League (2024)",
      "Best Team Spirit O2SN Jatim (2023)",
      "Runner Up SMKN Cup Basketball (2023)",
    ],
  },
  dance: {
    id: "dance",
    title: "Dance (Tari)",
    description:
      "Seni tari yang mengembangkan ekspresi, kreativitas, dan kepercayaan diri melalui gerakan koreografi.",
    icon: ImageIcon,
    color: "from-pink-500 to-rose-500",
    detailDescription:
      "Ekstrakurikuler Dance SMKN 2 Surabaya merupakan wadah bagi siswa yang memiliki minat dalam seni tari untuk mengembangkan kemampuan menari, berkreasi, dan tampil percaya diri. Berbagai genre tari seperti modern dance, tradisional, dan K-Pop menjadi fokus pembelajaran.",
    jadwal: "Selasa & Kamis, 15:00 - 17:00 WIB",
    lokasi: "Aula Sekolah / Studio Dance",
    pembina: "Koreografer & Instruktur Tari",
    kegiatanUtama: [
      "Latihan Teknik Dasar Tari (Body Movement, Flexibility)",
      "Koreografi Modern Dance dan Contemporary",
      "Tari Tradisional Nusantara",
      "K-Pop Dance Cover",
      "Performa di Event Sekolah dan Eksternal",
      "Pembuatan Koreografi Original",
    ],
    prestasi: [
      "Juara 1 Dance Competition SMA/SMK Se-Jatim (2024)",
      "Best Choreography Festival Seni Pelajar (2023)",
      "Juara Favorit K-Pop Dance Cover Contest (2024)",
      "Tampil di Pembukaan Event Kota Surabaya (2023)",
    ],
  },
  futsal: {
    id: "futsal",
    title: "Futsal",
    description:
      "Olahraga futsal yang melatih kecepatan, teknik, dan koordinasi tim dalam permainan sepak bola indoor.",
    icon: Bike,
    color: "from-blue-500 to-cyan-500",
    detailDescription:
      "Ekstrakurikuler Futsal SMKN 2 Surabaya membina siswa dalam olahraga futsal dengan standar kompetitif. Program latihan mencakup peningkatan skill individu, strategi tim, dan mental bertanding untuk menghadapi turnamen tingkat kota hingga nasional.",
    jadwal: "Senin, Rabu, Jumat, 16:00 - 18:00 WIB",
    lokasi: "Lapangan Futsal Sekolah",
    pembina: "Pelatih Futsal Berlisensi AFC",
    kegiatanUtama: [
      "Latihan Teknik (Dribbling, Passing, Shooting)",
      "Tactic dan Formasi Tim (2-2, 3-1, dll)",
      "Small Sided Games dan Full Match",
      "Physical Training dan Stamina",
      "Set Piece dan Dead Ball Situations",
      "Tournament Preparation",
    ],
    prestasi: [
      "Juara 1 Futsal Competition Pelajar Se-Surabaya (2024)",
      "Juara 2 Liga Futsal O2SN Jatim (2024)",
      "Best Player Award SMKN Futsal Cup (2023)",
      "Juara 3 Turnamen Futsal Antar Pelajar Jawa (2023)",
    ],
  },
  jurnalis: {
    id: "jurnalis",
    title: "Jurnalis",
    description:
      "Kegiatan jurnalistik yang melatih kemampuan menulis, meliput berita, dan menyebarkan informasi.",
    icon: Code,
    color: "from-slate-500 to-gray-600",
    detailDescription:
      "Ekstrakurikuler Jurnalis SMKN 2 Surabaya merupakan wadah bagi siswa yang tertarik dalam dunia jurnalistik, media, dan komunikasi. Anggota dilatih dalam penulisan berita, fotografi jurnalistik, videografi, dan mengelola media sekolah baik cetak maupun digital.",
    jadwal: "Kamis, 15:00 - 17:00 WIB",
    lokasi: "Ruang Redaksi / Lab Komputer",
    pembina: "Guru Bahasa Indonesia & Jurnalis Profesional",
    kegiatanUtama: [
      "Teknik Penulisan Berita (5W+1H, Piramida Terbalik)",
      "Fotografi Jurnalistik dan Editing",
      "Videografi dan Video Editing",
      "Wawancara dan Reportase",
      "Pengelolaan Media Sosial Sekolah",
      "Pembuatan Majalah dan Buletin Sekolah",
    ],
    prestasi: [
      "Juara 1 Lomba Jurnalistik Siswa Tingkat Jatim (2024)",
      "Best Photo Journalism Competition (2023)",
      "Juara 2 Video Feature Documentary Contest (2024)",
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
    detailDescription:
      "Paskibra (Pasukan Pengibar Bendera) SMKN 2 Surabaya merupakan unit ekstrakurikuler yang membina siswa menjadi pasukan pengibar bendera yang disiplin, berani, dan penuh dedikasi. Anggota Paskibra menjadi representasi sekolah dalam upacara bendera di berbagai tingkatan.",
    jadwal: "Selasa & Kamis, 15:30 - 17:30 WIB",
    lokasi: "Lapangan Upacara",
    pembina: "Pembina Paskibra & TNI",
    kegiatanUtama: [
      "Latihan PBB (Peraturan Baris Berbaris)",
      "Formasi dan Regulasi Pengibar Bendera",
      "Physical Training dan Ketahanan Fisik",
      "Latihan Komando dan Kepemimpinan",
      "Mental Training dan Pembentukan Karakter",
      "Seleksi Paskibraka Tingkat Kota/Provinsi",
    ],
    prestasi: [
      "Paskibraka HUT RI ke-79 Tingkat Kota Surabaya (2024)",
      "Juara 1 Lomba PBB Pelajar Se-Jatim (2024)",
      "Best Discipline Award Paskibra Competition (2023)",
      "Paskibraka Terbaik Upacara HUT Jatim (2023)",
    ],
  },
  sbl: {
    id: "sbl",
    title: "SBL (Seni Bela Diri)",
    description:
      "Seni bela diri yang melatih pertahanan diri, disiplin, dan kekuatan mental serta fisik.",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    detailDescription:
      "Ekstrakurikuler Seni Bela Diri SMKN 2 Surabaya mengajarkan berbagai teknik bela diri seperti Pencak Silat, Karate, dan Taekwondo. Fokus pembelajaran mencakup teknik pertahanan diri, pembentukan karakter, disiplin, dan sportivitas.",
    jadwal: "Rabu & Jumat, 15:30 - 17:30 WIB",
    lokasi: "Aula Sekolah / Lapangan",
    pembina: "Pelatih Bela Diri Bersertifikat",
    kegiatanUtama: [
      "Teknik Dasar Bela Diri (Pukulan, Tendangan, Tangkisan)",
      "Jurus dan Koreografi Bela Diri",
      "Sparring dan Aplikasi Praktis",
      "Physical Conditioning dan Flexibility",
      "Mental Training dan Self Defense",
      "Persiapan Ujian Kenaikan Tingkat",
    ],
    prestasi: [
      "Juara 1 Pencak Silat O2SN Tingkat Kota (2024)",
      "Medali Emas Karate Popda Jatim (2024)",
      "Juara 2 Taekwondo Championship (2023)",
      "Best Fighter Award Turnamen Pelajar (2023)",
    ],
  },
  ski: {
    id: "ski",
    title: "SKI (Seni Karawitan)",
    description:
      "Seni musik tradisional Jawa yang melestarikan budaya melalui gamelan dan vokal.",
    icon: Building,
    color: "from-yellow-500 to-lime-500",
    detailDescription:
      "Ekstrakurikuler Seni Karawitan SMKN 2 Surabaya merupakan wadah pelestarian seni musik tradisional Jawa. Anggota dilatih memainkan berbagai instrumen gamelan dan vokal tradisional untuk melestarikan warisan budaya nusantara.",
    jadwal: "Rabu, 15:00 - 17:00 WIB",
    lokasi: "Pendopo / Ruang Karawitan",
    pembina: "Dalang & Seniman Karawitan",
    kegiatanUtama: [
      "Belajar Instrumen Gamelan (Saron, Kendang, Bonang, dll)",
      "Vokal Tradisional Jawa (Sindhèn)",
      "Tabuh dan Gendhing Jawa",
      "Pengenalan Wayang dan Cerita Pewayangan",
      "Performa di Acara Sekolah dan Budaya",
      "Kolaborasi dengan Seni Tari Tradisional",
    ],
    prestasi: [
      "Juara 1 Lomba Karawitan Pelajar Tingkat Jatim (2024)",
      "Best Performance Festival Budaya Nusantara (2023)",
      "Penghargaan Pelestari Budaya dari Pemkot (2024)",
      "Tampil di Acara Budaya Nasional (2023)",
    ],
  },
  skk: {
    id: "skk",
    title: "SKK (Seni Kriya Kayu)",
    description:
      "Seni kerajinan kayu yang mengasah kreativitas dalam menciptakan produk berbahan dasar kayu.",
    icon: Wrench,
    color: "from-stone-500 to-neutral-500",
    detailDescription:
      "Ekstrakurikuler Seni Kriya Kayu SMKN 2 Surabaya melatih siswa dalam seni kerajinan dan pengolahan kayu. Anggota belajar berbagai teknik pengerjaan kayu dari desain hingga finishing untuk menghasilkan produk kriya berkualitas.",
    jadwal: "Kamis, 15:00 - 17:00 WIB",
    lokasi: "Workshop Kayu / Lab Kriya",
    pembina: "Guru Kriya & Pengrajin Kayu",
    kegiatanUtama: [
      "Teknik Dasar Pengerjaan Kayu",
      "Desain dan Sketsa Produk Kriya",
      "Penggunaan Alat (Gergaji, Pahat, Router, dll)",
      "Ukir Kayu dan Relief",
      "Finishing dan Pewarnaan Kayu",
      "Produksi Produk Jadi (Hiasan, Furniture Mini)",
    ],
    prestasi: [
      "Juara 1 Lomba Kriya Kayu Pelajar Se-Jatim (2024)",
      "Best Creative Product Exhibition (2023)",
      "Karya Terpilih Pameran Nasional Kriya (2024)",
      "Produk Kriya Dipamerkan di Museum (2023)",
    ],
  },
  tari: {
    id: "tari",
    title: "Tari Tradisional",
    description:
      "Pelestarian tari tradisional Indonesia yang kaya akan nilai budaya dan filosofi nusantara.",
    icon: ImageIcon,
    color: "from-fuchsia-500 to-violet-500",
    detailDescription:
      "Ekstrakurikuler Tari Tradisional SMKN 2 Surabaya fokus pada pelestarian dan pengembangan tari-tari tradisional Indonesia khususnya Jawa Timur. Anggota dilatih menguasai berbagai tarian klasik dan kreasi baru dengan tetap mempertahankan nilai filosofis budaya.",
    jadwal: "Selasa & Jumat, 15:00 - 17:00 WIB",
    lokasi: "Pendopo / Aula Budaya",
    pembina: "Koreografer Tari Tradisional",
    kegiatanUtama: [
      "Tari Klasik Jawa (Gambyong, Srimpi, dll)",
      "Tari Kreasi Nusantara",
      "Teknik Dasar Tari Tradisional",
      "Pengenalan Busana dan Tata Rias Tari",
      "Pendalaman Filosofi dan Makna Tarian",
      "Pementasan di Acara Budaya",
    ],
    prestasi: [
      "Juara 1 Lomba Tari Tradisional Tingkat Nasional (2024)",
      "Best Costume & Performance Award (2023)",
      "Tampil di Festival Kebudayaan Jatim (2024)",
      "Penghargaan Duta Budaya Kota Surabaya (2023)",
    ],
  },
  voli: {
    id: "voli",
    title: "Voli",
    description:
      "Olahraga bola voli yang melatih koordinasi, refleks, dan kekompakan tim dalam permainan.",
    icon: Cpu,
    color: "from-teal-500 to-cyan-500",
    detailDescription:
      "Ekstrakurikuler Voli SMKN 2 Surabaya membina siswa dalam olahraga bola voli dengan standar kompetitif. Program latihan dirancang untuk meningkatkan kemampuan teknik individu dan kerja sama tim dalam menghadapi berbagai turnamen.",
    jadwal: "Selasa, Kamis, Sabtu, 15:30 - 17:30 WIB",
    lokasi: "Lapangan Voli Sekolah",
    pembina: "Pelatih Voli Berlisensi",
    kegiatanUtama: [
      "Teknik Dasar (Passing, Service, Smash, Block)",
      "Formasi dan Rotasi Tim",
      "Strategi Offensive dan Defensive",
      "Scrimmage dan Match Practice",
      "Physical Training dan Conditioning",
      "Analisis Video dan Scouting Lawan",
    ],
    prestasi: [
      "Juara 2 Voli Putra O2SN Tingkat Provinsi (2024)",
      "Juara 1 Voli Putri SMKN Cup (2024)",
      "Best Setter Award Tournament Pelajar (2023)",
      "Runner Up Liga Voli Antar Pelajar Jatim (2023)",
    ],
  },
};

export default function EskulDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const eskul = eskulData[id as keyof typeof eskulData];

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
    <div className="min-h-screen pt-24 pb-8 px-8 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/eskul"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-700 rounded-lg text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 mb-8 font-medium"
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
          <div className="flex items-start gap-6 mb-6">
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
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <IconComponent className="w-32 h-32 mx-auto mb-4 text-slate-400 dark:text-slate-600" />
                <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                  {eskul.title}
                </p>
              </div>
            </div>
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

          <div className="grid md:grid-cols-3 gap-4 mt-6">
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
              {eskul.kegiatanUtama.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {item}
                  </span>
                </li>
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
              {eskul.prestasi.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Tertarik Bergabung?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Jangan lewatkan kesempatan untuk mengembangkan bakat dan minatmu!
            Daftarkan dirimu sekarang dan jadilah bagian dari komunitas{" "}
            {eskul.title}.
          </p>
          <Link
            href="/pendaftaran"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Daftar Sekarang
            <ArrowLeft className="rotate-180" size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
