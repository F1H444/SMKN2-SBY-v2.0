"use client"; // Diperlukan agar `ssr: false` berfungsi

import dynamic from "next/dynamic";
import React from "react";

// Buat Skeleton/Loading component sederhana
const PanoramaLoadingSkeleton = () => (
  <div className="w-full h-[60vh] md:h-[70vh] rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
    <p className="text-gray-500">Memuat 360° Viewer...</p>
  </div>
);

// Impor PanoramaViewer secara dinamis
const PanoramaViewer = dynamic(
  () => import("../(360)/PanoramaViewer"), // Sesuaikan path jika perlu
  {
    // Tampilkan skeleton saat komponen viewer sedang di-load
    loading: () => <PanoramaLoadingSkeleton />,

    // Pastikan ini hanya dimuat di client (PENTING untuk library 360)
    ssr: false,
  }
);

// Data gambar
const images = [
  { url: "/img/360/kelas.webp", title: "Ruang Kelas" },
  { url: "/img/360/lab.webp", title: "Ruang Lab" },
  { url: "/img/360/listrik.webp", title: "Ruang Praktek (TITL)" },
  { url: "/img/360/taman.webp", title: "Taman" },
  { url: "/img/360/bengkel.webp", title: "Bengkel" },
  { url: "/img/360/tpm.webp", title: "Ruang Praktek (TPM)" },
];

/**
 * == PERBAIKAN ==
 * Nama fungsi diubah dari '360DerajatPage' menjadi 'Derajat360Page'
 * karena nama fungsi/variabel tidak boleh diawali dengan angka.
 */
export default function Derajat360Page() {
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

        {/* Komponen PanoramaViewer yang sudah di-load secara dinamis */}
        <PanoramaViewer images={images} />
      </div>
    </div>
  );
};