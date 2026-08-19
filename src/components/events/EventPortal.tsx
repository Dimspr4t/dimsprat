'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, MapPin, Clock, Ticket, Users, PlusCircle, Camera, 
  Play, Volume2, Sparkles, ExternalLink, ArrowRight, ShieldCheck,
  Disc3, Radio, ArrowLeft
} from 'lucide-react';
import { EventItem } from '../../types.ts';
import { FEATURED_EVENT, OTHER_EVENTS } from '../../data/mockData.ts';
import { playCyberClick } from '../../utils/audioSynth.ts';

interface EventPortalProps {
  onSelectEvent: (event: EventItem) => void;
  onOpenGallery: () => void;
  onOpenTalentModal: () => void;
  onOpenRequestEventModal: () => void;
  onReturnToMainHub: () => void;
}

export const EventPortal: React.FC<EventPortalProps> = ({
  onSelectEvent,
  onOpenGallery,
  onOpenTalentModal,
  onOpenRequestEventModal,
  onReturnToMainHub,
}) => {
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'UPCOMING' | 'ARCHIVED'>('ALL');

  const allEvents = [FEATURED_EVENT, ...OTHER_EVENTS];
  const filteredEvents = allEvents.filter((ev) => {
    if (filterCategory === 'UPCOMING') return ev.status === 'UPCOMING';
    if (filterCategory === 'ARCHIVED') return ev.status === 'ARCHIVED';
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E50914] selection:text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Subdomain Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#090909] border border-[#1f1f1f]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playCyberClick(700);
                onReturnToMainHub();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-xs font-mono text-[#aaa] hover:text-white border border-[#2a2a2a] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>MAIN HUB (dimsprat.com)</span>
            </button>
            <div className="h-4 w-[1px] bg-[#222] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">
                events.dimsprat.com // LIVE TELEMETRY FEED
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playCyberClick(800);
                onOpenTalentModal();
              }}
              className="px-3 py-1.5 rounded bg-[#161616] hover:bg-[#222] text-xs font-mono text-[#FF5A09] border border-[#FF5A09]/40 cursor-pointer"
            >
              JOIN AS TALENT
            </button>
            <button
              onClick={() => {
                playCyberClick(800);
                onOpenRequestEventModal();
              }}
              className="px-3 py-1.5 rounded bg-[#161616] hover:bg-[#222] text-xs font-mono text-white border border-[#333] cursor-pointer"
            >
              REQUEST CITY
            </button>
          </div>
        </div>

        {/* HERO BILLBOARD TEASER */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-[#222] shadow-2xl min-h-[480px] flex flex-col justify-end p-8 sm:p-12 group">
          {/* Billboard Video / Teaser Background */}
          <img
            src={FEATURED_EVENT.posterUrl}
            alt={FEATURED_EVENT.title}
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-150 brightness-75 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-[#E50914]/15 mix-blend-color pointer-events-none" />

          {/* Top Live Badge */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#E50914]/50 text-xs font-mono font-bold text-white">
              <Radio className="w-3.5 h-3.5 text-[#E50914] animate-pulse" />
              <span>UPCOMING TRANSMISSION // EPS.02</span>
            </div>

            <div className="px-3 py-1 rounded bg-[#E50914] text-white text-xs font-mono font-bold uppercase">
              TICKETS LIVE
            </div>
          </div>

          {/* Billboard Content */}
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-mono text-[#E50914] font-bold">
                SATURDAY, 24 OCTOBER 2026 • 19:00 WIB
              </span>
              <span className="text-[#555]">•</span>
              <span className="text-sm font-mono text-[#aaa]">THE BUNKER VAULT - SECTOR 7</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight uppercase leading-none">
              ROCK & METAL NIGHT EPS.2
            </h1>

            <p className="text-sm sm:text-base text-[#ccc] font-sans max-w-2xl line-clamp-2">
              Heavy industrial sonic warfare, high-gain modular analog distortion, and raw moshpit energy featuring Valkyrie Overdrive, Silicon Grave, Void Pulse, and DIM$PRAT.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  playCyberClick(1200);
                  onSelectEvent(FEATURED_EVENT);
                }}
                className="py-3.5 px-6 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.99] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl box-glow-red transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>EXPLORE EVENT & SECURE PASS</span>
              </button>

              <button
                onClick={() => {
                  playCyberClick(800);
                  onOpenGallery();
                }}
                className="py-3.5 px-5 rounded-xl bg-black/80 hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20 hover:border-[#E50914] transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#E50914]" />
                <span>VIEW PHOTO ARCHIVE</span>
              </button>
            </div>
          </div>
        </div>

        {/* FEED SECTION: UPCOMING & ARCHIVED TRANSMISSIONS */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1c1c1c] pb-6">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-[#E50914] uppercase">
                TRANSMISSION CATALOG
              </div>
              <h2 className="text-3xl font-black font-heading text-white uppercase">
                ALL EPISODES & ARCHIVES
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {(['ALL', 'UPCOMING', 'ARCHIVED'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    playCyberClick(700);
                    setFilterCategory(f);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                    filterCategory === f
                      ? 'bg-[#E50914] text-white font-bold'
                      : 'bg-[#111] text-[#777] hover:text-white border border-[#222]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* EVENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => {
              const isArchived = ev.status === 'ARCHIVED';
              return (
                <div
                  key={ev.id}
                  onClick={() => {
                    playCyberClick(900);
                    if (isArchived) {
                      onOpenGallery();
                    } else {
                      onSelectEvent(ev);
                    }
                  }}
                  className={`group relative rounded-2xl bg-[#090909] border border-[#1f1f1f] hover:border-[#E50914] overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl ${
                    isArchived ? 'opacity-70 hover:opacity-100' : ''
                  }`}
                >
                  {/* Poster Image Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={ev.posterUrl}
                      alt={ev.title}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
                        isArchived ? 'grayscale' : 'grayscale contrast-125 group-hover:grayscale-0'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Big Monospaced Date Banner (Sesuai spesifikasi) */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-widest drop-shadow-md">
                        {ev.rawDate.split('T')[0].split('-').reverse().join('.')}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase ${
                          isArchived
                            ? 'bg-[#181818] text-[#888] border border-[#333]'
                            : 'bg-[#E50914] text-white'
                        }`}
                      >
                        {ev.status}
                      </span>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#E50914] font-bold border border-white/10">
                        {ev.episode}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#E50914] transition-colors uppercase">
                        {ev.title}
                      </h3>
                      <p className="text-xs font-mono text-[#888] line-clamp-1">
                        {ev.venue} • {ev.location}
                      </p>
                      <p className="text-xs text-[#999] line-clamp-2">
                        {ev.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#181818] flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold">
                        {isArchived ? 'PHOTO ARCHIVE AVAILABLE' : ev.price}
                      </span>
                      <span className="text-[#E50914] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {isArchived ? 'VIEW GALLERY' : 'EVENT DETAIL'} →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
