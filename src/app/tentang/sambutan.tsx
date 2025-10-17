"use client";
import React, { useState, useEffect } from "react";
import {
  Quote,
  Users,
  Award,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function PrincipalWelcome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const infoItems = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Jumlah Siswa",
      description: "2.000+ Siswa Aktif",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Program Keahlian",
      description: "11 Kompetensi Keahlian",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Akreditasi",
      description: "Terakreditasi A",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start lg:items-center w-full">
          {/* Left Section - Welcome Text */}
          <div
            className={`space-y-4 sm:space-y-6 transition-all duration-1000 transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-blue-500/30">
              <Quote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium">
                Sambutan Kepala Sekolah
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
              SMK Negeri 2 Surabaya
            </h1>

            <div className="space-y-3 sm:space-y-4 text-gray-700 dark:text-slate-300 leading-relaxed max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 sm:pr-4 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent">
              <p className="backdrop-blur-sm bg-blue-50/50 dark:bg-white/5 p-3 sm:p-4 rounded-lg border border-blue-100 dark:border-white/10 text-sm sm:text-base">
                <strong className="text-blue-700 dark:text-blue-300">
                  Assalamu'alaikum Wr.Wb.
                </strong>
              </p>

              <p className="backdrop-blur-sm bg-blue-50/50 dark:bg-white/5 p-3 sm:p-4 rounded-lg border border-blue-100 dark:border-white/10 text-sm sm:text-base">
                Selamat datang di halaman www.smkn2sby.sch.id, halaman ini
                disediakan sebagai sumber informasi yang dibutuhkan khususnya
                oleh warga sekolah dan juga masyarakat secara umum. Melalui
                halaman ini informasi tentang{" "}
                <strong className="text-blue-700 dark:text-blue-300">
                  SMK Negeri 2 Surabaya
                </strong>{" "}
                dapat dengan mudah diakses oleh siapapun yang memerlukannya.
              </p>

              <p className="backdrop-blur-sm bg-blue-50/50 dark:bg-white/5 p-3 sm:p-4 rounded-lg border border-blue-100 dark:border-white/10 text-sm sm:text-base">
                Sebagaimana diketahui bersama, perkembangan teknologi, khususnya
                teknologi Informasi dan Komunikasi saat ini sudah sedemikian
                pesat dan merambah ke semua sektor kehidupan tidak terkecuali di
                dalamnya adalah sektor pendidikan. Internet sebagai salah satu
                bagian dari perkembangan teknologi informasi dan komunikasi dari
                hari ke hari menunjukkan perkembangan yang sangat signifikan.
              </p>

              <p className="backdrop-blur-sm bg-blue-50/50 dark:bg-white/5 p-3 sm:p-4 rounded-lg border border-blue-100 dark:border-white/10 text-sm sm:text-base">
                Melalui internet kita dapat menjumpai aneka referensi, jurnal,
                maupun hasil penelitian dalam jumlah yang melimpah.
                Materi-materi yang disajikan di internet cenderung lebih up to
                date dibandingkan dengan yang disajikan dalam bentuk
                tertulis/buku. Sehubungan dengan hal tersebut SMK Negeri 2
                Surabaya berupaya mengoptimalkan penggunaan jaringan internet
                yang sudah ada di sekolah agar peningkatan mutu sumber daya
                manusia dan mutu pendidikan dapat segera tercapai.
              </p>

              <p className="backdrop-blur-sm bg-blue-50/50 dark:bg-white/5 p-3 sm:p-4 rounded-lg border border-blue-100 dark:border-white/10 text-sm sm:text-base">
                Kelebihan lain dari internet adalah dapat menghadirkan informasi
                yang dibutuhkan tanpa mengenal batas geografis. Para pengguna
                internet dapat tukar menukar informasi dengan berbagai pihak
                disegala penjuru dunia dalam waktu singkat dan dengan biaya yang
                relatif murah. Salah satu fasilitas yang ada di internet yang
                dapat dipakai untuk tukar-menukar dan berbagi informasi adalah
                dengan menggunakan website.
              </p>

              <p className="backdrop-blur-sm bg-blue-50/50 dark:bg-white/5 p-3 sm:p-4 rounded-lg border border-blue-100 dark:border-white/10 text-sm sm:text-base">
                Untuk itulah website ini dibuat, dengan tujuan agar pihak
                sekolah dapat menyampaikan informasi tentang dunia pendidikan
                dan sekaligus menjalin komunikasi antara pihak sekolah dengan
                guru, orang tua/wali murid, siswa, alumni, dan stakeholder.
                Mudah-mudahan dengan optimalisasi penggunaan internet dan
                website ini, peningkatan mutu pendidikan dan komunikasi global
                dapat segera terwujud.
              </p>

              <p className="backdrop-blur-sm bg-blue-50/50 dark:bg-white/5 p-3 sm:p-4 rounded-lg border border-blue-100 dark:border-white/10 text-sm sm:text-base">
                <strong className="text-blue-700 dark:text-blue-300">
                  Wassalam
                </strong>
              </p>
            </div>
          </div>

          {/* Center Section - Principal Photo */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-300 transform ${
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            } order-first lg:order-none`}
          >
            <div className="relative group">
              {/* Photo - Standing Position */}
              <div className="relative w-64 sm:w-80 h-80 sm:h-96 flex items-end justify-center">
                <Image
                  src="/img/kepala-sekolah.webp"
                  alt="Plt. Kepala Sekolah"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 rounded-lg"
                  loading="eager"
                />
              </div>

              {/* Name Badge */}
              <div className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 px-4 sm:px-8 py-3 sm:py-4 rounded-lg shadow-xl backdrop-blur-sm border border-white/20 text-center">
                <p className="text-white font-bold text-base sm:text-lg">
                  Endang Tri Bawani, M.Pd
                </p>
                <p className="text-blue-100 text-xs sm:text-sm">
                  Plt. Kepala Sekolah
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Info Lainnya */}
          <div
            className={`space-y-4 transition-all duration-1000 delay-500 transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
              Info Lainnya
            </h2>

            {infoItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="relative z-10 flex items-start space-x-3 sm:space-x-4">
                  <div
                    className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${item.color} shadow-lg transform group-hover:rotate-6 transition-transform duration-300 flex-shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400 group-hover:text-gray-800 dark:group-hover:text-slate-300 transition-colors truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Achievement Cards */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="backdrop-blur-sm bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10 p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 group hover:border-blue-300 dark:hover:border-blue-400/50 transition-all">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-gray-800 dark:text-white font-bold text-sm sm:text-base">
                      Email
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm">
                      smekda.surabaya@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 group hover:border-purple-300 dark:hover:border-purple-400/50 transition-all">
                <div className="flex flex-col items-center text-center space-y-2">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-gray-800 dark:text-white font-bold text-sm sm:text-base">
                      Alamat
                    </p>
                    <p className="text-purple-700 dark:text-purple-300 text-xs sm:text-sm">
                      Jl. Tentara Genie Pelajar No. 26
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgb(229 231 235);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgb(59 130 246);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgb(37 99 235);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgb(59 130 246);
        }
      `}</style>
    </div>
  );
}
