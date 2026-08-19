'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Clock, Ticket, Users, PlusCircle, Camera, 
  ArrowLeft, Check, ShieldCheck, QrCode, Play, Volume2, Sparkles,
  ExternalLink, ChevronRight, Download, Radio, Shield, AlertCircle
} from 'lucide-react';
import { EventItem, GalleryPhoto } from '../../types.ts';
import { FEATURED_EVENT, OTHER_EVENTS, GALLERY_PHOTOS } from '../../data/mockData.ts';
import { playCyberClick, playSuccessChime } from '../../utils/audioSynth.ts';

interface EventDetailViewProps {
  event: EventItem;
  onBack: () => void;
  onOpenCheckout: (event: EventItem, selectedTier?: string) => void;
  onOpenGallery: () => void;
  onOpenTalentModal: () => void;
  onOpenRequestEventModal: () => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  onBack,
  onOpenCheckout,
  onOpenGallery,
  onOpenTalentModal,
  onOpenRequestEventModal,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('presale-1');
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(true);

  // Ticket Tiers Specification
  const ticketTiers = [
    {
      id: 'early-bird',
      name: 'EARLY BIRD PASS',
      price: '$15 USD / IDR 120K',
      priceNum: 15,
      status: 'SOLD OUT',
      available: false,
      quota: '0 / 100 LEFT',
      perks: ['General Admission Entry', 'Free Cyber Sticker Pack'],
    },
    {
      id: 'presale-1',
      name: 'PRESALE 1 ENTRY',
      price: '$25 USD / IDR 200K',
      priceNum: 25,
      status: '5 TICKETS LEFT',
      available: true,
      quota: '5 / 150 LEFT',
      perks: ['Fast-Track Vault Entry', 'Digital Audio Master Pack DL', 'Event Wristband'],
    },
    {
      id: 'vip-pass',
      name: 'VIP ALL-ACCESS + MERCH',
      price: '$50 USD / IDR 380K',
      priceNum: 50,
      status: 'AVAILABLE',
      available: true,
      quota: '22 / 50 LEFT',
      perks: ['Backstage & Moshpit Access', 'Exclusive Event Acid-Wash Tee', 'Meet & Greet with Bands', 'Soundcheck Access'],
    },
  ];

  const currentTierObj = ticketTiers.find((t) => t.id === selectedTier) || ticketTiers[1];
  const totalPrice = (currentTierObj.priceNum * ticketQuantity);

  // Lineup artist details with images and genre tags
  const artistLineup = [
    {
      name: 'VALKYRIE OVERDRIVE',
      genre: 'SLUDGE / DOOM METAL',
      timeSlot: '20:30 - 21:30',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
      stage: 'MAIN VAULT STAGE',
    },
    {
      name: 'SILICON GRAVE',
      genre: 'CYBER INDUSTRIAL / EBM',
      timeSlot: '21:45 - 22:45',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop',
      stage: 'MAIN VAULT STAGE',
    },
    {
      name: 'VOID PULSE',
      genre: 'HARDCORE / DEATHCORE',
      timeSlot: '23:00 - 00:00',
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
      stage: 'MAIN VAULT STAGE',
    },
    {
      name: 'DIM$PRAT',
      genre: 'LIVE MODULAR AUDIO & HARDWARE HAVOC',
      timeSlot: '00:15 - LATE',
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=600&auto=format&fit=crop',
      stage: 'MAIN VAULT STAGE',
    },
  ];

  // Polaroid rotation helper for teaser photos
  const polaroidRotations = ['-rotate-2', 'rotate-1', '-rotate-3', 'rotate-2'];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Breadcrumb & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1c1c1c] pb-4">
          <button
            id="back-to-events-btn"
            onClick={() => {
              playCyberClick(700);
              onBack();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#111] hover:bg-[#1c1c1c] border border-[#262626] text-xs font-mono text-[#ccc] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#E50914]" />
            <span>BACK TO ALL TRANSMISSIONS</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#888]">
              STATUS: <strong className="text-emerald-400 font-bold uppercase">{event.status}</strong>
            </span>
            <span className="px-2.5 py-1 rounded bg-[#E50914]/20 border border-[#E50914]/50 text-[#E50914] text-xs font-mono font-bold">
              DOORS OPEN: 19:00 WIB
            </span>
          </div>
        </div>

        {/* 2-COLUMN ASYMMETRICAL DETAIL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SISI KIRI (Col 5): Poster Acara dengan Halftone & Filter Red */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative group overflow-hidden bg-black rounded-2xl border border-[#222] shadow-2xl min-h-[480px] flex flex-col justify-end p-6">
              {/* Poster Image */}
              <img
                src={event.posterUrl}
                alt={event.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  isFilterActive ? 'grayscale contrast-150 brightness-90 group-hover:grayscale-0' : 'grayscale-0'
                }`}
              />

              {/* Halftone / Red Grunge Color Wash Overlay */}
              {isFilterActive && (
                <div className="absolute inset-0 bg-[#E50914]/25 mix-blend-color group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 pointer-events-none" />

              {/* Top Corner Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-white uppercase">
                  {event.episode}
                </span>
                <span className="px-3 py-1 rounded bg-[#E50914] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg">
                  OFFICIAL ARTWORK
                </span>
              </div>

              {/* Poster Bottom Metadata */}
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#aaa]">
                  <Camera className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>PHOTO ARCHIVE: <strong className="text-white">{event.photographer}</strong></span>
                </div>
                <div className="text-2xl font-bold font-heading text-white tracking-wide">
                  {event.title}
                </div>
              </div>
            </div>

            {/* Poster Filter Toggle & Spec Box */}
            <div className="p-3.5 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-between text-xs font-mono">
              <span className="text-[#777]">POSTER COLOR WASH:</span>
              <button
                onClick={() => {
                  playCyberClick(600);
                  setIsFilterActive(!isFilterActive);
                }}
                className="px-2.5 py-1 rounded bg-[#161616] hover:bg-[#222] border border-[#2a2a2a] text-[#ccc] hover:text-white transition-colors cursor-pointer"
              >
                {isFilterActive ? 'RED HALFTONE (ON)' : 'NATURAL COLOR (OFF)'}
              </button>
            </div>
          </div>

          {/* SISI KANAN (Col 7): Detail Spesifikasi, Susunan Acara & Widget Pilihan Tiket */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#090909] border border-[#1f1f1f] space-y-6 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#E50914] uppercase">
                    TRANSMISSION // {event.episode}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase tracking-tight">
                  {event.title}
                </h1>
                <p className="text-sm font-mono text-[#FF5A09] font-bold mt-1">
                  {event.subTitle}
                </p>
              </div>

              <p className="text-sm text-[#aaa] leading-relaxed font-sans">
                {event.description}
              </p>

              {/* Event Key Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#111] border border-[#1e1e1e] flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-mono text-[#666] uppercase">DATE & SCHEDULE</div>
                    <div className="text-xs font-mono font-bold text-white">{event.date}</div>
                    <div className="text-[11px] font-mono text-[#888]">{event.time}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111] border border-[#1e1e1e] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF5A09] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-mono text-[#666] uppercase">VENUE & SECTOR</div>
                    <div className="text-xs font-mono font-bold text-white">{event.venue}</div>
                    <div className="text-[11px] font-mono text-[#888]">{event.location}</div>
                  </div>
                </div>
              </div>

              {/* TICKET SELECTION WIDGET (Sesuai spesifikasi layout 2-kolom) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#aaa] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-[#E50914]" />
                    SELECT ACCESS TIER & PASSES
                  </span>
                  <span className="text-[#666]">MAX 4 PER ORDER</span>
                </div>

                <div className="space-y-2.5">
                  {ticketTiers.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => {
                        if (tier.available) {
                          playCyberClick(800);
                          setSelectedTier(tier.id);
                        }
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedTier === tier.id && tier.available
                          ? 'bg-[#141414] border-[#E50914] shadow-lg box-glow-red'
                          : !tier.available
                          ? 'bg-[#0a0a0a] border-[#1a1a1a] opacity-50 cursor-not-allowed'
                          : 'bg-[#101010] border-[#222] hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="ticketTier"
                            checked={selectedTier === tier.id && tier.available}
                            onChange={() => {}}
                            disabled={!tier.available}
                            className="mt-1 accent-[#E50914] cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold font-heading text-white">{tier.name}</h4>
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.2 rounded ${
                                  !tier.available
                                    ? 'bg-neutral-800 text-neutral-400'
                                    : tier.status.includes('LEFT')
                                    ? 'bg-[#FF5A09]/20 text-[#FF5A09] border border-[#FF5A09]/40'
                                    : 'bg-emerald-950/40 text-emerald-400'
                                }`}
                              >
                                {tier.status}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-[#888] mt-0.5">
                              {tier.quota} • Includes {tier.perks[0]}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-base font-black font-heading text-white">
                            {tier.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity Selector & Summary */}
                <div className="p-4 rounded-xl bg-[#0c0c0c] border border-[#1f1f1f] flex items-center justify-between">
                  <div className="text-xs font-mono text-[#aaa]">
                    <span>QUANTITY PASSES:</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        playCyberClick(600);
                        setTicketQuantity(Math.max(1, ticketQuantity - 1));
                      }}
                      className="w-7 h-7 rounded bg-[#181818] hover:bg-[#252525] text-white font-mono flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-white text-sm w-4 text-center">
                      {ticketQuantity}
                    </span>
                    <button
                      onClick={() => {
                        playCyberClick(600);
                        setTicketQuantity(Math.min(4, ticketQuantity + 1));
                      }}
                      className="w-7 h-7 rounded bg-[#181818] hover:bg-[#252525] text-white font-mono flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* PROCEED TO CHECKOUT BUTTON (GLOW) */}
                <button
                  id="proceed-to-checkout-btn"
                  onClick={() => {
                    playCyberClick(1200);
                    onOpenCheckout(event, selectedTier);
                  }}
                  className="w-full py-4 px-6 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.99] text-white font-mono font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl box-glow-red transition-all cursor-pointer"
                >
                  <Ticket className="w-5 h-5" />
                  <span>PROCEED TO CHECKOUT // ${totalPrice} USD</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LINEUP / TALENT INVOLVED SECTION */}
        <div className="space-y-6 pt-4 border-t border-[#181818]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-[#E50914] uppercase">
                LINEUP & STAGE TIMETABLE
              </div>
              <h3 className="text-2xl font-black font-heading text-white uppercase">
                PERFORMING ACTS & FREQUENCIES
              </h3>
            </div>
            <button
              onClick={() => {
                playCyberClick(800);
                onOpenTalentModal();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-xs font-mono text-[#FF5A09] hover:border-[#FF5A09] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>APPLY AS TALENT</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {artistLineup.map((artist, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#090909] border border-[#1c1c1c] hover:border-[#E50914]/50 transition-all duration-300 group space-y-3"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative bg-black">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#E50914] font-bold">
                    0{idx + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold font-heading text-white uppercase group-hover:text-[#E50914] transition-colors">
                    {artist.name}
                  </h4>
                  <div className="text-xs font-mono text-[#FF5A09] mt-0.5">{artist.genre}</div>
                  <div className="text-[11px] font-mono text-[#777] mt-1">{artist.timeSlot}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY TEASER / PAST EPISODE PHOTOS (Polaroid Mini Grid) */}
        <div className="space-y-6 pt-4 border-t border-[#181818]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-[#FF5A09] uppercase">
                DOCUMENTATION ARCHIVE
              </div>
              <h3 className="text-2xl font-black font-heading text-white uppercase">
                POLAROID ARCHIVE // FLASH & 35MM
              </h3>
            </div>

            <button
              onClick={() => {
                playCyberClick(800);
                onOpenGallery();
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-[#E50914] hover:underline cursor-pointer"
            >
              <span>OPEN FULL ARCHIVE ({GALLERY_PHOTOS.length} SHOTS)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Polaroid Mini Grid with Random Rotation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {GALLERY_PHOTOS.slice(0, 4).map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => {
                  playCyberClick(900);
                  onOpenGallery();
                }}
                className={`bg-[#0d0d0d] p-3 pb-5 rounded-lg border border-[#222] hover:border-[#E50914] shadow-xl transform ${polaroidRotations[i % polaroidRotations.length]} hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer group`}
              >
                <div className="aspect-square bg-black overflow-hidden rounded mb-2">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="text-[11px] font-mono font-bold text-white truncate">
                  {photo.band}
                </div>
                <div className="text-[9px] font-mono text-[#777] truncate">
                  {photo.caption}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Action Footer */}
        <div className="p-8 rounded-2xl bg-[#090909] border border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-xl font-bold font-heading text-white uppercase">
              WANT THIS EPISODE IN YOUR HOMETOWN?
            </h4>
            <p className="text-xs font-mono text-[#888]">
              PROPOSE A CITY WAREHOUSE OR COLLABORATE WITH LOCAL SOUND CREWS
            </p>
          </div>

          <button
            onClick={() => {
              playCyberClick(800);
              onOpenRequestEventModal();
            }}
            className="px-5 py-3 rounded-lg bg-[#141414] hover:bg-[#FF5A09] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#262626] transition-colors cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>REQUEST EVENT IN YOUR CITY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
