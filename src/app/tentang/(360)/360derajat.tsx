import React from "react";
import PanoramaViewer from "../(360)/PanoramaViewer"; // Adjust path as needed

// Data is now defined in the parent page component
const images = [
  {
    url: "/img/360/kelas.webp",
    title: "Ruang Kelas",
  },
  {
    url: "/img/360/lab.webp",
    title: "Ruang Lab",
  },
  {
    url: "/img/360/listrik.webp",
    title: "Ruang Praktek (TITL)",
  },
  {
    url: "/img/360/taman.webp",
    title: "Taman",
  },
  {
    url: "/img/360/bengkel.webp",
    title: "Bengkel",
  },
  {
    url: "/img/360/tpm.webp",
    title: "Ruang Praktek (TPM)",
  },
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white text-gray-900">
            Jelajahi Fasilitas Kami
          </h1>
          <p className="text-lg md:text-xl dark:text-gray-300 text-gray-600 mb-4">
            Geser untuk melihat Fasilitas 360°.
          </p>
        </header>

        {/* PanoramaViewer is now a client component passed data via props */}
        <PanoramaViewer images={images} />
        {/* === INFO SECTION HAS BEEN REMOVED AS REQUESTED === */}
      </div>
    </div>
  );
}
