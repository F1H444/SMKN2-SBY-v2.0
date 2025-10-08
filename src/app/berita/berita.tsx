"use client";
import { useState } from "react";
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Terbaru");

  const categories = [
    "Terbaru",
    "Trend",
    "Pengumuman",
    "Sejarah",
    "Ekstrakulikuler",
    "Jaranan",
    "Kolaborasi",
    "Competition",
  ];

  const newsItems = [
    {
      id: 1,
      slug: "juara-futsal-tingkat-provinsi-smkn-2-surabaya",
      title: "Juara Futsal Tingkat Provinsi Diraih SMKN 2 Surabaya",
      category: "Terbaru",
      date: "15 Mei 2024",
      time: "10:15 WIB",
      excerpt:
        "Tim futsal SMKN 2 Surabaya berhasil meraih juara pertama dalam kompetisi futsal antar sekolah se-Jawa Timur dengan skor akhir 5-3.",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      slug: "siswa-smkn-2-raih-medali-emas-olimpiade-matematika-nasional",
      title: "Siswa SMKN 2 Raih Medali Emas Olimpiade Matematika Nasional",
      category: "Competition",
      date: "12 Mei 2024",
      time: "14:30 WIB",
      excerpt:
        "Prestasi membanggakan diraih oleh siswa kelas XI yang berhasil menyabet medali emas dalam Olimpiade Matematika tingkat nasional.",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      slug: "festival-jaranan-smkn-2-meriahkan-hut-kota-surabaya",
      title: "Festival Jaranan SMKN 2 Meriahkan HUT Kota Surabaya",
      category: "Jaranan",
      date: "10 Mei 2024",
      time: "16:45 WIB",
      excerpt:
        "Ekstrakurikuler jaranan SMKN 2 Surabaya tampil memukau dalam perayaan HUT Kota Surabaya ke-731 di Taman Bungkul.",
      image:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop",
    },
    {
      id: 4,
      slug: "kolaborasi-dengan-universitas-airlangga-untuk-program-riset",
      title: "Kolaborasi dengan Universitas Airlangga untuk Program Riset",
      category: "Kolaborasi",
      date: "8 Mei 2024",
      time: "09:00 WIB",
      excerpt:
        "SMKN 2 Surabaya menjalin kerjasama dengan UNAIR untuk program riset sains bagi siswa unggulan di bidang bioteknologi.",
      image:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=400&fit=crop",
    },
    {
      id: 5,
      slug: "pengumuman-pendaftaran-ekstrakulikuler-semester-genap",
      title: "Pengumuman Pendaftaran Ekstrakulikuler Semester Genap",
      category: "Pengumuman",
      date: "5 Mei 2024",
      time: "11:20 WIB",
      excerpt:
        "Dibuka pendaftaran ekstrakulikuler untuk semester genap 2024. Tersedia 25 pilihan ekskul menarik untuk siswa.",
      image:
        "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=600&h=400&fit=crop",
    },
    {
      id: 6,
      slug: "sejarah-berdirinya-smkn-2-50-tahun-mengukir-prestasi",
      title: "Sejarah Berdirinya SMKN 2: 50 Tahun Mengukir Prestasi",
      category: "Sejarah",
      date: "3 Mei 2024",
      time: "13:15 WIB",
      excerpt:
        "Menapaki usia setengah abad, SMKN 2 Surabaya telah melahirkan ribuan alumni berprestasi di berbagai bidang profesi.",
      image:
        "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=400&fit=crop",
    },
    {
      id: 7,
      slug: "tim-basket-smkn-2-lolos-ke-final-regional-jawa-timur",
      title: "Tim Basket SMKN 2 Lolos ke Final Regional Jawa Timur",
      category: "Competition",
      date: "1 Mei 2024",
      time: "15:40 WIB",
      excerpt:
        "Setelah melewati pertandingan sengit, tim basket putra SMKN 2 Surabaya berhasil lolos ke babak final regional.",
      image:
        "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=600&h=400&fit=crop",
    },
    {
      id: 8,
      slug: "workshop-coding-gratis-untuk-siswa-smkn-2-surabaya",
      title: "Workshop Coding Gratis untuk Siswa SMKN 2 Surabaya",
      category: "Ekstrakulikuler",
      date: "28 Apr 2024",
      time: "10:00 WIB",
      excerpt:
        "Ekstrakurikuler Programming Club mengadakan workshop coding gratis dengan mentor dari industri teknologi.",
      image:
        "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&h=400&fit=crop",
    },
    {
      id: 9,
      slug: "viral-penampilan-tari-kreasi-smkn-2-di-media-sosial",
      title: "Viral! Penampilan Tari Kreasi SMKN 2 di Media Sosial",
      category: "Trend",
      date: "26 Apr 2024",
      time: "19:30 WIB",
      excerpt:
        "Video penampilan tari kreasi siswa SMKN 2 viral di TikTok dengan 2 juta views dalam 3 hari.",
      image:
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop",
    },
    {
      id: 10,
      slug: "smkn-2-surabaya-juara-umum-lks-tingkat-kota",
      title: "SMKN 2 Surabaya Juara Umum LKS Tingkat Kota",
      category: "Competition",
      date: "24 Apr 2024",
      time: "14:00 WIB",
      excerpt:
        "Prestasi gemilang diraih dengan menjadi juara umum Lomba Kompetensi Siswa tingkat Kota Surabaya 2024.",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    },
    {
      id: 11,
      slug: "program-magang-industri-untuk-siswa-kelas-xii",
      title: "Program Magang Industri untuk Siswa Kelas XII",
      category: "Pengumuman",
      date: "22 Apr 2024",
      time: "08:45 WIB",
      excerpt:
        "Dibuka program magang di 15 perusahaan partner untuk siswa kelas XII sebagai persiapan memasuki dunia kerja.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    },
    {
      id: 12,
      slug: "pameran-karya-seni-rupa-siswa-smkn-2-surabaya",
      title: "Pameran Karya Seni Rupa Siswa SMKN 2 Surabaya",
      category: "Ekstrakulikuler",
      date: "20 Apr 2024",
      time: "15:20 WIB",
      excerpt:
        "Ekstrakurikuler seni rupa menggelar pameran dengan tema 'Surabaya dalam Goresan' di aula sekolah.",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop",
    },
    {
      id: 13,
      slug: "kerjasama-dengan-perusahaan-jepang-untuk-program-internship",
      title: "Kerjasama dengan Perusahaan Jepang untuk Program Internship",
      category: "Kolaborasi",
      date: "18 Apr 2024",
      time: "11:00 WIB",
      excerpt:
        "SMKN 2 Surabaya menandatangani MoU dengan perusahaan teknologi Jepang untuk program magang internasional.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
    },
    {
      id: 14,
      slug: "kisah-sukses-alumni-smkn-2-menjadi-entrepreneur-muda",
      title: "Kisah Sukses Alumni SMKN 2 Menjadi Entrepreneur Muda",
      category: "Trend",
      date: "16 Apr 2024",
      time: "13:30 WIB",
      excerpt:
        "Alumni angkatan 2020 sukses membangun startup di bidang edtech dengan valuasi miliaran rupiah.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    },
    {
      id: 15,
      slug: "peringatan-hari-kartini-dengan-pawai-kebaya-tradisional",
      title: "Peringatan Hari Kartini dengan Pawai Kebaya Tradisional",
      category: "Sejarah",
      date: "21 Apr 2024",
      time: "09:15 WIB",
      excerpt:
        "Seluruh siswa SMKN 2 memperingati Hari Kartini dengan mengenakan kebaya dan busana tradisional dari berbagai daerah.",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    },
    {
      id: 16,
      slug: "tim-robotika-smkn-2-wakili-indonesia-di-kompetisi-internasional",
      title: "Tim Robotika SMKN 2 Wakili Indonesia di Kompetisi Internasional",
      category: "Competition",
      date: "14 Apr 2024",
      time: "16:50 WIB",
      excerpt:
        "Tim robotika berhasil lolos seleksi nasional dan akan bertanding di World Robot Olympiad di Singapura.",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    },
  ];

  const filteredNews =
    activeCategory === "Terbaru"
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  const handleNewsClick = (slug: string) => {
    // Navigasi menggunakan window.location untuk kompatibilitas
    window.location.href = `/berita/${slug}`;
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
              Berita SMKN 2 Surabaya
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="backdrop-blur-lg rounded-2xl shadow-lg p-4 sm:p-6 sticky top-24 border bg-white/80 border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Kategori
              </h2>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="font-medium">{category}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        activeCategory === category
                          ? "translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* News Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {filteredNews.map((news) => (
                <article
                  key={news.id}
                  onClick={() => handleNewsClick(news.slug)}
                  className="group backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border bg-white/80 border-gray-200/50 hover:border-blue-500/50 dark:bg-gray-900/80 dark:border-gray-700/50 dark:hover:border-purple-500/50"
                >
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 backdrop-blur-sm rounded-full text-xs font-semibold shadow-lg bg-white/95 text-blue-600 dark:bg-gray-800/95 dark:text-blue-400">
                        <Tag className="w-3 h-3" />
                        {news.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 line-clamp-2 transition-colors duration-200 text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                      {news.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{news.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>{news.time}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="inline-flex items-center text-sm font-semibold transition-colors text-blue-600 group-hover:text-purple-600 dark:text-blue-400 dark:group-hover:text-purple-400">
                        Baca Selengkapnya
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 hover:from-blue-700 hover:to-purple-700">
                Muat Lebih Banyak
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
