import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Send, Music2, Sparkles, CheckCircle2, ShieldAlert, Disc3, HardDrive } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TalentApplication } from '../../types.ts';
import { playCyberClick, playSuccessChime } from '../../utils/audioSynth.ts';

interface TalentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: TalentApplication) => void;
}

export const TalentModal: React.FC<TalentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<TalentApplication>({
    talentName: '',
    genre: 'SLUDGE / DOOM METAL',
    contactEmail: '',
    phone: '',
    city: 'Jakarta',
    socialLink: '',
    audioDemoUrl: '',
    techRiderNotes: '',
  });

  const [membersCount, setMembersCount] = useState('4');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diskProgress, setDiskProgress] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDiskProgress(15);
    playCyberClick(1100);

    const interval = setInterval(() => {
      setDiskProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            playSuccessChime();
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#E50914', '#FF5A09', '#ffffff'],
            });
            if (onSuccess) {
              onSuccess(formData);
            }
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 180);
  };

  const handleReset = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setDiskProgress(0);
    setFormData({
      talentName: '',
      genre: 'SLUDGE / DOOM METAL',
      contactEmail: '',
      phone: '',
      city: 'Jakarta',
      socialLink: '',
      audioDemoUrl: '',
      techRiderNotes: '',
    });
    onClose();
  };

  // Helper for floppy diskette visual progress bar string
  const totalBlocks = 20;
  const filledBlocks = Math.round((diskProgress / 100) * totalBlocks);
  const progressStr = `[${'='.repeat(filledBlocks)}${'>'.repeat(filledBlocks < totalBlocks && filledBlocks > 0 ? 1 : 0)}${' '.repeat(Math.max(0, totalBlocks - filledBlocks - (filledBlocks < totalBlocks && filledBlocks > 0 ? 1 : 0)))}]`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#090909] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl my-auto"
        >
          {/* Top banner accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#E50914] via-[#FF5A09] to-[#E50914]" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a] bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914]">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#E50914] uppercase">
                  RETRO-TERMINAL AUDITION // ROSTER CALL
                </span>
                <h3 className="text-xl font-bold font-heading tracking-wide text-white">
                  JOIN AS LEAD / TALENT // EPS.2 & BEYOND
                </h3>
              </div>
            </div>

            <button
              id="close-talent-modal-btn"
              onClick={() => {
                playCyberClick(500);
                onClose();
              }}
              className="p-2 rounded-lg text-[#777] hover:text-white hover:bg-[#1c1c1c] border border-transparent hover:border-[#333] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center mx-auto text-[#E50914]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono px-3 py-1 rounded bg-[#161616] text-[#FF5A09] border border-[#2a2a2a]">
                  TRANSMISSION WRITTEN TO DISKETTE SECTOR #07 // AUD-2026-X
                </span>
                <h4 className="text-2xl font-bold font-heading text-white uppercase">
                  AUDITION PROFILE RECEIVED FOR {formData.talentName || 'ACT'}
                </h4>
                <p className="text-sm text-[#8a8a8a] max-w-md mx-auto">
                  Our sound curation engineers at DIM$PRAT will review your audio demo within 48 hours. Expect an encrypted performance brief via email or WhatsApp.
                </p>
              </div>
              <div className="pt-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#ff1e29] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg box-glow-red transition-all cursor-pointer"
                >
                  DISMISS & RETURN
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="p-3 rounded-xl bg-[#121212] border border-[#1e1e1e] flex items-start gap-3 text-xs text-[#8a8a8a] font-mono">
                <ShieldAlert className="w-4 h-4 text-[#FF5A09] shrink-0 mt-0.5" />
                <span>
                  Seeking heavy sonic acts (Metal, Hardcore, Industrial, Sludge, Live Modular Synth). Live performance capability is strictly required.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Talent Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    BAND / ACT NAME <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.talentName}
                    onChange={(e) => setFormData({ ...formData, talentName: e.target.value })}
                    placeholder="e.g. SILICON GRAVE"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>

                {/* Genre Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    PRIMARY GENRE <span className="text-[#E50914]">*</span>
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors"
                  >
                    <option value="SLUDGE / DOOM METAL">SLUDGE / DOOM METAL</option>
                    <option value="CYBER INDUSTRIAL / EBM">CYBER INDUSTRIAL / EBM</option>
                    <option value="HARDCORE / DEATHCORE">HARDCORE / DEATHCORE</option>
                    <option value="HARSH NOISE / MODULAR SYNTH">HARSH NOISE / MODULAR SYNTH</option>
                    <option value="POST-ROCK / SHOEGAZE">POST-ROCK / SHOEGAZE</option>
                    <option value="EXPERIMENTAL METAL">EXPERIMENTAL METAL</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    CONTACT EMAIL <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="mgmt@yourband.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    WHATSAPP PHONE <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+62 812-XXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>

                {/* City / Base */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    ORIGIN CITY <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Jakarta / Bandung"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>
              </div>

              {/* Demo URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase flex items-center justify-between">
                  <span>AUDIO DEMO / SPOTIFY / SOUNDCLOUD / YOUTUBE LINK <span className="text-[#E50914]">*</span></span>
                  <Music2 className="w-3.5 h-3.5 text-[#E50914]" />
                </label>
                <input
                  type="url"
                  required
                  value={formData.audioDemoUrl}
                  onChange={(e) => setFormData({ ...formData, audioDemoUrl: e.target.value })}
                  placeholder="https://soundcloud.com/... or https://open.spotify.com/..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914] transition-colors"
                />
              </div>

              {/* Tech Rider Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                  STAGE & TECH RIDER BRIEF (GUITAR AMPS, DRUM RIG, DI BOXES)
                </label>
                <textarea
                  rows={2}
                  value={formData.techRiderNotes}
                  onChange={(e) => setFormData({ ...formData, techRiderNotes: e.target.value })}
                  placeholder="e.g. 2x High-Gain Guitar Heads, 1x 8x10 Bass Cab, IEM transmitters..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914] transition-colors resize-none"
                />
              </div>

              {/* DISKETTE RETRO PROGRESS BAR WHEN SUBMITTING (Sesuai spesifikasi prompt) */}
              {isSubmitting && (
                <div className="p-4 rounded-xl bg-black border border-[#E50914] space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#E50914]">
                    <span className="flex items-center gap-1.5">
                      <HardDrive className="w-4 h-4 animate-pulse" />
                      FLOPPY DISKETTE SECTOR WRITE
                    </span>
                    <span>{diskProgress}%</span>
                  </div>
                  <div className="text-emerald-400 font-bold tracking-widest break-all">
                    {progressStr}
                  </div>
                  <div className="text-[10px] text-[#666]">
                    WRITING TALENT DATA TO SECTOR 0x7F49 // 1.44MB RETRO BUFFER
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.99] text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg box-glow-red transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT TALENT AUDITION TO DIM$PRAT</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
