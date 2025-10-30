"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  // --- Ikon lucide-react yang kita perlukan untuk UI ---
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
import React, { useState, memo, useEffect } from "react";

// --- DATA ESKUL LENGKAP DISESUAIKAN DENGAN DAFTAR PADA GAMBAR ---
const eskulData = {
  // 1. BASKET
  basket: {
    id: "basket",
    title: "Basket",
    description:
      "Olahraga basket yang melatih kerja sama tim, strategi, dan kemampuan fisik melalui permainan dinamis.",
    emoji: "🏀",
    color: "from-orange-500 to-red-500",
    image: "/img/detaileskul/basket.webp", // Ganti dengan path gambar yang sesuai
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
  // 2. FUTSAL
  futsal: {
    id: "futsal",
    title: "Futsal",
    description:
      "Olahraga futsal yang melatih kecepatan, teknik, dan koordinasi tim dalam permainan sepak bola indoor.",
    emoji: "⚽",
    color: "from-blue-500 to-cyan-500",
    image: "/img/detaileskul/futsal.webp", // Ganti dengan path gambar yang sesuai
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
  // 3. BADMINTON
  badminton: {
    id: "badminton",
    title: "Badminton",
    description:
      "Mengasah ketangkasan, kecepatan, dan strategi permainan kompetitif.",
    emoji: "🏸",
    color: "from-yellow-500 to-orange-500",
    image: "/img/detaileskul/badminton.webp", // Ganti dengan path gambar yang sesuai
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
  // 4. PERISAI DIRI (Baru)
  "perisai-diri": {
    id: "perisai-diri",
    title: "Perisai Diri",
    description:
      "Seni bela diri Pencak Silat Perisai Diri yang melatih kecepatan, kelincahan, dan kekuatan spiritual.",
    emoji: "🥋",
    color: "from-red-700 to-orange-700",
    image: "/img/detaileskul/pencak.webp", // Ganti dengan path gambar yang sesuai
    detailDescription:
      "Perisai Diri adalah salah satu perguruan Pencak Silat terkemuka di Indonesia. Ekstrakurikuler ini fokus pada teknik bela diri praktis, olah pernapasan, dan pembentukan mental serta karakter yang sportif dan berjiwa ksatria.",
    jadwal: "Selasa & Jumat, 15:00 - 17:00 WIB",
    lokasi: "Aula Utama Sekolah",
    pembina:
      "Pelatih Bersertifikat Keluarga Silat Nasional Indonesia Perisai Diri",
    kegiatanUtama: [
      "Latihan Teknik Dasar, Kuda-kuda, dan Jurus",
      "Olah Pernapasan (Pemanfaatan Tenaga Dalam)",
      "Latihan Kecepatan dan Ketepatan Serangan",
      "Sparring dan Uji Tanding",
      "Persiapan Kejuaraan Tingkat Daerah dan Nasional",
    ],
    prestasi: [
      "Medali Emas Kejuaraan Nasional Pencak Silat Pelajar (2024)",
      "Juara Umum 3 Kejurda Perisai Diri Jawa Timur (2023)",
      "Atlet Delegasi O2SN Pencak Silat Provinsi (2024)",
    ],
  },
  // 5. VOLLEY
  volly: {
    id: "volly",
    title: "Volly",
    description:
      "Olahraga bola voli yang melatih koordinasi, refleks, dan kekompakan tim.",
    emoji: "🏐",
    color: "from-teal-500 to-cyan-500",
    image: "/img/detaileskul/voli.webp", // Ganti dengan path gambar yang sesuai
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
  // 6. DANCE
  dance: {
    id: "dance",
    title: "Dance (Modern/Koreografi)",
    description:
      "Seni tari yang mengembangkan ekspresi, kreativitas, dan kepercayaan diri melalui gerakan koreografi.",
    emoji: "💃",
    color: "from-pink-500 to-rose-500",
    image: "/img/detaileskul/dancer.webp", // Ganti dengan path gambar yang sesuai
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
  // 7. PASKIBRA
  paskibra: {
    id: "paskibra",
    title: "Paskibra",
    description:
      "Pasukan Pengibar Bendera yang melatih kedisiplinan, keberanian, dan jiwa patriotisme.",
    emoji: "🚩",
    color: "from-red-500 to-rose-600",
    image: "/img/detaileskul/paskib.webp", // Ganti dengan path gambar yang sesuai
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
  // 8. ELITE (ROBOTIK) (Baru)
  "elite-robotik": {
    id: "elite-robotik",
    title: "ELITE (Robotik)",
    description:
      "Mengembangkan keterampilan dalam pemrograman, elektronika, dan perancangan mekanik melalui robotika.",
    emoji: "🤖",
    color: "from-indigo-600 to-purple-600",
    image: "/img/detaileskul/elite.webp", // Ganti dengan path gambar yang sesuai
    detailDescription:
      "ELITE (Engineering, Logic, Innovation, Technology, and Excellence) adalah klub robotik sekolah. Siswa belajar merancang, membangun, dan memprogram robot untuk kompetisi, mengasah kemampuan logika, problem-solving, dan teknologi terapan.",
    jadwal: "Senin & Rabu, 15:30 - 18:00 WIB",
    lokasi: "Lab Robotik/Mekatronika",
    pembina: "Guru Teknik Elektronika & Praktisi Robotik",
    kegiatanUtama: [
      "Pelatihan Dasar Elektronika dan Mikrokontroler (Arduino/Raspberry)",
      "Pemrograman Robot (C++/Python)",
      "Perancangan Mekanik dan 3D Printing",
      "Proyek Robot Line Follower, Sumo, dan Lengan Robot",
      "Persiapan dan Partisipasi dalam Lomba Robotik Nasional",
    ],
    prestasi: [
      "Juara 1 Kontes Robot Line Follower Tingkat Nasional (2024)",
      "Medali Perak WorldSkills Asia Bidang Mekatronika (2023)",
      "Best Design Award Kompetisi Robotik Pelajar (2024)",
    ],
  },
  // 9. BAND
  band: {
    id: "band",
    title: "Band",
    description:
      "Wadah bermusik bersama untuk mengekspresikan kreativitas melalui harmonisasi alat musik modern.",
    emoji: "🎸",
    color: "from-purple-500 to-pink-500",
    image: "/img/detaileskul/band.webp", // Ganti dengan path gambar yang sesuai
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
  // 10. PRAMUKA (ID diganti dari 'ambalan' menjadi 'pramuka')
  pramuka: {
    id: "pramuka",
    title: "Pramuka",
    description:
      "Mengajarkan kepemimpinan, kemandirian, dan keterampilan survival di alam terbuka.",
    emoji: "⛺",
    color: "from-green-500 to-emerald-500",
    image: "/img/detaileskul/ambalan.webp", // Ganti dengan path gambar yang sesuai
    detailDescription:
      "Pramuka SMKN 2 Surabaya merupakan wadah pembinaan karakter dan kepemimpinan. Anggota dibina untuk menjadi individu yang mandiri, disiplin, dan memiliki jiwa kepemimpinan yang kuat melalui berbagai kegiatan outdoor dan indoor.",
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
  // 11. TARI (Tari Tradisional)
  tari: {
    id: "tari",
    title: "Tari (Tradisional)",
    description:
      "Pelestarian tari tradisional Indonesia yang kaya akan nilai budaya nusantara.",
    emoji: "🎭",
    color: "from-fuchsia-500 to-violet-500",
    image: "/img/detaileskul/tari.webp", // Ganti dengan path gambar yang sesuai
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
  // 12. JURNALISTIK (ID diganti dari 'jurnalis' menjadi 'jurnalistik')
  jurnalistik: {
    id: "jurnalistik",
    title: "Jurnalistik",
    description:
      "Kegiatan jurnalistik yang melatih kemampuan menulis, meliput berita, dan menyebarkan informasi.",
    emoji: "📰",
    color: "from-slate-500 to-gray-600",
    image: "/img/detaileskul/jurnalis.webp", // Ganti dengan path gambar yang sesuai
    detailDescription:
      "Ekstrakurikuler Jurnalistik adalah wadah bagi siswa yang tertarik dalam dunia jurnalistik dan media. Anggota dilatih dalam penulisan berita, fotografi, videografi, dan mengelola media sekolah.",
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
  // 13. ESPORT (Baru)
  esport: {
    id: "esport",
    title: "Esport",
    description:
      "Pembinaan atlet kompetitif dalam game strategis untuk melatih fokus, analisis taktis, dan kerja sama tim.",
    emoji: "🎮",
    color: "from-gray-700 to-red-800",
    image: "/img/detaileskul/esport.webp", // Ganti dengan path gambar yang sesuai
    detailDescription:
      "Esport (Electronic Sports) di SMKN 2 Surabaya fokus pada pembinaan atlet dalam game kompetitif seperti Mobile Legends, PUBG Mobile, atau Valorant. Anggota dilatih untuk berpikir taktis, komunikasi, dan bertanding di tingkat profesional.",
    jadwal: "Selasa & Jumat, 16:00 - 18:30 WIB",
    lokasi: "Lab Komputer / Ruang Gaming Khusus",
    pembina: "Pelatih Esport Berpengalaman",
    kegiatanUtama: [
      "Analisis Taktik dan Strategi Game",
      "Latihan Komunikasi dan Team Coordination",
      "Video Review Match dan Peningkatan Skill Individu",
      "Scrimmage dengan Tim Lain",
      "Partisipasi dalam Turnamen Esport Pelajar (IESPA, Piala Gubernur)",
    ],
    prestasi: [
      "Juara 1 Mobile Legends Pelajar Cup Kota Surabaya (2024)",
      "Juara 3 Turnamen Valorant Pelajar Se-Jatim (2023)",
      "Tim Esport Terbaik Sekolah Se-Surabaya (2024)",
    ],
  },
  // 14. SBL (SEKOLAH BERWAWASAN LINGKUNGAN) (Baru)
  sbl: {
    id: "sbl",
    title: "SBL (Sekolah Berwawasan Lingkungan)",
    description:
      "Program konservasi dan edukasi lingkungan untuk membentuk siswa yang peduli terhadap bumi.",
    emoji: "🌳",
    color: "from-lime-500 to-green-600",
    image: "/img/detaileskul/sbl.webp", // Ganti dengan path gambar yang sesuai
    detailDescription:
      "SBL (Sekolah Berwawasan Lingkungan) adalah kegiatan yang mendorong siswa untuk aktif dalam isu-isu lingkungan. Fokus utama meliputi kegiatan konservasi, daur ulang, penghijauan sekolah, dan edukasi lingkungan kepada komunitas.",
    jadwal: "Sabtu, 08:00 - 11:00 WIB",
    lokasi: "Taman Sekolah & Lab IPA",
    pembina: "Guru Biologi/Kimia & Pegiat Lingkungan",
    kegiatanUtama: [
      "Proyek Penghijauan dan Pembuatan Biopori",
      "Edukasi dan Kampanye Daur Ulang Sampah",
      "Pemanfaatan Limbah Organik (Komposting)",
      "Perawatan Taman dan Kebun Sekolah",
      "Lomba Adiwiyata dan Ekosistem Sekolah",
    ],
    prestasi: [
      "Sekolah Adiwiyata Tingkat Provinsi (2024)",
      "Penghargaan Lingkungan Hidup Terbaik dari Dinas Pendidikan (2023)",
      "Juara 1 Lomba Karya Ilmiah Remaja Bidang Lingkungan (2024)",
    ],
  },
  // Kunci Kerohanian yang tidak ada di daftar gambar, tapi dipertahankan opsional
  // Anda dapat menghapusnya jika daftar harus 100% sama dengan gambar.
  ski: {
    id: "ski",
    title: "SKI (Sie Kerohanian Islam)",
    description:
      "Wadah pendalaman agama Islam, pembentukan karakter, dan ukhuwah.",
    emoji: "🕌",
    color: "from-green-500 to-teal-500",
    image: "/img/detaileskul/ski.webp",
    detailDescription:
      "SKI adalah ekstrakurikuler yang berfokus pada pembinaan rohani dan karakter siswa Muslim. Menjadi pusat kegiatan keagamaan, kajian, dan dakwah di lingkungan sekolah untuk mempererat ukhuwah Islamiyah.",
    jadwal: "Jumat, 11:30 - 13:00 WIB (Kajian Jumat)",
    lokasi: "Masjid Sekolah / Aula Utama",
    pembina: "Guru Agama Islam & Pembina SKI",
    kegiatanUtama: [
      "Kajian Rutin Mingguan dan Diskusi Keagamaan",
      "Peringatan Hari Besar Islam (PHBI)",
      "Bimbingan Baca Tulis Al-Qur'an (BTAQ)",
      "Bakti Sosial dan Santunan Anak Yatim",
      "Pesantren Kilat (Bulan Ramadhan)",
      "Manajemen Zakat, Infaq, dan Shadaqah",
    ],
    prestasi: [
      "Juara 1 Lomba Cerdas Cermat Agama (2024)",
      "Juara 2 Lomba Nasyid Tingkat Kota (2023)",
      "Penyelenggara Tabligh Akbar Sekolah (2024)",
    ],
  },
  skk: {
    id: "skk",
    title: "SKK (Sie Kerohanian Kristen)",
    description:
      "Persekutuan doa, pendalaman Alkitab, dan pelayanan kasih bagi siswa Kristiani.",
    emoji: "✝️",
    color: "from-blue-500 to-indigo-500",
    image: "/img/detaileskul/skk.webp",
    detailDescription:
      "SKK adalah wadah persekutuan bagi siswa-siswi Kristiani untuk bertumbuh bersama dalam iman. Melalui pendalaman Alkitab dan doa, anggota didorong untuk menjadi teladan kasih di lingkungan sekolah.",
    jadwal: "Jumat, 15:00 - 16:30 WIB",
    lokasi: "Ruang Audiovisual / Ruang SKK",
    pembina: "Guru Agama Kristen & Pembina SKK",
    kegiatanUtama: [
      "Persekutuan Doa dan Ibadah Rutin",
      "Pendalaman Alkitab (Bible Study)",
      "Perayaan Natal dan Paskah Sekolah",
      "Bakti Sosial dan Kunjungan Kasih ke Panti Asuhan",
      "Latihan Paduan Suara Rohani",
      "Retret dan Pembinaan Karakter",
    ],
    prestasi: [
      "Juara 1 Lomba Paduan Suara Gerejawi (2023)",
      "Penyelenggara Acara Bakti Sosial Panti Asuhan (2024)",
      "Delegasi Retret Siswa Kristen Tingkat Regional (2023)",
    ],
  },
};

const KegiatanListItem = memo(({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
    <span className="text-slate-600 dark:text-slate-400">{text}</span>
  </li>
));
KegiatanListItem.displayName = "KegiatanListItem";

const PrestasiListItem = memo(({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <Trophy className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
    <span className="text-slate-600 dark:text-slate-400">{text}</span>
  </li>
));
PrestasiListItem.displayName = "PrestasiListItem";

export default async function EskulDetailPage({
  searchParams
}: {
  searchParams: Promise<{id: string}>
}) {
  const params = useParams();
  const id = await searchParams;
  const [ekskul, setEkskul] = useState();

  const fetchEkskul = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/extras/${id}`);
    const data = await res.json();
    setEkskul(data);
  }

  useEffect(() => {
    fetchEkskul();
  });


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
              className={`w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center bg-linear-to-br ${eskul.color} shadow-lg`}
            >
              {/* --- RENDER EMOJI --- */}
              <span className="text-5xl">{eskul.emoji}</span>
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
