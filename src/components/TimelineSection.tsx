import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Terminal, Shield, Award, Cpu, Music, MapPin, Zap } from 'lucide-react';
import { TIMELINE_DATA } from '../data/mockData.ts';

export const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Framer Motion useScroll tracking the timeline section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'start 0.1'],
  });

  // Staggered entry transforms
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  const bioOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);
  const bioY = useTransform(scrollYProgress, [0.08, 0.3], [50, 0]);

  const statsOpacity = useTransform(scrollYProgress, [0.15, 0.38], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.15, 0.38], [50, 0]);

  // Dynamic vertical glowing track scale that grows down as the user scrolls through the timeline
  const lineProgress = useTransform(scrollYProgress, [0.25, 0.85], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 bg-[#060606] border-b border-[#141414] overflow-hidden"
    >
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(229,9,20,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Scroll-linked Reveal */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-16 border-b border-[#1a1a1a] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#E50914] uppercase">
                ORIGINS & TELEMETRY // 2022 - 2026
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight uppercase">
              ABOUT DIM$PRAT & TIMELINE
            </h2>
          </div>

          <div className="text-xs font-mono text-[#888]">
            ARCHITECTING THE FUTURE OF INDEPENDENT HEAVY MUSIC
          </div>
        </motion.div>

        {/* Bio & Stats Bento Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Statement (Col 7) */}
          <motion.div
            style={{ opacity: bioOpacity, y: bioY }}
            className="lg:col-span-7 bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#E50914]/15 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] font-heading font-black text-xl">
                D$
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-white uppercase">
                  DIMAS LM (DIM$PRAT)
                </h3>
                <p className="text-xs font-mono text-[#888]">
                  VISUAL & GPU ENGINEER • LIVE EVENT CURATOR • HARDWARE HACKER
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#ccc] leading-relaxed font-sans">
              Born from late-night basement soldering sessions and visceral underground metal gigs, <strong className="text-white">DIM$PRAT</strong> represents the raw intersection of high-gain distortion, GPU shader & real-time visual software design, and cyber-streetwear aesthetics.
            </p>

            <p className="text-xs sm:text-sm text-[#999] leading-relaxed font-sans">
              Rather than waiting for mainstream industry gatekeepers, we develop our own visual plugins for Resolume Arena and OBS, curate quadraphonic underground warehouse episodes, and manufacture heavy-weight armor for musicians and visual artists worldwide.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {[
                'GLSL & FFGL 2.2 SHADER PIPELINE',
                'RESOLUME WIRE & ARENA',
                'OBS STUDIO NATIVE C++',
                'LIVE STAGE LASERS & VJ',
                'UNDERGROUND EVENT PRODUCTION',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded bg-[#121212] border border-[#262626] text-[10px] font-mono text-[#aaa]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats & Telemetry Numbers (Col 5) */}
          <motion.div
            style={{ opacity: statsOpacity, y: statsY }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col justify-between">
              <div className="p-2.5 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] w-fit">
                <Music className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black font-display text-white">
                  24+
                </div>
                <div className="text-xs font-mono text-[#888] uppercase mt-1">
                  SOLD OUT UNDERGROUND EPISODES
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col justify-between">
              <div className="p-2.5 rounded-lg bg-[#FF5A09]/10 border border-[#FF5A09]/30 text-[#FF5A09] w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black font-display text-white">
                  150K+
                </div>
                <div className="text-xs font-mono text-[#888] uppercase mt-1">
                  GLOBAL VISUAL PLUGIN DOWNLOADS
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/20 text-white w-fit">
              <div className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-white w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black font-display text-white">
                  18
                </div>
                <div className="text-xs font-mono text-[#888] uppercase mt-1">
                  BAND & ARTIST CO-RELEASES
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col justify-between">
              <div className="p-2.5 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] w-fit">
                <Shield className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black font-display text-white">
                  100%
                </div>
                <div className="text-xs font-mono text-[#888] uppercase mt-1">
                  DIY INDEPENDENT CONTROL
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#777] border-b border-[#1c1c1c] pb-3">
            CHRONOLOGICAL MILESTONES // 2022 TO PRESENT
          </div>

          <div className="relative ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {/* Background base vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#1a1a1a]" />

            {/* Glowing red progressive timeline line that grows down on scroll */}
            <motion.div
              style={{ scaleY: lineProgress }}
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E50914] via-[#FF5A09] to-[#E50914] origin-top shadow-[0_0_8px_rgba(229,9,20,0.8)]"
            />

            {TIMELINE_DATA.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#111] border-2 border-[#E50914] group-hover:bg-[#E50914] group-hover:scale-125 transition-all" />

                <div className="p-5 rounded-xl bg-[#090909] border border-[#1c1c1c] hover:border-[#2a2a2a] transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black font-mono text-[#E50914]">
                        {item.year}
                      </span>
                      <span className="text-xs text-[#555]">•</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] text-[#FF5A09] border border-[#242424]">
                        {item.category}
                      </span>
                    </div>

                    {item.location && (
                      <span className="text-[11px] font-mono text-[#777] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E50914]" /> {item.location}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold font-heading text-white">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#999] leading-relaxed">
                    {item.description}
                  </p>

                  {item.stats && (
                    <div className="text-xs font-mono font-bold text-[#ccc] pt-1">
                      KEY METRIC: <span className="text-white">{item.stats}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
