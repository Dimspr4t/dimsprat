import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Ticket, Check, ShieldCheck, QrCode, CreditCard, 
  Smartphone, Wallet, Download, CheckCircle2, ArrowRight, 
  Sparkles, RefreshCw, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventItem } from '../../types.ts';
import { playCyberClick, playSuccessChime } from '../../utils/audioSynth.ts';

interface EventCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  initialTier?: string;
}

export const EventCheckoutModal: React.FC<EventCheckoutModalProps> = ({
  isOpen,
  onClose,
  event,
  initialTier = 'presale-1',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTier, setSelectedTier] = useState<string>(initialTier);
  const [quantity, setQuantity] = useState<number>(1);

  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'CARD' | 'CRYPTO' | 'VA'>('QRIS');

  // Checkout outcome
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [isDoorScanned, setIsDoorScanned] = useState(false);

  if (!isOpen || !event) return null;

  const tierDetails: Record<string, { name: string; priceUSD: number; priceIDR: string }> = {
    'early-bird': { name: 'EARLY BIRD PASS', priceUSD: 15, priceIDR: '120.000' },
    'presale-1': { name: 'PRESALE 1 ENTRY', priceUSD: 25, priceIDR: '200.000' },
    'vip-pass': { name: 'VIP ALL-ACCESS + MERCH', priceUSD: 50, priceIDR: '380.000' },
  };

  const currentTier = tierDetails[selectedTier] || tierDetails['presale-1'];
  const totalAmountUSD = currentTier.priceUSD * quantity;
  const totalAmountIDR = (currentTier.priceUSD * quantity * 16000).toLocaleString('id-ID');

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playCyberClick(900);

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!customerName || !customerEmail) return;
      setStep(3);
    } else if (step === 3) {
      setIsProcessing(true);
      playCyberClick(1200);

      setTimeout(() => {
        const generatedQr = `DMS-QR-${Math.floor(10000000 + Math.random() * 90000000)}`;
        setTicketId(generatedQr);
        setIsProcessing(false);
        setStep(4);
        playSuccessChime();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E50914', '#FF5A09', '#ffffff'],
        });
      }, 900);
    }
  };

  const handleSimulateDoorScan = () => {
    playCyberClick(1300);
    setIsDoorScanned(true);
    playSuccessChime();
  };

  const handleReset = () => {
    setStep(1);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setIsDoorScanned(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#090909] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl my-auto font-sans"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#1c1c1c] bg-[#0c0c0c] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#E50914]/15 border border-[#E50914]/40 text-[#E50914]">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#E50914] uppercase">
                  CHECKOUT // {event.episode}
                </span>
                <h3 className="text-lg font-bold font-heading text-white truncate max-w-md">
                  {event.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                playCyberClick(500);
                handleReset();
              }}
              className="p-2 rounded-lg text-[#777] hover:text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 border-b border-[#181818] bg-[#070707] text-[11px] font-mono">
            {[
              { num: 1, label: 'TIER' },
              { num: 2, label: 'ATTENDEE' },
              { num: 3, label: 'PAYMENT' },
              { num: 4, label: 'E-TICKET' },
            ].map((s) => (
              <div
                key={s.num}
                className={`py-2 text-center border-r last:border-r-0 border-[#181818] transition-colors ${
                  step >= s.num
                    ? 'text-white bg-[#E50914]/10 font-bold border-b-2 border-b-[#E50914]'
                    : 'text-[#555]'
                }`}
              >
                0{s.num}. {s.label}
              </div>
            ))}
          </div>

          <div className="p-6">
            {/* STEP 1: TIER CONFIRMATION */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#888] uppercase">CONFIRM ACCESS CATEGORY</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(tierDetails).map(([key, details]) => (
                      <div
                        key={key}
                        onClick={() => {
                          playCyberClick(700);
                          setSelectedTier(key);
                        }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          selectedTier === key
                            ? 'bg-[#141414] border-[#E50914] text-white shadow-lg'
                            : 'bg-[#0f0f0f] border-[#222] text-[#777] hover:border-[#333]'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-[#E50914] font-bold uppercase">{details.name}</div>
                        <div className="text-base font-black font-heading text-white mt-1">${details.priceUSD} USD</div>
                        <div className="text-[10px] font-mono text-[#666]">IDR {details.priceIDR}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e0e0e] border border-[#1f1f1f] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#aaa]">QUANTITY:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        playCyberClick(500);
                        setQuantity(Math.max(1, quantity - 1));
                      }}
                      className="w-7 h-7 rounded bg-[#181818] hover:bg-[#222] text-white font-mono flex items-center justify-center font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-white text-sm w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => {
                        playCyberClick(500);
                        setQuantity(Math.min(4, quantity + 1));
                      }}
                      className="w-7 h-7 rounded bg-[#181818] hover:bg-[#222] text-white font-mono flex items-center justify-center font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-[#222] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#888]">TOTAL ORDER:</span>
                  <span className="text-lg font-black font-heading text-white">${totalAmountUSD} USD (IDR {totalAmountIDR})</span>
                </div>

                <button
                  onClick={() => handleNextStep()}
                  className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>CONTINUE TO ATTENDEE DATA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: ATTENDEE DATA */}
            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] uppercase">
                    FULL NAME (LEGAL ID MATCH) <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Dimas Pratama"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] uppercase">
                    EMAIL ADDRESS FOR E-TICKET QR <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="dimas@dimsprat.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaa] uppercase">
                    WHATSAPP / PHONE NUMBER (SMS BACKUP)
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+62 812-XXXX-XXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div className="p-3 rounded-lg bg-[#121212] border border-[#1f1f1f] text-[11px] font-mono text-[#777]">
                  Door security requires matching photo ID upon entry scan.
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-xl bg-[#141414] hover:bg-[#1e1e1e] text-xs font-mono text-[#aaa] cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>PROCEED TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#888] uppercase">SELECT PAYMENT METHOD</div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'QRIS', label: 'QRIS INSTANT (GO-PAY/OVO/BCA)', icon: Smartphone },
                      { id: 'CARD', label: 'CREDIT / DEBIT CARD', icon: CreditCard },
                      { id: 'VA', label: 'VIRTUAL ACCOUNT (ALL BANKS)', icon: RefreshCw },
                      { id: 'CRYPTO', label: 'WEB3 CRYPTO (USDT / ETH)', icon: Wallet },
                    ].map((pm) => {
                      const Icon = pm.icon;
                      return (
                        <div
                          key={pm.id}
                          onClick={() => {
                            playCyberClick(700);
                            setPaymentMethod(pm.id as typeof paymentMethod);
                          }}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                            paymentMethod === pm.id
                              ? 'bg-[#141414] border-[#E50914] text-white'
                              : 'bg-[#0e0e0e] border-[#222] text-[#777] hover:border-[#333]'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-[#E50914] shrink-0" />
                          <span className="text-xs font-mono font-bold">{pm.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* QRIS / Simulated Gateway preview */}
                <div className="p-4 rounded-xl bg-black border border-[#222] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#777]">TRANSACTION TOTAL</div>
                    <div className="text-xl font-black font-heading text-white">${totalAmountUSD} USD (IDR {totalAmountIDR})</div>
                    <div className="text-[10px] font-mono text-[#E50914]">NO ADMIN FEES // ZERO HIDDEN SURCHARGES</div>
                  </div>
                  <div className="p-2 rounded bg-[#111] border border-[#333] text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-BIT ENCRYPTION
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-3 rounded-xl bg-[#141414] hover:bg-[#1e1e1e] text-xs font-mono text-[#aaa] cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => handleNextStep()}
                    disabled={isProcessing}
                    className="flex-1 py-3.5 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" /> VERIFYING TRANSACTION ON LEDGER...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" /> AUTHORIZE PAYMENT (${totalAmountUSD})
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: OUTPUT DIGITAL E-TICKET PASS WITH UNIQUE QR CODE */}
            {step === 4 && (
              <div className="space-y-6">
                {/* Official Ticket Graphic */}
                <div className="relative bg-[#111] border-2 border-dashed border-[#E50914] rounded-2xl p-6 overflow-hidden shadow-2xl">
                  {/* Left & Right Notches */}
                  <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-[#090909] border border-[#222] -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#090909] border border-[#222] -translate-y-1/2" />

                  <div className="flex items-start justify-between border-b border-[#222] pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#E50914] font-bold uppercase tracking-widest">
                        DIM$PRAT EVENTS // OFFICIAL DIGITAL ADMISSION
                      </span>
                      <h4 className="text-2xl font-black font-heading text-white uppercase tracking-wide">
                        {event.title}
                      </h4>
                      <p className="text-xs font-mono text-[#888] mt-0.5">
                        {event.date} • {event.venue}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black border border-[#333] text-[#E50914] shadow-inner">
                      <QrCode className="w-12 h-12" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-[#222] text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-[#666]">ATTENDEE</div>
                      <div className="font-bold text-white uppercase truncate">{customerName || 'DIMAS PRATAMA'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666]">PASS CATEGORY</div>
                      <div className="font-bold text-[#FF5A09] uppercase">{currentTier.name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666]">QUANTITY</div>
                      <div className="font-bold text-white">{quantity} ADMIT</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666]">TOKEN ID</div>
                      <div className="font-bold text-[#E50914]">{ticketId}</div>
                    </div>
                  </div>

                  {/* Status & Door Scanner Simulator */}
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      {isDoorScanned ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> CHECKED-IN AT SECTOR 7 GATE
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" /> VALID E-TICKET (UNSCANNED)
                        </span>
                      )}
                    </div>

                    {!isDoorScanned && (
                      <button
                        onClick={handleSimulateDoorScan}
                        className="px-2.5 py-1 rounded bg-[#181818] hover:bg-[#252525] text-[10px] text-[#aaa] hover:text-white border border-[#2a2a2a] cursor-pointer"
                      >
                        [TEST DOOR SCANNER]
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      playCyberClick(1200);
                      alert(`Downloading official pass token #${ticketId} (PDF/Apple Wallet asset)`);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>SAVE TICKET PASS ASSET</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-xs font-mono text-[#ccc] border border-[#262626] cursor-pointer"
                  >
                    DONE & CLOSE
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
