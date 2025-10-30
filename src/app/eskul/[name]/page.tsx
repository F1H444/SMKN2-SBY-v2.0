"use client";

// 1. Impor hook yang diperlukan oleh Client Component
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Users,
  MapPin,
  HelpCircle, // Ikon default
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react"; // Hapus 'memo' dan 'Image'

// 2. Hapus komponen 'KegiatanListItem' dan 'PrestasiListItem'
//    karena data 'kegiatanUtama' dan 'prestasi' tidak ada di API

// 3. Ubah menjadi Client Component murni
export default function EskulDetailPage() {
  const { id } = useParams(); // Hook untuk mengambil 'id' dari URL
  const [ekskul, setEkskul] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Gunakan useEffect untuk mengambil data saat 'id' berubah
  useEffect(() => {
    if (!id) return; // Jangan fetch jika id belum ada

    setIsLoading(true);
    const fetchEskul = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/extras/${id}`
        );
        if (!res.ok) {
          throw new Error("Eskul not found");
        }
        const data = await res.json();

        // Cek jika data dibungkus { data: ... }
        if (data && data.data) {
          setEkskul(data.data);
        } else {
          setEkskul(data); // Asumsi API mengembalikan objek langsung
        }
      } catch (error) {
        console.error("Failed to fetch eskul:", error);
        setEkskul(null); // Set null jika not found atau error
      } finally {
        setIsLoading(false);
      }
    };

    fetchEskul();
  }, [id]);

  // 5. Tampilkan status Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <h1 className="text-2xl font-bold dark:text-white">Loading...</h1>
      </div>
    );
  }

  // 6. Tampilkan halaman 'Not Found' jika fetch gagal
  if (!ekskul) {
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

  // 7. Render halaman dengan data dari API
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

        {/* Header Halaman */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Ganti dengan ikon default karena 'emoji' & 'color' tidak ada di API */}
            <div
              className={`w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg`}
            >
              <span className="text-5xl text-white font-bold">
                {ekskul.ExtraName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
                {ekskul.ExtraName}
              </h1>
              {/* Hapus 'eskul.description' karena tidak ada di API */}
            </div>
          </div>
        </motion.div>

        {/* Hapus Galeri Gambar karena 'eskul.image' tidak ada di API */}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Tentang Ekstrakurikuler
          </h2>

          {/* Hapus 'eskul.detailDescription', ganti dengan placeholder */}
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Informasi detail mengenai {ekskul.ExtraName} belum tersedia.
          </p>

          {/* Tampilkan data yang ADA di API */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Jadwal
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {ekskul.ExtraSchedule}
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
                {ekskul.ExtraPlace}
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
                {ekskul.ExtraLead}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hapus bagian 'Kegiatan Utama' dan 'Prestasi' 
            karena datanya tidak ada di API */}
      </div>
    </div>
  );
}
