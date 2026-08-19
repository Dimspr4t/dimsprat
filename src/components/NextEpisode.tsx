import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, MapPin, Clock, Camera, Users, PlusCircle, Ticket, Flame, Volume2, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { FEATURED_EVENT, OTHER_EVENTS } from '../data/mockData.ts';
import { EventItem } from '../types.ts';
import { playCyberClick } from '../utils/audioSynth.ts';

interface NextEpisodeProps {
  onOpenPhotoGallery: () => void;
  onOpenTalentModal: () => void;
  onOpenRequestEventModal: () => void;
  onOpenTicketModal: () => void;
  onOpenEventDetail?: (event: EventItem) => void;
}

export const NextEpisode: React.FC<NextEpisodeProps> = ({
  onOpenPhotoGallery,
  onOpenTalentModal,
  onOpenRequestEventModal,
  onOpenTicketModal,
  onOpenEventDetail,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Framer Motion useScroll for viewport entry
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'start 0.2'],
  });

  // Staggered entry transforms based on scroll progress
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.25], [40, 0]);

  const posterOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const posterY = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);
  const posterScale = useTransform(scrollYProgress, [0.1, 0.4], [0.93, 1]);

  const detailsOpacity = useTransform(scrollYProgress, [0.18, 0.48], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.18, 0.48], [50, 0]);

  const countdownOpacity = useTransform(scrollYProgress, [0.28, 0.58], [0, 1]);
  const countdownScale = useTransform(scrollYProgress, [0.28, 0.58], [0.95, 1]);

  const buttonsOpacity = useTransform(scrollYProgress, [0.35, 0.68], [0, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.35, 0.68], [30, 0]);

  const archiveOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const archiveY = useTransform(scrollYProgress, [0.45, 0.8], [40, 0]);

  // Dynamic Countdown Timer to the rawDate (2026-10-24T19:00:00)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(FEATURED_EVENT.rawDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        // Event day or past
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 bg-[#050505] overflow-hidden border-b border-[#141414]"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(229,9,20,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255,90,9,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Scroll-linked Reveal */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1a1a1a] pb-6 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#E50914] uppercase">
                FEATURED HIGHLIGHT // TRANSMISSION 02
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight uppercase">
              NEXT EPISODE: ROCK & METAL NIGHT EPS.2
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#888]">
              LOCATION: <span className="text-white font-bold">SECTOR 7 (JKT)</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-[#E50914]/15 border border-[#E50914]/40 text-[#E50914] text-xs font-mono font-bold">
              TICKETS LIVE
            </span>
          </div>
        </motion.div>

        {/* Highlight Main Card (Two Columns: Poster Left, Event Details Right) */}
        <div className="bg-[#090909] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Sisi Kiri (Col 5): Poster with Halftone/Grunge Filter & Hover Scale */}
            <motion.div
              style={{
                opacity: posterOpacity,
                y: posterY,
                scale: posterScale,
              }}
              onClick={() => {
                if (onOpenEventDetail) {
                  playCyberClick(900);
                  onOpenEventDetail(FEATURED_EVENT);
                }
              }}
              className="lg:col-span-5 relative group overflow-hidden bg-black min-h-[420px] lg:min-h-full flex flex-col justify-end p-6 border-b lg:border-b-0 lg:border-r border-[#1c1c1c] cursor-pointer"
            >
              {/* Event Poster Image */}
              <img
                src={FEATURED_EVENT.posterUrl}
                alt={FEATURED_EVENT.title}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-150 brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              />

              {/* Halftone / Red Grunge Color Wash Overlay (Transitions out on hover) */}
              <div className="absolute inset-0 bg-[#E50914]/20 mix-blend-color group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

              {/* Top Poster Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {FEATURED_EVENT.episode}
                </span>
                <span className="px-3 py-1 rounded bg-[#E50914] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg">
                  OFFICIAL FLYER
                </span>
              </div>

              {/* Poster Bottom Overlays */}
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#aaa]">
                  <Camera className="w-3 h-3 text-[#E50914]" />
                  <span>PHOTO ARCHIVE BY: <strong className="text-white">{FEATURED_EVENT.photographer}</strong></span>
                </div>
                <div className="text-xl font-bold font-heading text-white">
                  THE RESISTANCE // VAULT SOUNDSYSTEM
                </div>
              </div>
            </motion.div>

            {/* Sisi Kanan (Col 7): Event Specs & Countdown Timer & Action Buttons */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8 bg-[#0b0b0b]">
              {/* Event Header Info with Staggered Entrance */}
              <motion.div
                style={{ opacity: detailsOpacity, y: detailsY }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {FEATURED_EVENT.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-[#141414] text-[#888] border border-[#222]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-wide uppercase leading-tight">
                  {FEATURED_EVENT.title}
                </h3>
                <p className="text-sm font-mono text-[#E50914] font-bold">
                  {FEATURED_EVENT.subTitle}
                </p>

                <p className="text-sm text-[#999] leading-relaxed font-sans">
                  {FEATURED_EVENT.description}
                </p>

                {/* Key Event Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#121212] border border-[#1e1e1e]">
                    <Calendar className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-mono text-[#666] uppercase">DATE & TIME</div>
                      <div className="text-xs font-mono font-bold text-white">{FEATURED_EVENT.date}</div>
                      <div className="text-[11px] font-mono text-[#aaa]">{FEATURED_EVENT.time}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#121212] border border-[#1e1e1e]">
                    <MapPin className="w-4 h-4 text-[#FF5A09] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-mono text-[#666] uppercase">VENUE LOCATION</div>
                      <div className="text-xs font-mono font-bold text-white">{FEATURED_EVENT.venue}</div>
                      <div className="text-[11px] font-mono text-[#aaa]">{FEATURED_EVENT.location}</div>
                    </div>
                  </div>
                </div>

                {/* Lineup Highlights */}
                <div className="p-3.5 rounded-lg bg-[#121212] border border-[#1e1e1e] space-y-2">
                  <div className="text-[11px] font-mono uppercase text-[#777] font-bold flex items-center justify-between">
                    <span>LINEUP // STAGE TIMETABLE</span>
                    <span className="text-[#E50914]">4 HEAVY ACTS</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {FEATURED_EVENT.lineup.map((act, i) => (
                      <div key={i} className="text-xs font-mono text-[#ccc] flex items-center gap-1.5 truncate">
                        <span className="text-[#E50914] font-bold">0{i + 1}.</span>
                        <span className="truncate">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amber Orange Countdown Timer with Staggered Scale Reveal */}
                <motion.div
                  style={{ opacity: countdownOpacity, scale: countdownScale }}
                  className="p-4 rounded-xl bg-black border border-[#2a2a2a] space-y-2 shadow-inner"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#888] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF5A09]" />
                      TIME TO DOORS OPEN // COUNTDOWN
                    </span>
                    <span className="text-[#FF5A09] font-bold animate-pulse">LIVE TELEMETRY</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center pt-1">
                    {[
                      { label: 'DAYS', val: timeLeft.days },
                      { label: 'HOURS', val: timeLeft.hours },
                      { label: 'MINUTES', val: timeLeft.minutes },
                      { label: 'SECONDS', val: timeLeft.seconds },
                    ].map((unit, idx) => (
                      <div key={idx} className="bg-[#121212] p-2.5 rounded border border-[#222]">
                        <div className="text-2xl sm:text-3xl font-black font-display text-[#FF5A09] text-glow-amber tracking-wider">
                          {String(unit.val).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-mono text-[#777] uppercase tracking-wider">
                          {unit.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons Cluster (Specifically requested in prompt) with Staggered Reveal */}
              <motion.div
                style={{ opacity: buttonsOpacity, y: buttonsY }}
                className="space-y-3 pt-2"
              >
                {/* Primary Pass / Ticket RSVP CTA */}
                <button
                  id="featured-event-rsvp-btn"
                  onClick={() => {
                    playCyberClick(1200);
                    onOpenTicketModal();
                  }}
                  className="w-full py-4 px-6 rounded-lg bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.99] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl box-glow-red transition-all cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>SECURE DIGITAL PASS // {FEATURED_EVENT.price}</span>
                </button>

                {/* Secondary Fast Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Photo Gallery Link Button */}
                  <button
                    id="event-photo-gallery-btn"
                    onClick={() => {
                      playCyberClick(900);
                      onOpenPhotoGallery();
                    }}
                    className="py-3 px-3 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#E50914] text-[11px] font-mono text-white font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                    title="View Photo Archive by Ali Tim BR"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                    <span className="truncate">PHOTO BY ALI TIM BR</span>
                  </button>

                  {/* Join as Lead / Talent Button */}
                  <button
                    id="event-join-talent-btn"
                    onClick={() => {
                      playCyberClick(900);
                      onOpenTalentModal();
                    }}
                    className="py-3 px-3 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#FF5A09] text-[11px] font-mono text-white font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    <Users className="w-3.5 h-3.5 text-[#FF5A09] shrink-0" />
                    <span className="truncate">JOIN AS LEAD / TALENT</span>
                  </button>

                  {/* Request New Event Button */}
                  <button
                    id="event-request-new-btn"
                    onClick={() => {
                      playCyberClick(900);
                      onOpenRequestEventModal();
                    }}
                    className="py-3 px-3 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#E50914] text-[11px] font-mono text-white font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-white shrink-0" />
                    <span className="truncate">REQUEST NEW EVENT</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Other Episodes Archive Preview Strip with Staggered Scroll Reveal */}
        <motion.div
          style={{ opacity: archiveOpacity, y: archiveY }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777]">
              OTHER TRANSMISSIONS // ARCHIVED & ANNOUNCED
            </span>
            <span className="text-xs font-mono text-[#E50914] hover:underline cursor-pointer" onClick={onOpenPhotoGallery}>
              EXPLORE ALL EPISODES →
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OTHER_EVENTS.map((ev) => (
              <div
                key={ev.id}
                className="p-5 rounded-xl bg-[#090909] border border-[#1c1c1c] hover:border-[#2a2a2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] text-[#888] border border-[#242424]">
                      {ev.episode}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        ev.status === 'ARCHIVED' ? 'text-[#777]' : 'text-[#FF5A09]'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-heading text-white">{ev.title}</h4>
                  <p className="text-xs font-mono text-[#888]">{ev.date} • {ev.venue}</p>
                </div>

                <button
                  onClick={() => {
                    playCyberClick(800);
                    if (ev.status === 'ARCHIVED') {
                      onOpenPhotoGallery();
                    } else {
                      onOpenTicketModal();
                    }
                  }}
                  className="px-3.5 py-2 rounded bg-[#141414] hover:bg-[#1f1f1f] text-xs font-mono text-white border border-[#262626] transition-colors shrink-0 cursor-pointer"
                >
                  {ev.status === 'ARCHIVED' ? 'VIEW PHOTO ARCHIVES' : 'PRE-REGISTER'}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
