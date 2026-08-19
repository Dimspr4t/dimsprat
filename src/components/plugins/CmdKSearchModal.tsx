import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, Code, Cpu, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';
import { PLUGINS_DATA } from '../../data/mockData.ts';
import { PluginItem } from '../../types.ts';
import { playCyberClick } from '../../utils/audioSynth.ts';

interface CmdKSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlugin: (plugin: PluginItem, initialTab?: 'overview' | 'playground' | 'docs') => void;
}

export const CmdKSearchModal: React.FC<CmdKSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPlugin,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter plugins based on query
  const filteredPlugins = PLUGINS_DATA.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.packageNpm.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.frameworks.some((f) => f.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard arrow navigation & enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredPlugins.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredPlugins.length) % Math.max(1, filteredPlugins.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredPlugins[selectedIndex]) {
          playCyberClick(900);
          onSelectPlugin(filteredPlugins[selectedIndex], 'playground');
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredPlugins, selectedIndex, onClose, onSelectPlugin]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#262626] rounded-xl shadow-2xl overflow-hidden z-10 font-mono"
        >
          {/* Header Search Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1c1c1c] bg-[#121212]">
            <Search className="w-5 h-5 text-[#E50914] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search visual plugins (e.g. Resolume, FFGL, OBS, TouchDesigner, Shaders)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-[#666] outline-none font-sans"
            />
            <span className="px-2 py-0.5 rounded bg-[#1c1c1c] text-[10px] text-[#777] border border-[#2a2a2a] shrink-0">
              ESC
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#171717]">
            {filteredPlugins.length === 0 ? (
              <div className="py-12 text-center text-[#777] text-xs">
                No matching package found for "{query}". Try "glow", "cursor", or "glitch".
              </div>
            ) : (
              filteredPlugins.map((plugin, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={plugin.id}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      playCyberClick(900);
                      onSelectPlugin(plugin, 'playground');
                      onClose();
                    }}
                    className={`p-3 rounded-lg flex items-center justify-between gap-4 cursor-pointer transition-all ${
                      isSelected ? 'bg-[#181818] border border-[#E50914]/40' : 'hover:bg-[#141414]'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white tracking-wide">
                          {plugin.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#202020] text-[#E50914] font-bold">
                          {plugin.packageNpm}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#161616] text-[#888]">
                          {plugin.bundleSize}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#888] font-sans truncate">
                        {plugin.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-[#FF5A09]">
                        ${plugin.price}
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#E50914] translate-x-1' : 'text-[#444]'}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-[#080808] border-t border-[#1a1a1a] flex items-center justify-between text-[10px] text-[#666]">
            <div className="flex items-center gap-3">
              <span><strong className="text-[#aaa]">↑↓</strong> to navigate</span>
              <span><strong className="text-[#aaa]">ENTER</strong> to open sandbox</span>
            </div>
            <span>DIM$PRAT PLUGIN REGISTRY</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
