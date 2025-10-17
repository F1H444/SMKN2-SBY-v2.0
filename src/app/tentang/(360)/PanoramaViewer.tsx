"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image"; // FIX: Import next/image

// Define the shape of an image object for type safety
interface PanoramaImage {
  url: string;
  title: string;
}

// Define the props for the component
interface PanoramaViewerProps {
  images: PanoramaImage[];
}

function PanoramaViewer({ images }: PanoramaViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Use refs for values that change frequently to avoid re-renders
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const startXRef = useRef(0);
  const imageWidthRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const currentImage = images[currentImageIndex];

  // Effect to hide the initial hint
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // FIX: Logic adjusted to calculate image width based on container height and aspect ratio
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

      // Apply width to wrapper divs
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

  // Main animation loop using requestAnimationFrame
  const animationLoop = useCallback(() => {
    if (imageWidthRef.current <= 0) {
      animationFrameRef.current = requestAnimationFrame(animationLoop);
      return;
    }

    // Apply movement
    if (isAutoRotate && !isDragging) {
      positionRef.current -= 0.5; // Auto-rotate speed
    } else if (!isDragging && Math.abs(velocityRef.current) > 0.1) {
      velocityRef.current *= 0.95; // Friction for momentum
      positionRef.current += velocityRef.current;
    }

    // *** FIX: Ensure seamless wrapping in both directions ***
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

  // Handlers for starting, moving, and ending a drag
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
      velocityRef.current = newPosition - positionRef.current;
      positionRef.current = newPosition;
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  }, []);

  // Add and remove global event listeners for smooth dragging
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

  // Keyboard controls
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

  // UI action handlers
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
          {/* Image container for seamless loop */}
          <div
            ref={imageContainerRef}
            className="absolute top-0 left-0 h-full flex"
            style={{ willChange: "transform" }}
          >
            {/* FIX: Replaced <img> with next/Image inside a sized container */}
            {[0, 1].map((i) => (
              <div key={i} className="relative h-full flex-shrink-0">
                <Image
                  src={currentImage.url}
                  alt="Panorama 360"
                  fill
                  priority={i === 0}
                  draggable={false}
                  className="pointer-events-none"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          {/* UI Overlays: Hint, Controls, etc. */}
          {showHint && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="bg-black/70 backdrop-blur-md px-8 py-4 rounded-2xl flex items-center gap-3 animate-bounce">
                <span className="text-white font-semibold text-lg">
                  🖱️ Geser untuk menjelajah 360° 📱
                </span>
              </div>
            </div>
          )}

          {/* Left/Right Buttons */}
          <button
            onClick={() => {
              setIsAutoRotate(false);
              positionRef.current += 100;
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-xl hover:scale-110 transition-all duration-200 z-20"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-xl hover:scale-110 transition-all duration-200 z-20"
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
          </button>

          {/* Simplified Top-Right Controls */}
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            {/* Auto-rotate Button (Mulai) */}
            <button
              onClick={toggleAutoRotate}
              className={`p-3 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all ${
                isAutoRotate
                  ? "bg-blue-500/90 text-white"
                  : "bg-white/90 text-gray-900"
              }`}
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
            {/* Reset Button (Ulang) */}
            <button
              onClick={resetView}
              className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all"
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

          {/* Bottom Controls */}
          <div className="absolute bottom-6 left-4 flex gap-2 z-20">
            <button
              onClick={prevImage}
              className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all"
              disabled={images.length <= 1}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all"
              disabled={images.length <= 1}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
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
