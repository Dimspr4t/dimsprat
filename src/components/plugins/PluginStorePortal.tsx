import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Terminal, 
  Cpu, 
  Code, 
  Sliders, 
  Key, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  ExternalLink,
  Star,
  Download
} from 'lucide-react';
import { PLUGINS_DATA } from '../../data/mockData.ts';
import { PluginItem } from '../../types.ts';
import { playCyberClick } from '../../utils/audioSynth.ts';

interface PluginStorePortalProps {
  onSelectPlugin: (plugin: PluginItem, initialTab?: 'overview' | 'playground' | 'docs') => void;
  onOpenCheckout: (plugin: PluginItem) => void;
  onOpenCmdK: () => void;
  onReturnToMainHub: () => void;
}

export const PluginStorePortal: React.FC<PluginStorePortalProps> = ({
  onSelectPlugin,
  onOpenCheckout,
  onOpenCmdK,
  onReturnToMainHub,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFramework, setSelectedFramework] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'RESOLUME ARENA', 'OBS STUDIO', 'TOUCHDESIGNER', 'LIVE VJ & STAGE'];
  const frameworks = ['ALL', 'Resolume Arena 7+', 'OBS Studio 30+', 'TouchDesigner', 'FFGL 2.2', 'Spout2 / NDI'];

  // Filter plugins
  const filteredPlugins = PLUGINS_DATA.filter((p) => {
    const matchCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchFramework = selectedFramework === 'ALL' || p.frameworks.some((f) => f.includes(selectedFramework));
    const matchSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.packageNpm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchFramework && matchSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white font-mono pt-20 pb-28">
      {/* Top Banner / Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] text-[#888]">
          <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
          <span>OFFICIAL VISUAL & SHADER REGISTRY // v3.2</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight uppercase max-w-4xl mx-auto leading-tight">
          REALTIME VISUAL & AUDIO PLUGINS FOR STAGE, BROADCAST & DAWs.
        </h1>

        <p className="text-sm sm:text-base text-[#888] font-sans max-w-2xl mx-auto leading-relaxed">
          Hardware-accelerated FFGL shaders, OBS native filters, TouchDesigner .TOX operators, and VST/AU audio-visual bridges engineered for high-octane live stage concerts and broadcasts.
        </p>

        {/* Global Technical Specifications Strip */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0e0e0e] border border-[#222] text-left text-xs font-mono">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded bg-[#E50914]/15 text-[#E50914] border border-[#E50914]/30 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[#777] uppercase tracking-wider font-bold">COMPATIBLE HOSTS & DAWs:</div>
              <div className="text-white font-medium text-[11px] mt-0.5">
                Ableton Live 11/12 • Resolume Arena 7+ • OBS Studio 30+ • TouchDesigner 099 • FL Studio • Reaper
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded bg-[#FF5A09]/15 text-[#FF5A09] border border-[#FF5A09]/30 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[#777] uppercase tracking-wider font-bold">FORMAT STANDARDS SUPPORTED:</div>
              <div className="text-white font-medium text-[11px] mt-0.5">
                VST3 • AU • CLAP • FFGL 2.2 • OBS C++ Plugin • Wire Patch • Spout2 / NDI 5.5
              </div>
            </div>
          </div>
        </div>

        {/* Centralized Search Bar (CMD+K Trigger) */}
        <div className="max-w-xl mx-auto pt-2">
          <div
            onClick={() => {
              playCyberClick(800);
              onOpenCmdK();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0c0c0c] hover:bg-[#121212] border border-[#242424] hover:border-[#E50914] text-xs text-[#666] hover:text-[#bbb] shadow-2xl transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-[#E50914]" />
              <span className="font-sans">Search visual/audio plugins, VST, FFGL, OBS filters, .wire patches...</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded bg-[#1c1c1c] text-[10px] text-[#888] border border-[#2a2a2a] group-hover:text-white">
                ⌘K
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#1c1c1c]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playCyberClick(700);
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#181818] text-[#E50914] font-bold border border-[#E50914]/40'
                  : 'text-[#777] hover:text-white hover:bg-[#111]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Framework Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-[11px] text-[#777]">
          <span className="uppercase text-[#555] shrink-0">FRAMEWORKS:</span>
          {frameworks.map((fw) => (
            <button
              key={fw}
              onClick={() => {
                playCyberClick(600);
                setSelectedFramework(fw);
              }}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedFramework === fw
                  ? 'bg-[#222] text-white font-bold'
                  : 'bg-[#101010] text-[#666] hover:text-[#bbb]'
              }`}
            >
              {fw}
            </button>
          ))}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.map((plugin) => (
            <motion.div
              key={plugin.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#090909] border border-[#1f1f1f] hover:border-[#333] flex flex-col justify-between space-y-6 transition-all group"
            >
              {/* Card Header & Badge */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] text-[#888] border border-[#262626]">
                    {plugin.category}
                  </span>
                  {plugin.badge && (
                    <span className="text-[10px] font-mono font-bold text-[#FF5A09]">
                      {plugin.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#E50914] transition-colors">
                    {plugin.name}
                  </h3>
                  <p className="text-[11px] font-mono text-[#E50914] font-bold mt-0.5">
                    {plugin.packageNpm}
                  </p>
                </div>

                <p className="text-xs text-[#888] font-sans line-clamp-2 leading-relaxed">
                  {plugin.tagline}
                </p>

                {/* Compatibility & Format Badges */}
                <div className="space-y-1.5 pt-1 border-t border-[#181818] text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-[#999]">
                    <span className="text-[#E50914] font-bold text-[10px]">HOSTS:</span>
                    <span className="text-[#bbb] truncate">
                      {plugin.compatibleWith?.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#888]">
                    <span className="text-[#FF5A09] font-bold text-[10px]">FORMAT:</span>
                    <span className="text-[#999] truncate">
                      {plugin.formatsSupported?.slice(0, 3).join(' • ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics strip */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#111] border border-[#1c1c1c] text-center text-[10px]">
                <div>
                  <div className="text-[#666]">ENGINE</div>
                  <div className="text-white font-bold mt-0.5 truncate">{plugin.bundleSize}</div>
                </div>
                <div>
                  <div className="text-[#666]">GPU BENCH</div>
                  <div className="text-[#22c55e] font-bold mt-0.5">{plugin.lighthouseScore}/100</div>
                </div>
                <div>
                  <div className="text-[#666]">ACTIVE VJS</div>
                  <div className="text-[#FF5A09] font-bold mt-0.5">{plugin.downloads}</div>
                </div>
              </div>

              {/* Card Actions & Pricing */}
              <div className="space-y-3 pt-2 border-t border-[#1a1a1a]">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#777]">
                    COMMERCIAL LICENSE
                  </div>
                  <div className="text-lg font-bold text-white font-heading">
                    ${plugin.price}.00 <span className="text-[10px] text-[#666]">USD</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      playCyberClick(800);
                      onSelectPlugin(plugin, 'playground');
                    }}
                    className="py-2.5 px-3 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-xs font-mono text-white border border-[#2a2a2a] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#FF5A09]" />
                    <span>PLAYGROUND</span>
                  </button>

                  <button
                    onClick={() => {
                      playCyberClick(1100);
                      onOpenCheckout(plugin);
                    }}
                    className="py-2.5 px-3 rounded-lg bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.98] text-xs font-mono font-bold text-white flex items-center justify-center gap-1.5 box-glow-red transition-all cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>GET LICENSE</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
