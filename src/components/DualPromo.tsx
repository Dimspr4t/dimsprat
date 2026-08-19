import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Disc3, ShoppingBag, Sparkles, Play, Plus, Check, Star, Download, ExternalLink, ShieldCheck, Tag } from 'lucide-react';
import { PLUGINS_DATA, MERCH_DATA } from '../data/mockData.ts';
import { PluginItem, MerchItem } from '../types.ts';
import { playCyberClick } from '../utils/audioSynth.ts';

interface DualPromoProps {
  onOpenPluginDemo: (plugin: PluginItem) => void;
  onAddToCart: (item: MerchItem, size: string) => void;
}

export const DualPromo: React.FC<DualPromoProps> = ({ onOpenPluginDemo, onAddToCart }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Framer Motion useScroll for viewport entry tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'start 0.15'],
  });

  // Staggered scroll transforms for sections and cards
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  // Left Column (Plugins)
  const leftColOpacity = useTransform(scrollYProgress, [0.08, 0.35], [0, 1]);
  const leftColY = useTransform(scrollYProgress, [0.08, 0.35], [50, 0]);

  // Right Column (Merch) with slight asymmetric stagger
  const rightColOpacity = useTransform(scrollYProgress, [0.15, 0.42], [0, 1]);
  const rightColY = useTransform(scrollYProgress, [0.15, 0.42], [65, 0]);

  // Selected sizes for merch items
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'hoodie-cyber-grunge-01': 'L',
    'tee-acid-wash-02': 'M',
    'rig-tactical-bag-03': 'M',
  });

  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  const handleSelectSize = (itemId: string, size: string) => {
    playCyberClick(700);
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleAddMerch = (item: MerchItem) => {
    const size = selectedSizes[item.id] || item.sizes[0] || 'L';
    playCyberClick(1100);
    onAddToCart(item, size);
    setAddedItemNotification(item.id);
    setTimeout(() => {
      setAddedItemNotification(null);
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="plugins"
      className="relative py-24 bg-black border-b border-[#141414] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(229,9,20,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(255,90,9,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Scroll Reveal */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-12 border-b border-[#1a1a1a] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF5A09] uppercase">
                THE DUAL ARSENAL // SOFTWARE & TEXTILES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight uppercase">
              VISUAL SHADER TOOLS <span className="text-[#E50914]">&</span> CYBER STREETWEAR
            </h2>
          </div>

          <div className="text-xs font-mono text-[#888]">
            CROSS-POLLINATING GPU VISUAL ENGINES WITH PHYSICAL APPAREL
          </div>
        </motion.div>

        {/* 60:40 Asymmetric Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: PLUGINS PROMO (60% -> lg:col-span-7)                          */}
          {/* ========================================================================= */}
          <motion.div
            style={{ opacity: leftColOpacity, y: leftColY }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-[#E50914]/15 border border-[#E50914]/40 text-[#E50914]">
                  <Disc3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wide">
                    RESOLUME & OBS VISUAL PLUGINS
                  </h3>
                  <span className="text-xs font-mono text-[#888]">
                    FFGL 2.2 • OBS 30+ • TOUCHDESIGNER .TOX • WIRE SUITES
                  </span>
                </div>
              </div>

              <a
                href="https://plugins.dimsprat.com"
                onClick={(e) => {
                  e.preventDefault();
                  playCyberClick(800);
                  alert('Opening plugins.dimsprat.com catalog');
                }}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#E50914] hover:underline"
              >
                <span>PLUGINS HUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Plugin Cards */}
            <div className="space-y-4">
              {PLUGINS_DATA.map((plugin, idx) => (
                <div
                  key={plugin.id}
                  className="p-5 sm:p-6 rounded-xl bg-[#090909] border border-[#1f1f1f] hover:border-[#E50914]/50 transition-all duration-300 group shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {plugin.badge && (
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase border"
                            style={{
                              backgroundColor: `${plugin.accentColor}15`,
                              borderColor: `${plugin.accentColor}40`,
                              color: plugin.accentColor,
                            }}
                          >
                            {plugin.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-[#777]">
                          {plugin.version}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                          <Star className="w-3 h-3 fill-current text-amber-400" />
                          <span>{plugin.rating}</span>
                          <span className="text-[#666]">({plugin.downloads})</span>
                        </div>
                      </div>

                      <h4 className="text-xl font-black font-heading text-white tracking-wide group-hover:text-[#E50914] transition-colors">
                        {plugin.name}
                      </h4>

                      <p className="text-xs text-[#999] leading-relaxed">
                        {plugin.tagline}
                      </p>

                      {/* Features list */}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
                        {plugin.features.slice(0, 2).map((f, i) => (
                          <li key={i} className="text-[11px] font-mono text-[#bbb] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: plugin.accentColor }} />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price & Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1a1a1a]">
                      <div className="text-left sm:text-right">
                        <div className="text-2xl font-black font-heading text-white">
                          ${plugin.price}
                        </div>
                        <div className="text-[10px] font-mono text-[#777]">PERPETUAL LICENSE</div>
                      </div>

                      <button
                        onClick={() => {
                          playCyberClick(1000);
                          onOpenPluginDemo(plugin);
                        }}
                        className="py-2.5 px-4 rounded-lg bg-[#141414] hover:bg-[#E50914] border border-[#2a2a2a] hover:border-[#E50914] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md group-hover:bg-[#E50914]"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>LIVE DEMO</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1c1c1c] flex items-center justify-between text-xs font-mono text-[#888]">
              <span>ALL PLUGINS TESTED ON RESOLUME ARENA, OBS STUDIO, TOUCHDESIGNER, WIRE & SPOUT2</span>
              <span className="text-white font-bold">100% GPU ACCELERATED</span>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: MERCH PROMO (40% -> lg:col-span-5)                           */}
          {/* ========================================================================= */}
          <motion.div
            style={{ opacity: rightColOpacity, y: rightColY }}
            id="merch"
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-[#FF5A09]/15 border border-[#FF5A09]/40 text-[#FF5A09]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wide">
                    CYBER-STREETWEAR DROP
                  </h3>
                  <span className="text-xs font-mono text-[#888]">
                    HEAVYWEIGHT TEXTILES • RAW DISTRESS FINISH
                  </span>
                </div>
              </div>

              <a
                href="https://merch.dimsprat.com"
                onClick={(e) => {
                  e.preventDefault();
                  playCyberClick(800);
                  alert('Opening merch.dimsprat.com store');
                }}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#FF5A09] hover:underline"
              >
                <span>MERCH HUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Merch Products List */}
            <div className="space-y-4">
              {MERCH_DATA.map((merch) => (
                <div
                  key={merch.id}
                  className="p-4 sm:p-5 rounded-xl bg-[#090909] border border-[#1f1f1f] hover:border-[#FF5A09]/50 transition-all duration-300 group shadow-lg"
                >
                  <div className="flex gap-4">
                    {/* Product Photo */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg bg-black overflow-hidden border border-[#222] shrink-0">
                      <img
                        src={merch.image}
                        alt={merch.name}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                      {merch.isLimited && (
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#E50914] text-white text-[9px] font-mono font-bold uppercase">
                          LIMITED
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#777]">{merch.code}</span>
                          <span className="text-base font-black font-heading text-white">
                            ${merch.price} USD
                          </span>
                        </div>
                        <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wide truncate mt-0.5">
                          {merch.name}
                        </h4>
                        <div className="text-[11px] font-mono text-[#888] line-clamp-1 mt-1">
                          {merch.specs[0]}
                        </div>
                      </div>

                      {/* Size Selector & Add to Bag */}
                      <div className="pt-2 space-y-2">
                        {merch.sizes.length > 1 && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono text-[#666]">SIZE:</span>
                            {merch.sizes.map((s) => (
                              <button
                                key={s}
                                onClick={() => handleSelectSize(merch.id, s)}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                                  (selectedSizes[merch.id] || merch.sizes[0]) === s
                                    ? 'bg-[#FF5A09] text-white'
                                    : 'bg-[#141414] text-[#777] hover:text-white border border-[#222]'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => handleAddMerch(merch)}
                          className="w-full py-2 px-3 rounded bg-[#161616] hover:bg-[#FF5A09] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {addedItemNotification === merch.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" /> ADDED TO BAG
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" /> ADD TO BAG (${merch.price})
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guaranteed Quality Tag */}
            <div className="p-4 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a] flex items-center gap-3 text-xs font-mono text-[#777]">
              <ShieldCheck className="w-5 h-5 text-[#FF5A09] shrink-0" />
              <span>CUSTOM ACID-WASHED HEAVYWEIGHT GSM WITH ZERO SHRINKAGE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
