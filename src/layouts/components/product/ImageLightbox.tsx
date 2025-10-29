"use client";

import Image from "next/image";
import { useEffect, useRef, useState, MouseEvent } from "react";
import {
  HiX,
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiZoomIn,
  HiZoomOut,
} from "react-icons/hi";
import type { ImageItem } from "./ProductGallery";

interface ImageLightboxProps {
  images: ImageItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageLightbox = ({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom when changing image
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [initialIndex, isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsZoomed(false);
            setZoomLevel(1);
            setPosition({ x: 0, y: 0 });
          }
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsZoomed(false);
            setZoomLevel(1);
            setPosition({ x: 0, y: 0 });
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, images.length, onClose]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsZoomed(false);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsZoomed(false);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
      setZoomLevel(2);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.5, 1);
    setZoomLevel(newZoom);
    if (newZoom === 1) {
      setIsZoomed(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !isZoomed) return;

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const imageRect = imageRef.current?.getBoundingClientRect();
    if (!imageRect) return;

    const maxX = (imageRect.width * zoomLevel - containerRect.width) / 2;
    const maxY = (imageRect.height * zoomLevel - containerRect.height) / 2;

    const newX = Math.max(-maxX, Math.min(maxX, e.clientX - dragStart.x));
    const newY = Math.max(-maxY, Math.min(maxY, e.clientY - dragStart.y));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black/95 dark:bg-black/95 flex items-center justify-center"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Chiudi lightbox"
      >
        <HiX size={24} />
      </button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Immagine precedente"
        >
          <HiOutlineArrowNarrowLeft size={24} />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Immagine successiva"
        >
          <HiOutlineArrowNarrowRight size={24} />
        </button>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-sm">
        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 1}
          className="p-2 rounded-full hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Riduci zoom"
        >
          <HiZoomOut size={20} />
        </button>
        <span className="px-3 text-white text-sm font-medium min-w-[60px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 4}
          className="p-2 rounded-full hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Aumenta zoom"
        >
          <HiZoomIn size={20} />
        </button>
      </div>

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image container */}
      <div
        ref={imageRef}
        className={`relative max-w-[90vw] max-h-[90vh] transition-transform duration-200 ${
          isDragging
            ? "cursor-grabbing"
            : isZoomed
              ? "cursor-grab"
              : "cursor-zoom-in"
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
        }}
        onMouseDown={handleMouseDown}
        onClick={isZoomed ? undefined : handleZoom}
      >
        <Image
          src={currentImage.url}
          alt={currentImage.altText || `Immagine prodotto ${currentIndex + 1}`}
          width={currentImage.width}
          height={currentImage.height}
          className="max-w-[90vw] max-h-[90vh] object-contain select-none"
          draggable={false}
          priority
        />
      </div>

      {/* Instructions */}
      {!isZoomed && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs text-center">
          Clicca per zoomare • ESC per chiudere
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
