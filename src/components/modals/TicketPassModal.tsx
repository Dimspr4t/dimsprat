import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Ticket, Check, ShieldCheck, Download, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FEATURED_EVENT } from '../../data/mockData.ts';
import { playCyberClick, playSuccessChime } from '../../utils/audioSynth.ts';

interface TicketPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({ isOpen, onClose }) => {
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [ticketType, setTicketType] = useState<'STANDARD' | 'VIP_MOSHPIT' | 'ALL_ACCESS'>('VIP_MOSHPIT');
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    playCyberClick(1100);

    setTimeout(() => {
      const generatedId = `DMS-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
      setIsProcessing(false);
      setHasClaimed(true);
      playSuccessChime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E50914', '#FF5A09', '#ffffff'],
      });
    }, 700);
  };

  const handleReset = () => {
    setHasClaimed(false);
    setAttendeeName('');
    setAttendeeEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#0a0a0a] border border-[#262626] rounded-xl overflow-hidden shadow-2xl my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c1c1c] bg-[#070707]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914]">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#E50914] uppercase">
                  OFFICIAL ACCESS PASS PORTAL
                </span>
                <h3 className="text-lg font-bold font-heading tracking-wide text-white">
                  ROCK & METAL NIGHT EPS.2 // SECURE ENTRY
                </h3>
              </div>
            </div>

            <button
              id="close-ticket-modal-btn"
              onClick={() => {
                playCyberClick(500);
                onClose();
              }}
              className="p-2 rounded-lg text-[#777] hover:text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {hasClaimed ? (
            <div className="p-6 space-y-5">
              {/* Digital Grunge Ticket Pass */}
              <div className="relative bg-[#111] border-2 border-dashed border-[#E50914] rounded-xl p-5 overflow-hidden shadow-2xl">
                {/* Left/Right ticket notches */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#0a0a0a] border border-[#262626] transform -translate-y-1/2" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#0a0a0a] border border-[#262626] transform -translate-y-1/2" />

                <div className="flex items-start justify-between border-b border-[#222] pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#E50914] font-bold tracking-widest uppercase">
                      DIM$PRAT UNDERGROUND VAULT ACCESS
                    </span>
                    <h4 className="text-xl font-black font-heading text-white tracking-wide">
                      {FEATURED_EVENT.title}
                    </h4>
                    <p className="text-xs text-[#888] font-mono mt-0.5">
                      {FEATURED_EVENT.date} • {FEATURED_EVENT.venue}
                    </p>
                  </div>
                  <div className="p-2 rounded bg-black border border-[#333] text-[#E50914]">
                    <QrCode className="w-10 h-10" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-[#222] text-xs font-mono">
                  <div>
                    <div className="text-[10px] text-[#666]">ATTENDEE</div>
                    <div className="font-bold text-white uppercase truncate">{attendeeName || 'UNDERGROUND SOUL'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#666]">PASS TIER</div>
                    <div className="font-bold text-[#FF5A09] uppercase">{ticketType}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#666]">GATE</div>
                    <div className="font-bold text-white">VAULT-SECTOR 7</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#666]">PASS ID</div>
                    <div className="font-bold text-[#E50914] font-mono">{ticketId}</div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[#777]">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED DIGITAL TICKET
                  </span>
                  <span>STATUS: ADMIT ONE</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    playCyberClick(1200);
                    alert(`Digital pass #${ticketId} saved to your device. Show this QR code at The Bunker Vault gate.`);
                  }}
                  className="flex-1 py-2.5 rounded bg-[#E50914] hover:bg-[#ff1e29] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#E50914]/25 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> SAVE PASS ASSET
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded bg-[#161616] hover:bg-[#222] border border-[#2a2a2a] text-xs font-mono text-[#ccc] transition-colors cursor-pointer"
                >
                  DONE
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleClaim} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                  FULL NAME / ALIAS <span className="text-[#E50914]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  placeholder="e.g. Alex Metalhead"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                  EMAIL FOR PASS DELIVERY <span className="text-[#E50914]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  placeholder="attendee@underground.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                  ACCESS TIER
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'STANDARD', label: 'GENERAL ENTRY', price: 'IDR 150K' },
                    { id: 'VIP_MOSHPIT', label: 'MOSHPIT PIT-PASS', price: 'IDR 200K' },
                    { id: 'ALL_ACCESS', label: 'BACKSTAGE + MERCH', price: 'IDR 350K' },
                  ].map((tier) => (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => {
                        playCyberClick(800);
                        setTicketType(tier.id as typeof ticketType);
                      }}
                      className={`p-2.5 rounded-lg border text-left font-mono transition-all cursor-pointer ${
                        ticketType === tier.id
                          ? 'bg-[#E50914]/15 border-[#E50914] text-white'
                          : 'bg-[#121212] border-[#222] text-[#888] hover:border-[#333]'
                      }`}
                    >
                      <div className="text-[10px] text-[#aaa] truncate">{tier.label}</div>
                      <div className="text-xs font-bold text-white mt-1">{tier.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-lg bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.99] text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Ticket className="w-4 h-4" /> GENERATE OFFICIAL DIGITAL PASS
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
