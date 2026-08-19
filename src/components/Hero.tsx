'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Flame, Disc3 } from 'lucide-react';
import { playCyberClick } from '../utils/audioSynth.ts';
import heroBgImage from '../assets/images/underground_hero_bg_1787144583456.jpg';

interface HeroProps {
  onExploreEvents: () => void;
  onExplorePlugins: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreEvents, onExplorePlugins }) => {
  const containerRef = useRef<HTMLElement | null>(null);

  // Framer Motion useScroll and useTransform for subtle parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Staggered parallax and opacity transforms
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.65, 0.2]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black"
    >
      {/* Background Image with Dark Vignette & Parallax Scale */}
      <motion.div
        style={{
          scale: bgScale,
          opacity: bgOpacity,
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img
          src={heroBgImage}
          alt="DIM$PRAT Underground Stage Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center grayscale contrast-125 brightness-75"
        />
        {/* Deep dark cinematic gradient masks to ensure 100% text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)]" />
      </motion.div>

      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 border-cyber-grid opacity-15 pointer-events-none" />

      {/* Ambient Gradient Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(229,9,20,0.18)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute -bottom-20 right-10 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(255,90,9,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Underground Telemetry Badge */}
        <motion.div
          style={{ y: badgeY }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111]/90 border border-[#262626] backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#bbb] uppercase">
            SECTOR 07 // LIVE VISUAL & STAGE ARCHIVE
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E50914]/15 text-[#E50914] font-bold border border-[#E50914]/30">
            v2026.8
          </span>
        </motion.div>

        {/* Main Massive Slogan (Distressed Neo-Grunge Typography) */}
        <motion.h1
          style={{ y: titleY, opacity: titleOpacity }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight text-white uppercase leading-[0.95] max-w-5xl select-none"
        >
          THE SOUND <span className="text-[#E50914] text-glow-red">&</span> VISUALS OF THE{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f0f0f0] to-[#888]">
            UNDERGROUND.
          </span>
        </motion.h1>

        {/* Subtitle / Philosophy */}
        <motion.p
          style={{ y: textY, opacity: textOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#999] max-w-2xl font-sans font-normal leading-relaxed"
        >
          Architecting underground live heavy gigs, dark cyber aesthetics, and hardware-accelerated visual plugins for Resolume Arena, OBS Studio, and stage VJs.
        </motion.p>

        {/* Primary Call-to-Actions (CTAs) */}
        <motion.div
          style={{ y: ctaY, opacity: ctaOpacity }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4 w-full max-w-md"
        >
          {/* Explore Events Button */}
          <button
            id="hero-explore-events-btn"
            onClick={() => {
              playCyberClick(1100);
              onExploreEvents();
            }}
            className="flex-1 min-w-[180px] py-4 px-6 rounded-lg bg-[#E50914] hover:bg-[#ff1b27] active:scale-[0.98] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl box-glow-red transition-all cursor-pointer group"
          >
            <Flame className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>EXPLORE EVENTS</span>
          </button>

          {/* Plugins & Tools Button */}
          <button
            id="hero-explore-plugins-btn"
            onClick={() => {
              playCyberClick(800);
              onExplorePlugins();
            }}
            className="flex-1 min-w-[180px] py-4 px-6 rounded-lg bg-[#0d0d0d] hover:bg-[#161616] active:scale-[0.98] text-white border border-[#E50914]/50 hover:border-[#E50914] font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-lg"
          >
            <Disc3 className="w-4 h-4 text-[#FF5A09] group-hover:rotate-90 transition-transform" />
            <span>VISUAL PLUGINS</span>
          </button>
        </motion.div>

        {/* Bottom Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col items-center text-[#555] hover:text-[#888] transition-colors cursor-pointer"
          onClick={() => {
            playCyberClick(600);
            onExploreEvents();
          }}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest mb-1.5">
            SCROLL TO TRANSMISSION
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#E50914]" />
        </motion.div>
      </div>

      {/* Ticker Tape at bottom of Hero */}
      <div className="absolute bottom-0 left-0 right-0 py-2 bg-[#080808] border-y border-[#181818] overflow-hidden whitespace-nowrap select-none">
        <div className="inline-flex gap-8 text-[11px] font-mono tracking-widest text-[#777] uppercase animate-pulse">
          <span>// NEXT EPISODE: ROCK & METAL NIGHT EPS.2 // 24 OCT 2026 // THE BUNKER VAULT</span>
          <span className="text-[#E50914]">✦</span>
          <span>REALTIME VISUAL SUITE v2.4 AVAILABLE</span>
          <span className="text-[#FF5A09]">✦</span>
          <span>480 GSM STREETWEAR HOODIE LIMITED DROP</span>
          <span className="text-[#E50914]">✦</span>
          <span>UNDERGROUND STAGE ARCHIVE EST. 2022</span>
        </div>
      </div>
    </section>
  );
};
