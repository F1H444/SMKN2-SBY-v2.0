"use client";

import React, { useState, useCallback, useRef, memo } from "react";
import { ZoomIn, ZoomOut, Plus, X, Sparkles, Star, Move } from "lucide-react";
import { useRouter } from "next/navigation";

// =================================================================================
// TIPE DATA & KONSTANTA
// =================================================================================
interface Dream {
  id: number;
  text: string;
  author: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
}

// Data awal tidak berubah
const INITIAL_DREAMS: Dream[] = [
  {
    id: 1,
    text: "Menjadi Software Engineer di perusahaan teknologi besar",
    author: "Ahmad Rifai",
    color: "indigo",
    x: 50,
    y: 100,
    rotation: -2,
  },
  {
    id: 2,
    text: "Membuka usaha kuliner dan memberdayakan UMKM",
    author: "Siti Nurhaliza",
    color: "purple",
    x: 300,
    y: 50,
    rotation: 1.5,
  },
  {
    id: 3,
    text: "Menjadi desainer grafis profesional",
    author: "Budi Santoso",
    color: "emerald",
    x: 150,
    y: 280,
    rotation: 3,
  },
  {
    id: 4,
    text: "Kuliah di luar negeri dan menjadi peneliti",
    author: "Dewi Lestari",
    color: "amber",
    x: 400,
    y: 200,
    rotation: -1,
  },
  {
    id: 5,
    text: "Menjadi content creator yang menginspirasi",
    author: "Andi Wijaya",
    color: "rose",
    x: 550,
    y: 150,
    rotation: 2.5,
  },
  {
    id: 6,
    text: "Bekerja di industri otomotif sebagai mekanik ahli",
    author: "Riko Pratama",
    color: "peach",
    x: 250,
    y: 400,
    rotation: -3,
  },
  {
    id: 7,
    text: "Menjadi guru SMK dan berbagi ilmu",
    author: "Maya Putri",
    color: "sky",
    x: 450,
    y: 350,
    rotation: 0.5,
  },
  {
    id: 8,
    text: "Mengembangkan startup teknologi pendidikan",
    author: "Fajar Ramadhan",
    color: "mint",
    x: 100,
    y: 500,
    rotation: -2.5,
  },
];

// REFAKTOR: Menggunakan kelas Tailwind untuk adaptasi tema otomatis
const DREAM_THEMES = {
  amber: {
    container: "bg-amber-50 dark:bg-amber-900/50 border-amber-500",
    text: "text-amber-800 dark:text-amber-200",
    iconContainer: "bg-amber-500/10",
    icon: "text-amber-600 dark:text-amber-400 fill-amber-500",
    avatar: "bg-amber-500",
    divider: "border-amber-500/20",
  },
  indigo: {
    container: "bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500",
    text: "text-indigo-800 dark:text-indigo-200",
    iconContainer: "bg-indigo-500/10",
    icon: "text-indigo-600 dark:text-indigo-400 fill-indigo-500",
    avatar: "bg-indigo-500",
    divider: "border-indigo-500/20",
  },
  purple: {
    container: "bg-purple-50 dark:bg-purple-900/50 border-purple-500",
    text: "text-purple-800 dark:text-purple-200",
    iconContainer: "bg-purple-500/10",
    icon: "text-purple-600 dark:text-purple-400 fill-purple-500",
    avatar: "bg-purple-500",
    divider: "border-purple-500/20",
  },
  emerald: {
    container: "bg-emerald-50 dark:bg-emerald-900/50 border-emerald-500",
    text: "text-emerald-800 dark:text-emerald-200",
    iconContainer: "bg-emerald-500/10",
    icon: "text-emerald-600 dark:text-emerald-400 fill-emerald-500",
    avatar: "bg-emerald-500",
    divider: "border-emerald-500/20",
  },
  rose: {
    container: "bg-rose-50 dark:bg-rose-900/50 border-rose-500",
    text: "text-rose-800 dark:text-rose-200",
    iconContainer: "bg-rose-500/10",
    icon: "text-rose-600 dark:text-rose-400 fill-rose-500",
    avatar: "bg-rose-500",
    divider: "border-rose-500/20",
  },
  peach: {
    container: "bg-orange-50 dark:bg-orange-900/50 border-orange-500",
    text: "text-orange-800 dark:text-orange-200",
    iconContainer: "bg-orange-500/10",
    icon: "text-orange-600 dark:text-orange-400 fill-orange-500",
    avatar: "bg-orange-500",
    divider: "border-orange-500/20",
  },
  sky: {
    container: "bg-sky-50 dark:bg-sky-900/50 border-sky-500",
    text: "text-sky-800 dark:text-sky-200",
    iconContainer: "bg-sky-500/10",
    icon: "text-sky-600 dark:text-sky-400 fill-sky-500",
    avatar: "bg-sky-500",
    divider: "border-sky-500/20",
  },
  mint: {
    container: "bg-teal-50 dark:bg-teal-900/50 border-teal-500",
    text: "text-teal-800 dark:text-teal-200",
    iconContainer: "bg-teal-500/10",
    icon: "text-teal-600 dark:text-teal-400 fill-teal-500",
    avatar: "bg-teal-500",
    divider: "border-teal-500/20",
  },
};

// =================================================================================
// KOMPONEN ANAK
// =================================================================================

const DreamNote = memo(
  ({
    dream,
    onDragStart,
  }: {
    dream: Dream;
    onDragStart: (e: React.DragEvent, dream: Dream) => void;
  }) => {
    const theme = DREAM_THEMES[dream.color as keyof typeof DREAM_THEMES];

    return (
      <div
        key={dream.id}
        draggable
        onDragStart={(e) => onDragStart(e, dream)}
        className="absolute cursor-grab active:cursor-grabbing hover:z-10 group"
        style={{
          left: `${dream.x}px`,
          top: `${dream.y}px`,
          width: "220px",
          height: "220px",
        }}
      >
        <div
          className={`w-full h-full p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 relative backdrop-blur-sm ${theme.container}`}
          style={{ transform: `rotate(${dream.rotation}deg)` }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-2 mb-3">
              <div
                className={`mt-1 flex-shrink-0 p-1.5 rounded-lg shadow-sm ${theme.iconContainer}`}
              >
                <Star size={14} className={theme.icon} />
              </div>
              <p
                className={`text-sm font-semibold leading-snug flex-1 line-clamp-5 ${theme.text}`}
              >
                {dream.text}
              </p>
            </div>

            <div className={`mt-auto pt-3 border-t-2 ${theme.divider}`}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md ${theme.avatar}`}
                >
                  {dream.author[0]}
                </div>
                <p className={`text-xs font-semibold truncate ${theme.text}`}>
                  {dream.author}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Move size={14} className="text-gray-400 dark:text-slate-500" />
          </div>
        </div>
      </div>
    );
  }
);
DreamNote.displayName = "DreamNote";

const LoginPromptModal = memo(
  ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const router = useRouter();
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700 rounded-full transition-all"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Sparkles size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
              Masuk untuk Berbagi
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
              Bergabunglah dengan ribuan siswa lainnya yang telah berbagi
              cita-cita mereka di Wall of Dreams
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full py-4 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Masuk Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }
);
LoginPromptModal.displayName = "LoginPromptModal";

// =================================================================================
// KOMPONEN UTAMA
// =================================================================================

const WallOfDreams = () => {
  const [dreams, setDreams] = useState<Dream[]>(INITIAL_DREAMS);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [draggedDream, setDraggedDream] = useState<Dream | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleAddDreamClick = useCallback(() => setShowLoginModal(true), []);
  const handleDragStart = useCallback((e: React.DragEvent, dream: Dream) => {
    setDraggedDream(dream);
    if (e.dataTransfer) {
      const img = new Image();
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      e.dataTransfer.setDragImage(img, 0, 0);
    }
  }, []);
  const handleDragOver = useCallback(
    (e: React.DragEvent) => e.preventDefault(),
    []
  );
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (draggedDream && canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;
        setDreams((prev) =>
          prev.map((d) =>
            d.id === draggedDream.id
              ? { ...d, x: Math.max(0, x - 110), y: Math.max(0, y - 110) }
              : d
          )
        );
        setDraggedDream(null);
      }
    },
    [draggedDream, zoom]
  );

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800/50 dark:border-slate-700 rounded-full mb-5 shadow-lg border-2 border-indigo-100 backdrop-blur-sm">
            <Star size={18} className="text-amber-500" fill="currentColor" />
            <span className="text-sm font-bold text-gray-700 dark:text-slate-200">
              Apa Mimpimu Setelah Lulus?
            </span>
            <Star size={18} className="text-amber-500" fill="currentColor" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Wall of Dreams
          </h1>
          <p className="text-xl text-gray-700 dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Setiap mimpi dimulai dengan keberanian untuk bermimpi. Bagikan
            inspirasimu dan raih masa depan yang cerah bersama ribuan siswa
            lainnya.
          </p>
        </div>

        {/* Main Canvas */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-black/50 overflow-hidden border-2 border-gray-200 dark:border-slate-700">
          {/* Toolbar */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800/50 dark:via-slate-900/50 dark:to-slate-800/50 p-5 border-b-2 border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                  className="p-3 bg-white dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl hover:bg-gray-50 active:scale-95 transition-all shadow-md border border-gray-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500"
                  title="Zoom Out"
                >
                  <ZoomOut
                    size={20}
                    className="text-gray-700 dark:text-slate-300"
                  />
                </button>
                <div className="px-5 py-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-200 dark:border-slate-600">
                  <span className="text-sm font-bold text-gray-700 dark:text-slate-300">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
                <button
                  onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
                  className="p-3 bg-white dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl hover:bg-gray-50 active:scale-95 transition-all shadow-md border border-gray-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500"
                  title="Zoom In"
                >
                  <ZoomIn
                    size={20}
                    className="text-gray-700 dark:text-slate-300"
                  />
                </button>
              </div>
              <button
                onClick={handleAddDreamClick}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                <span className="font-bold">Tambah Mimpi</span>
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={canvasContainerRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative h-[700px] overflow-auto bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-800/10 dark:via-transparent dark:to-slate-800/10"
          >
            <div
              className="absolute inset-0 transition-transform duration-200"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
            >
              <div className="relative w-[5000px] h-[5000px]">
                {/* Grid Pattern with CSS Variable for theme switching */}
                <div
                  className="absolute inset-0 opacity-10 dark:opacity-20"
                  style={{
                    "--grid-color-light": "#e5e7eb", // gray-200
                    "--grid-color-dark": "#475569", // slate-600
                    backgroundImage: `
                      linear-gradient(to right, var(--grid-color-light, #e5e7eb) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--grid-color-light, #e5e7eb) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                  } as React.CSSProperties}
                />
                <div
                  className="absolute inset-0 opacity-0 dark:opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, var(--grid-color-dark, #475569) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--grid-color-dark, #475569) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                  }}
                />

                {dreams.map((dream) => (
                  <DreamNote
                    key={dream.id}
                    dream={dream}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default WallOfDreams;
