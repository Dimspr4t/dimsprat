'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check, Shield, Globe, Instagram, Github, Youtube, Music, Radio, Sparkles } from 'lucide-react';
import { playCyberClick, playSuccessChime } from '../utils/audioSynth.ts';

interface FooterProps {
  onOpenTalentModal: () => void;
  onOpenRequestEventModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTalentModal,
  onOpenRequestEventModal,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const socialLinks = [
    { name: 'INSTAGRAM', handle: '@dimsprat_official', url: 'https://instagram.com' },
    { name: 'DISCORD', handle: 'Underground Vault #7', url: 'https://discord.com' },
    { name: 'SPOTIFY', handle: 'DIM$PRAT Curated', url: 'https://spotify.com' },
    { name: 'GITHUB', handle: 'dimsprat-visuals', url: 'https://github.com' },
    { name: 'SOUNDCLOUD', handle: 'dimsprat-unreleased', url: 'https://soundcloud.com' },
    { name: 'YOUTUBE', handle: 'DIM$PRAT Live Sets', url: 'https://youtube.com' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playSuccessChime();
    setIsSubscribed(true);
  };

  return (
    <footer id="contact" className="relative bg-[#050505] border-t border-[#1a1a1a] text-white font-mono pt-16 pb-12 overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#E50914]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Top Row: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E50914] flex items-center justify-center font-heading font-black text-white text-base">
                D$
              </div>
              <span className="font-heading font-black text-2xl tracking-wider text-white">
                DIM$PRAT
              </span>
            </div>

            <p className="text-xs text-[#888] font-sans leading-relaxed max-w-sm">
              Independent underground music movement, GPU visual plugin engineering for Resolume Arena & OBS Studio, and limited edition dark cyber-streetwear collective based in Jakarta / Bandung.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[11px] text-[#aaa]">NETWORK STATUS: ONLINE & OPERATIONAL</span>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => {
                  playCyberClick(800);
                  onOpenTalentModal();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#282828] hover:border-[#E50914] text-xs text-white transition-colors cursor-pointer"
              >
                + JOIN AS TALENT
              </button>
              <button
                onClick={() => {
                  playCyberClick(800);
                  onOpenRequestEventModal();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#282828] hover:border-[#FF5A09] text-xs text-white transition-colors cursor-pointer"
              >
                REQUEST CITY EVENT
              </button>
            </div>
          </div>

          {/* Socials & Ecosystem Subdomains (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#888]">
              OFFICIAL CHANNELS & VAULT
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playCyberClick(700)}
                  className="p-2.5 rounded-lg bg-[#0e0e0e] hover:bg-[#161616] border border-[#1e1e1e] hover:border-[#333] text-[#aaa] hover:text-white transition-all group block"
                >
                  <div className="text-[10px] text-[#666] group-hover:text-[#E50914] transition-colors">{s.name}</div>
                  <div className="font-sans text-xs text-white font-medium truncate">{s.handle}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#888]">
              UNDERGROUND BULLETIN
            </h4>
            <p className="text-xs text-[#777] font-sans">
              Subscribe for unreleased audio stems, private secret drops, and early-bird ticket links.
            </p>

            {isSubscribed ? (
              <div className="p-3.5 rounded-xl bg-[#0f2413] border border-[#1e5229] flex items-center gap-2 text-xs text-[#22c55e]">
                <Check className="w-4 h-4 shrink-0" />
                <span>Subscribed to bulletin successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#262626] text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#E50914]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer box-glow-red"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SUBSCRIBE</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#171717] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666]">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} DIM$PRAT. ALL RIGHTS RESERVED.</span>
            <span>NON-CONFORMIST AUDIO & APPAREL.</span>
          </div>

          <div className="flex items-center gap-4 text-[#888]">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">TERMS OF USE</a>
            <a href="#license" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">LICENSE VERIFIER</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
