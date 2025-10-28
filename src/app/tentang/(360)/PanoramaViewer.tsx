"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface PanoramaImage {
  url: string;
  title: string;
}

interface PanoramaViewerProps {
  images: PanoramaImage[];
}

function PanoramaViewer({ images }: PanoramaViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const startXRef = useRef(0);
  const imageWidthRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // ADDED: Max velocity limit untuk mencegah putaran terlalu cepat
  const MAX_VELOCITY = 30;
  const FRICTION = 0.92; // Lebih tinggi = lebih cepat berhenti

  const currentImage = images[currentImageIndex];

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentImageIndex]);

  useEffect(() => {
    let isMounted = true;

    const updateImageDimensions = (
      naturalWidth: number,
      naturalHeight: number
    ) => {
      if (!isMounted || !containerRef.current) return;

      const containerHeight = containerRef.current.offsetHeight;
      const aspectRatio = naturalWidth / naturalHeight;
      const calculatedWidth = containerHeight * aspectRatio;

      imageWidthRef.current = calculatedWidth;

      if (imageContainerRef.current) {
        const children = imageContainerRef.current.children;
        for (let i = 0; i < children.length; i++) {
          (children[i] as HTMLElement).style.width = `${calculatedWidth}px`;
        }
      }
    };

    const img = new window.Image();
    img.src = currentImage.url;
    img.onload = () => {
      updateImageDimensions(img.naturalWidth, img.naturalHeight);
      setImageLoaded(true);
    };

    const handleResize = () => {
      if (img.complete) {
        updateImageDimensions(img.naturalWidth, img.naturalHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [currentImage.url]);

  const animationLoop = useCallback(() => {
    if (imageWidthRef.current <= 0) {
      animationFrameRef.current = requestAnimationFrame(animationLoop);
      return;
    }

    if (isAutoRotate && !isDragging) {
      positionRef.current -= 0.5;
    } else if (!isDragging && Math.abs(velocityRef.current) > 0.1) {
      // UPDATED: Friction lebih kuat dan velocity limit
      velocityRef.current *= FRICTION;

      // Clamp velocity agar tidak terlalu cepat
      if (Math.abs(velocityRef.current) > MAX_VELOCITY) {
        velocityRef.current = Math.sign(velocityRef.current) * MAX_VELOCITY;
      }

      positionRef.current += velocityRef.current;
    }

    if (positionRef.current < -imageWidthRef.current) {
      positionRef.current += imageWidthRef.current;
    } else if (positionRef.current > 0) {
      positionRef.current -= imageWidthRef.current;
    }

    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }

    animationFrameRef.current = requestAnimationFrame(animationLoop);
  }, [isAutoRotate, isDragging]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animationLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationLoop]);

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setIsAutoRotate(false);
    setShowHint(false);
    startXRef.current = clientX - positionRef.current;
    velocityRef.current = 0;
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const newPosition = clientX - startXRef.current;

      // UPDATED: Limit velocity calculation
      let calculatedVelocity = newPosition - positionRef.current;

      // Clamp velocity saat drag
      if (Math.abs(calculatedVelocity) > MAX_VELOCITY) {
        calculatedVelocity = Math.sign(calculatedVelocity) * MAX_VELOCITY;
      }

      velocityRef.current = calculatedVelocity;
      positionRef.current = newPosition;
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);

    // ADDED: Reduce velocity saat release untuk efek lebih smooth
    velocityRef.current *= 0.7;

    if (containerRef.current) containerRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) =>
      handleDragMove(e.touches[0].clientX);

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setIsAutoRotate(false);
      const speed = 25;
      if (e.key === "ArrowLeft") positionRef.current += speed;
      else if (e.key === "ArrowRight") positionRef.current -= speed;
      else if (e.key === " ") {
        e.preventDefault();
        setIsAutoRotate((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleAutoRotate = () => setIsAutoRotate(!isAutoRotate);

  const resetView = () => {
    positionRef.current = 0;
    velocityRef.current = 0;
    setIsAutoRotate(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    resetView();
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    resetView();
  };

  return (
    <>
      <div className="relative overflow-hidden shadow-2xl transition-all duration-300 w-full h-[70vh] md:h-[75vh] rounded-2xl">
        <div
          ref={containerRef}
          className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden select-none cursor-grab"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        >
          {/* Loading Indicator */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-gray-900">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-white text-lg">Memuat gambar HD...</p>
              </div>
            </div>
          )}

          {/* Image container for seamless loop */}
          <div
            ref={imageContainerRef}
            className="absolute top-0 left-0 h-full flex"
            style={{ willChange: "transform" }}
          >
            {[0, 1].map((i) => (
              <div key={i} className="relative h-full flex-shrink-0">
                <Image
                  src={currentImage.url}
                  alt={`${currentImage.title} - Panorama 360°`}
                  fill
                  priority={i === 0}
                  quality={100}
                  draggable={false}
                  unoptimized={false}
                  sizes="(max-width: 768px) 200vw, 300vw"
                  className="pointer-events-none"
                  style={{
                    objectFit: "cover",
                    // UPDATED: Menggunakan nilai standar "auto"
                    imageRendering: "auto",
                  }}
                  onLoadingComplete={() => {
                    if (i === 0) setImageLoaded(true);
                  }}
                />
              </div>
            ))}
          </div>

          {/* UPDATED: Hint dengan instruksi lebih jelas */}

          {/* UPDATED: Tombol L/R dengan label yang lebih jelas - UNTUK ROTASI */}
          <button
            onClick={() => {
              setIsAutoRotate(false);
              positionRef.current += 100;
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 backdrop-blur-md rounded-full shadow-xl hover:scale-110 transition-all duration-200 z-20 border-2 border-blue-400/30"
            aria-label="Putar kiri"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              setIsAutoRotate(false);
              positionRef.current -= 100;
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-blue-600/20 to-blue-500/20 hover:from-blue-600/30 hover:to-blue-500/30 backdrop-blur-md rounded-full shadow-xl hover:scale-110 transition-all duration-200 z-20 border-2 border-blue-400/30"
            aria-label="Putar kanan"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"></div>
          </button>

          {/* Top-Right Controls */}
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <button
              onClick={toggleAutoRotate}
              className={`p-3 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all ${
                isAutoRotate
                  ? "bg-blue-500/90 text-white"
                  : "bg-white/90 text-gray-900"
              }`}
              aria-label={isAutoRotate ? "Pause rotation" : "Start rotation"}
            >
              {isAutoRotate ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={resetView}
              className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all"
              aria-label="Reset view"
            >
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>

          {/* Top-Left Info */}
          <div className="absolute top-4 left-4 flex items-center gap-3 z-20">
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
              <span className="text-white font-semibold text-sm">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* UPDATED: Bottom Controls dengan style berbeda & label jelas - UNTUK GANTI RUANGAN */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border-2 border-white/20">
              <button
                onClick={prevImage}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={images.length <= 1}
                aria-label="Ruangan sebelumnya"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2 px-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <span className="text-white font-bold text-sm whitespace-nowrap">
                  GANTI RUANGAN
                </span>
              </div>

              <button
                onClick={nextImage}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={images.length <= 1}
                aria-label="Ruangan selanjutnya"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Title Display */}
          <div className="absolute bottom-6 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-20">
            <span className="text-white font-medium text-sm">
              {currentImage.title}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PanoramaViewer;