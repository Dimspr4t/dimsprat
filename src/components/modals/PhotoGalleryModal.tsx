import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, ChevronLeft, ChevronRight, Download, Maximize2, Shield, Sparkles } from 'lucide-react';
import { GALLERY_PHOTOS } from '../../data/mockData.ts';
import { playCyberClick } from '../../utils/audioSynth.ts';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ isOpen, onClose }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'BAND' | 'CROWD'>('ALL');

  // Keyboard navigation support for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0));
      } else if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  if (!isOpen) return null;

  const currentPhoto = selectedPhotoIndex !== null ? GALLERY_PHOTOS[selectedPhotoIndex] : null;

  const polaroidRotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-3', 'rotate-3'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl bg-[#090909] border border-[#222222] rounded-2xl overflow-hidden shadow-2xl my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c1c1c] bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#E50914]/15 border border-[#E50914]/40 text-[#E50914]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono tracking-widest text-[#E50914] uppercase">
                    POLAROID DOCUMENTATION ARCHIVE // EPS.1 & EPS.2
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] text-[#888] border border-[#2a2a2a]">
                    <Shield className="w-2.5 h-2.5 text-[#E50914]" /> VERIFIED LOGS
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold font-heading tracking-wide text-white uppercase">
                  ROCK & METAL NIGHT // 35MM & FLASH ARCHIVE
                </h3>
              </div>
            </div>

            <button
              id="close-gallery-modal-btn"
              onClick={() => {
                playCyberClick(600);
                onClose();
              }}
              className="p-2 rounded-lg text-[#888888] hover:text-white hover:bg-[#1f1f1f] border border-transparent hover:border-[#333] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sub Header & Credit */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-[#161616] bg-[#070707] text-xs font-mono text-[#8a8a8a]">
            <div>
              DOCUMENTED BY <span className="text-white font-bold">ALI TIM BR (@alitimbr_visuals)</span> • HIGH CONTRAST ANALOG SENSORS
            </div>
            <div className="flex gap-2">
              {(['ALL', 'BAND', 'CROWD'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    playCyberClick(800);
                    setFilter(f);
                  }}
                  className={`px-3 py-1 rounded text-[11px] font-mono tracking-wider transition-colors ${
                    filter === f
                      ? 'bg-[#E50914] text-white font-bold'
                      : 'bg-[#141414] text-[#777] hover:text-white border border-[#222]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* POLAROID GRID (Sesuai spesifikasi dengan random tilt & analog framing) */}
          <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[65vh] overflow-y-auto bg-[#060606]">
            {GALLERY_PHOTOS.map((photo, index) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.03, rotate: 0 }}
                onClick={() => {
                  playCyberClick(1000);
                  setSelectedPhotoIndex(index);
                }}
                className={`relative bg-[#0d0d0d] p-3.5 pb-6 rounded-xl border border-[#262626] hover:border-[#E50914] shadow-2xl cursor-pointer transition-all duration-300 transform ${
                  polaroidRotations[index % polaroidRotations.length]
                } group`}
              >
                {/* Visual Tape Sticker Top Center */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-white/10 backdrop-blur-sm border border-white/5 rotate-[-1deg] rounded-[1px]" />

                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-black relative mb-3">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#E50914] font-bold">
                      {photo.timestamp}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <span className="p-2.5 rounded-full bg-[#E50914] text-white shadow-xl box-glow-red">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Polaroid Bottom Handwriting/Typewriter Aesthetic Label */}
                <div className="space-y-1 px-1">
                  <div className="text-xs font-mono font-bold text-white tracking-wide truncate group-hover:text-[#E50914] transition-colors">
                    {photo.band}
                  </div>
                  <p className="text-[11px] font-mono text-[#777] line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="px-6 py-3.5 border-t border-[#1a1a1a] bg-[#080808] flex flex-wrap items-center justify-between text-xs font-mono text-[#666]">
            <span>TOTAL ARCHIVES: {GALLERY_PHOTOS.length} POLAROID SNAPSHOTS</span>
            <span className="text-[#888]">KEYBOARD CONTROLS: [←] PREV / [→] NEXT / [ESC] EXIT</span>
          </div>
        </motion.div>

        {/* GLITCH LIGHTROOM OVERLAY MODAL */}
        {currentPhoto && (
          <div
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#E50914] text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left/Right Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playCyberClick(700);
                setSelectedPhotoIndex(
                  (selectedPhotoIndex! - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
                );
              }}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-[#E50914] text-white transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playCyberClick(900);
                setSelectedPhotoIndex((selectedPhotoIndex! + 1) % GALLERY_PHOTOS.length);
              }}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-[#E50914] text-white transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Frame */}
            <div
              className="max-w-4xl w-full bg-[#0a0a0a] border border-[#E50914]/40 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[70vh] flex items-center justify-center bg-black overflow-hidden relative">
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.caption}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-4 sm:p-5 bg-[#0c0c0c] flex flex-wrap items-center justify-between gap-4 border-t border-[#1f1f1f]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-[#E50914] font-bold">{currentPhoto.band}</span>
                    <span className="text-xs text-[#555]">•</span>
                    <span className="text-xs font-mono text-[#888]">{currentPhoto.timestamp}</span>
                    <span className="text-xs text-[#555]">•</span>
                    <span className="text-xs font-mono text-[#666]">SHOT BY ALI TIM BR</span>
                  </div>
                  <p className="text-sm text-[#eee] mt-1">{currentPhoto.caption}</p>
                </div>

                <button
                  onClick={() => {
                    playCyberClick(1200);
                    alert(`Downloading uncompressed master snapshot: ${currentPhoto.id}_by_AliTimBR.jpg`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] text-white text-xs font-mono font-bold tracking-wider transition-colors cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD RAW ASSET</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
