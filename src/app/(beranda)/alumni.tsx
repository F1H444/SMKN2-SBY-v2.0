"use client";

import Image from "next/image";
import Link from "next/link";

// Data Alumni
const alumniData = [
  {
    id: 1,
    name: "Ahmad Zulkifli",
    year: "Lulusan 2015",
    role: "Software Engineer",
    company: "PT Teknologi Maju",
    description:
      "“Ilmu dasar pemrograman dan logika yang saya dapatkan di SMKN 2 menjadi fondasi kuat untuk berkarir di industri teknologi yang kompetitif ini.”",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Rina Amelia",
    year: "Lulusan 2018",
    role: "UI/UX Designer",
    company: "Startup Kreatif",
    description:
      "“Jurusan Multimedia membuka mata saya pada dunia desain. Kini, saya merancang pengalaman pengguna untuk aplikasi yang dipakai ribuan orang.”",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Bagus Santoso",
    year: "Lulusan 2016",
    role: "Network & Security Specialist",
    company: "Provider Internet Nasional",
    description:
      "“Dari lab TKJ, saya belajar troubleshooting yang sangat berharga. Kemampuan ini membawa saya menjadi penanggung jawab infrastruktur jaringan.”",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    year: "Lulusan 2019",
    role: "3D Animator",
    company: "Studio Animasi Internasional",
    description:
      "“Passion saya di bidang animasi benar-benar terasah di sini. Proyek-proyek sekolah menjadi portofolio pertama yang mengantar saya ke industri.”",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AlumniInspiration() {
  return (
    <>
      {/* Animasi sederhana */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          opacity: 0;
          animation-fill-mode: forwards;
          animation-name: fadeInUp;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }

        /* MODIFIKASI: Definisi CSS untuk .theme-bg telah dihapus */
      `}</style>

      {/* MODIFIKASI: Kelas 'theme-bg' dihapus dari section untuk membuatnya transparan */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-6 transition-colors duration-300">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-violet-700 dark:text-violet-400 drop-shadow-sm">
            Inspirasi Perjalanan Alumni
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Kisah nyata dari mereka yang telah meraih cita-cita. Siapa tahu,
            giliranmu selanjutnya!
          </p>
        </div>

        {/* Grid Card Alumni */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
          {alumniData.map((alumni, index) => (
            <div
              key={alumni.id}
              className="animate-fadeInUp bg-white/70 dark:bg-gray-800/60 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2 backdrop-blur-md"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gambar */}
              <div className="relative w-full h-60 overflow-hidden group">
                <Image
                  src={alumni.image}
                  alt={`Foto ${alumni.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  quality={80}
                />
              </div>

              {/* Isi Card */}
              <div className="p-6">
                <p className="text-sm text-violet-600 dark:text-violet-400 font-semibold">
                  {alumni.role}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  {alumni.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {alumni.company} • {alumni.year}
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed italic border-l-4 border-violet-200 dark:border-violet-700 pl-4">
                  {alumni.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Routing */}
        <div className="mt-16">
          <Link
            href="/alumni"
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block"
          >
            Lihat Semua Kisah Alumni
          </Link>
        </div>
      </section>
    </>
  );
}
