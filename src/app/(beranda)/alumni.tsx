// app/(home)/alumni.tsx (Full Code - Optimized)

"use client";

import Link from "next/link";
import { memo } from "react";

// OPTIMASI: Data statis didefinisikan di luar komponen untuk efisiensi.
const alumniData = [
  {
    id: 1,
    name: "Dimas Prasetyo",
    year: "Lulusan 2017 - RPL",
    role: "Senior Backend Engineer",
    company: "eCommerce Terkemuka",
    description:
      "Logika algoritma dan fondasi database yang saya pelajari di RPL adalah bekal utama. Kini saya mengelola sistem yang melayani jutaan transaksi setiap hari.",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    year: "Lulusan 2019 - DKV",
    role: "Lead Product Designer",
    company: "Fintech Startup",
    description:
      "Dari DKV, saya belajar bahwa desain bukan hanya soal estetika, tapi juga solusi. Kemampuan itu membawa saya memimpin tim desain produk keuangan.",
  },
  {
    id: 3,
    name: "I Gede Santika",
    year: "Lulusan 2016 - TKJ",
    role: "Cloud & Network Specialist",
    company: "Provider Data Center",
    description:
      "Praktik di lab TKJ sangat berharga. Saya terbiasa menangani masalah jaringan kompleks, skill yang sangat dibutuhkan di era komputasi awan saat ini.",
  },
  {
    id: 4,
    name: "Anisa Fitriani",
    year: "Lulusan 2018 - TEI",
    role: "Automation & Robotics Engineer",
    company: "Manufaktur Otomotif",
    description:
      "Dasar-dasar elektronika industri dan mikrokontroler membuka jalan saya ke dunia otomasi. Saya bangga bisa merancang sistem robotik untuk pabrik.",
  },
];

const AlumniCard = memo(
  ({ alumni, index }: { alumni: (typeof alumniData)[0]; index: number }) => (
    // OPTIMASI: Animasi CSS ringan dengan delay untuk efek staggered yang menarik.
    <div
      className="flex flex-col bg-white/70 dark:bg-gray-800/60 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2 backdrop-blur-md p-6 animate-fadeInUp"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <p className="text-sm text-violet-600 dark:text-violet-400 font-semibold">
        {alumni.role}
      </p>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
        {alumni.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {alumni.company} • {alumni.year}
      </p>
      <p className="mt-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed italic border-l-4 border-violet-200 dark:border-violet-700 pl-4 flex-grow">
        “{alumni.description}”
      </p>
    </div>
  )
);
AlumniCard.displayName = "AlumniCard";

export default function AlumniInspirationTextOnly() {
  return (
    <>
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
          animation-name: fadeInUp;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>
      <section className="w-full flex flex-col items-center justify-center py-20 px-6 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-sky-400 drop-shadow-sm">
            Inspirasi Perjalanan Alumni
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Kisah nyata dari mereka yang telah meraih cita-cita. Siapa tahu,
            giliranmu selanjutnya!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
          {alumniData.map((alumni, index) => (
            <AlumniCard key={alumni.id} alumni={alumni} index={index} />
          ))}
        </div>
        <div
          className="mt-16 animate-fadeInUp"
          style={{ animationDelay: "600ms" }}
        >
          <Link
            href="/alumni
            "
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            Lihat Semua Kisah Alumni
          </Link>
        </div>
      </section>
    </>
  );
}
