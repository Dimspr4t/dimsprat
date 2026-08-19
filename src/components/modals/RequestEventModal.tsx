import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Send, Flame, CheckCircle2, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventRequestProposal } from '../../types.ts';
import { playCyberClick, playSuccessChime } from '../../utils/audioSynth.ts';

interface RequestEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: EventRequestProposal) => void;
}

export const RequestEventModal: React.FC<RequestEventModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<EventRequestProposal>({
    proposerName: '',
    email: '',
    targetCity: 'Bandung',
    proposedVenue: '',
    estimatedAttendees: '250 - 500 Souls',
    preferredMonth: 'Q4 2026',
    proposedLineupIdeas: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playCyberClick(1200);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSuccessChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5A09', '#E50914', '#ffffff'],
      });
      if (onSuccess) {
        onSuccess(formData);
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
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
          className="relative w-full max-w-2xl bg-[#090909] border border-[#262626] rounded-xl overflow-hidden shadow-2xl my-auto"
        >
          {/* Top amber/crimson accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FF5A09] via-[#E50914] to-[#FF5A09]" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a] bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#FF5A09]/10 border border-[#FF5A09]/30 text-[#FF5A09]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#FF5A09] uppercase">
                  COMMUNITY EXPANSION // CITY PROPOSAL
                </span>
                <h3 className="text-xl font-bold font-heading tracking-wide text-white">
                  REQUEST NEW EVENT // BRING THE UNDERGROUND TO YOUR CITY
                </h3>
              </div>
            </div>

            <button
              id="close-request-modal-btn"
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
              <div className="w-16 h-16 rounded-full bg-[#FF5A09]/20 border border-[#FF5A09] flex items-center justify-center mx-auto text-[#FF5A09]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono px-3 py-1 rounded bg-[#161616] text-[#FF5A09] border border-[#2a2a2a]">
                  PROPOSAL LOGGED // SECTOR: {formData.targetCity.toUpperCase()}
                </span>
                <h4 className="text-2xl font-bold font-heading text-white uppercase">
                  EVENT INITIATION RECORDED
                </h4>
                <p className="text-sm text-[#8a8a8a] max-w-md mx-auto">
                  Thank you, {formData.proposerName || 'Organizer'}. When enough community requests accumulate for {formData.targetCity}, our production scouts will contact you to coordinate venue scouting and local lineups.
                </p>
              </div>
              <div className="pt-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded bg-[#FF5A09] hover:bg-[#ff6e26] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-[#FF5A09]/30 transition-all cursor-pointer"
                >
                  DONE & RETURN TO PORTAL
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="p-3 rounded-lg bg-[#121212] border border-[#1e1e1e] flex items-start gap-3 text-xs text-[#8a8a8a] font-mono">
                <Flame className="w-4 h-4 text-[#FF5A09] shrink-0 mt-0.5" />
                <span>
                  DIM$PRAT tours with custom high-pressure sound walls, lighting rigs, and merchandise pop-ups. We prioritize industrial warehouses, underground bunker basements, and raw outdoor amphitheatres.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Proposer Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    YOUR NAME / COLLECTIVE <span className="text-[#FF5A09]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.proposerName}
                    onChange={(e) => setFormData({ ...formData, proposerName: e.target.value })}
                    placeholder="e.g. Renaldi / Void Society"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#FF5A09] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    EMAIL ADDRESS <span className="text-[#FF5A09]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="organizer@network.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#FF5A09] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Target City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    TARGET CITY / REGION <span className="text-[#FF5A09]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.targetCity}
                    onChange={(e) => setFormData({ ...formData, targetCity: e.target.value })}
                    placeholder="e.g. Bandung, Surabaya, Bali, Jogja, Singapore"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#FF5A09] transition-colors"
                  />
                </div>

                {/* Estimated Crowd */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                    ESTIMATED ATTENDEES <span className="text-[#FF5A09]">*</span>
                  </label>
                  <select
                    value={formData.estimatedAttendees}
                    onChange={(e) => setFormData({ ...formData, estimatedAttendees: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white text-sm focus:outline-none focus:border-[#FF5A09] transition-colors"
                  >
                    <option value="150 - 300 Souls">150 - 300 Souls (Intimate Basement)</option>
                    <option value="300 - 600 Souls">300 - 600 Souls (Warehouse Scale)</option>
                    <option value="600 - 1,200+ Souls">600 - 1,200+ Souls (Industrial Complex / Open Air)</option>
                  </select>
                </div>
              </div>

              {/* Proposed Venue */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase flex items-center justify-between">
                  <span>POTENTIAL VENUE OR WAREHOUSE LOCATION</span>
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A09]" />
                </label>
                <input
                  type="text"
                  value={formData.proposedVenue}
                  onChange={(e) => setFormData({ ...formData, proposedVenue: e.target.value })}
                  placeholder="e.g. Sub-Level 3 Factory Yard / Spasial Hall"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#FF5A09] transition-colors"
                />
              </div>

              {/* Lineup Ideas */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#aaa] tracking-wider uppercase">
                  SUGGESTED LOCAL BANDS / COLLABORATING ACTS
                </label>
                <textarea
                  rows={3}
                  value={formData.proposedLineupIdeas}
                  onChange={(e) => setFormData({ ...formData, proposedLineupIdeas: e.target.value })}
                  placeholder="List local metal, sludge, or electronic noise bands who should play..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#FF5A09] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-[#FF5A09] hover:bg-[#ff6f26] active:scale-[0.99] text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#FF5A09]/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> DISPATCH EVENT PROPOSAL TO PRODUCTION
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
