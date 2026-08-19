import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ShoppingBag, Radio, Menu, X, ExternalLink, Shield } from 'lucide-react';
import { playCyberClick, toggleGlobalMute } from '../utils/audioSynth.ts';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  currentView?: 'main' | 'events-hub' | 'event-detail' | 'plugins-hub' | 'plugin-detail';
  onSwitchToEventsHub?: () => void;
  onSwitchToPluginsHub?: () => void;
  onSwitchToMainHub?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  setActiveSection,
  currentView = 'main',
  onSwitchToEventsHub,
  onSwitchToPluginsHub,
  onSwitchToMainHub,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subdomainOpen, setSubdomainOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HUB', sub: '00' },
    { id: 'events', label: 'EVENTS', sub: '01' },
    { id: 'plugins', label: 'PLUGINS', sub: '02' },
    { id: 'merch', label: 'MERCH', sub: '03' },
    { id: 'about', label: 'ABOUT', sub: '04' },
    { id: 'contact', label: 'CONTACT', sub: '05' },
  ];

  const subdomains = [
    { name: 'EVENTS HUB', url: 'https://events.dimsprat.com', tag: 'LIVE' },
    { name: 'VISUAL PLUGINS', url: 'https://plugins.dimsprat.com', tag: 'FFGL/OBS' },
    { name: 'STREETWEAR STORE', url: 'https://merch.dimsprat.com', tag: 'LIMITED' },
    { name: 'COMMUNITY VAULT', url: 'https://vault.dimsprat.com', tag: 'VIP' },
  ];

  const scrollToSection = (id: string) => {
    playCyberClick(800);
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const muted = toggleGlobalMute();
    setIsMuted(muted);
    if (!muted) {
      playCyberClick(1200);
    }
  };

  return (
    <header
      id="global-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-[#181818] py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              if (onSwitchToMainHub) {
                onSwitchToMainHub();
              }
              scrollToSection('hero');
            }}
            className="group flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="relative w-8 h-8 rounded bg-[#0f0f0f] border border-[#2a2a2a] group-hover:border-[#E50914] flex items-center justify-center transition-colors">
              <span className="font-heading font-black text-white text-base tracking-tighter group-hover:text-[#E50914] transition-colors">
                D$
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-wider text-white group-hover:text-[#E50914] transition-colors">
                DIM$PRAT
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#777] uppercase -mt-1">
                {currentView === 'main' ? 'OFFICIAL PORTAL' : 'events.dimsprat.com'}
              </span>
            </div>
          </a>

          {/* Subdomain pill button */}
          <div className="relative hidden md:block">
            <button
              id="subdomain-dropdown-btn"
              onClick={() => {
                playCyberClick(600);
                setSubdomainOpen(!subdomainOpen);
              }}
              className="px-2.5 py-1 rounded bg-[#111] hover:bg-[#181818] border border-[#222] hover:border-[#333] text-[10px] font-mono text-[#888] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Radio className="w-2.5 h-2.5 text-[#E50914] animate-pulse" />
              <span>{currentView === 'main' ? 'NETWORK DOMAINS' : 'events.dimsprat.com'}</span>
              <span className="text-[8px] text-[#555]">▼</span>
            </button>

            {/* Subdomain Dropdown */}
            <AnimatePresence>
              {subdomainOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-[#0c0c0c] border border-[#242424] rounded-lg shadow-2xl p-2 z-50 font-mono"
                >
                  <div className="px-2 py-1 text-[9px] text-[#666] uppercase tracking-wider border-b border-[#1c1c1c] mb-1">
                    CONNECTED ECOSYSTEM SUBDOMAINS
                  </div>
                  
                  {/* Option to return to Main Portal */}
                  <div
                    onClick={() => {
                      playCyberClick(800);
                      if (onSwitchToMainHub) onSwitchToMainHub();
                      setSubdomainOpen(false);
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#181818] text-xs transition-colors group cursor-pointer ${
                      currentView === 'main' ? 'text-[#E50914] font-bold bg-[#141414]' : 'text-[#bbb] hover:text-white'
                    }`}
                  >
                    <span>MAIN PORTAL (dimsprat.com)</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#1a1a1a] text-[#888] group-hover:text-white">HUB</span>
                  </div>

                  {/* Dedicated Events Hub Subdomain */}
                  <div
                    onClick={() => {
                      playCyberClick(800);
                      if (onSwitchToEventsHub) onSwitchToEventsHub();
                      setSubdomainOpen(false);
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#181818] text-xs transition-colors group cursor-pointer ${
                      currentView === 'events-hub' || currentView === 'event-detail' ? 'text-[#E50914] font-bold bg-[#141414]' : 'text-[#bbb] hover:text-white'
                    }`}
                  >
                    <span className="group-hover:text-[#E50914] transition-colors">EVENTS HUB (events.dimsprat.com)</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#E50914]/20 text-[#E50914] font-bold">LIVE</span>
                  </div>

                  {/* Dedicated Plugins Hub Subdomain */}
                  <div
                    onClick={() => {
                      playCyberClick(800);
                      if (onSwitchToPluginsHub) onSwitchToPluginsHub();
                      setSubdomainOpen(false);
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#181818] text-xs transition-colors group cursor-pointer ${
                      currentView === 'plugins-hub' || currentView === 'plugin-detail' ? 'text-[#E50914] font-bold bg-[#141414]' : 'text-[#bbb] hover:text-white'
                    }`}
                  >
                    <span className="group-hover:text-[#FF5A09] transition-colors">PLUGIN STORE (plugins.dimsprat.com)</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FF5A09]/20 text-[#FF5A09] font-bold">v2.4</span>
                  </div>

                  {subdomains.filter(s => !s.name.includes('EVENTS') && !s.name.includes('PLUGINS')).map((sd) => (
                    <a
                      key={sd.name}
                      href={sd.url}
                      onClick={(e) => {
                        e.preventDefault();
                        playCyberClick(900);
                        alert(`Opening external portal: ${sd.url}`);
                        setSubdomainOpen(false);
                      }}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#181818] text-xs text-[#bbb] hover:text-white transition-colors group cursor-pointer"
                    >
                      <span className="group-hover:text-[#E50914] transition-colors">{sd.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#1a1a1a] text-[#888] group-hover:text-white">
                        {sd.tag}
                      </span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0c0c0c]/80 border border-[#1f1f1f] px-3 py-1.5 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                  isActive ? 'text-white font-bold' : 'text-[#888] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-[#E50914]/20 border border-[#E50914]/60 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-[9px] text-[#E50914]">{item.sub}</span>
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Ambience / SFX Toggle */}
          <button
            id="toggle-audio-sfx-btn"
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute Procedural Audio' : 'Mute Procedural Audio'}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isMuted
                ? 'bg-[#121212] border-[#222] text-[#666]'
                : 'bg-[#141414] border-[#E50914]/40 text-[#E50914] hover:border-[#E50914]'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          {/* Bag / Cart Button */}
          <button
            id="open-bag-cart-btn"
            onClick={() => {
              playCyberClick(900);
              onOpenCart();
            }}
            className="relative px-3.5 py-2 rounded-lg bg-[#141414] hover:bg-[#1c1c1c] border border-[#262626] hover:border-[#E50914] text-xs font-mono text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#E50914]" />
            <span className="hidden sm:inline font-bold">BAG</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#E50914] text-white text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => {
              playCyberClick(700);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg bg-[#121212] border border-[#222] text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0a] border-b border-[#222] px-6 py-4 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2.5 rounded-lg text-left text-xs font-mono border transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-[#E50914]/20 border-[#E50914] text-white font-bold'
                      : 'bg-[#121212] border-[#202020] text-[#999] hover:text-white'
                  }`}
                >
                  <span className="text-[#E50914] mr-1.5">{item.sub}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#1c1c1c]">
              <div className="text-[10px] font-mono text-[#666] uppercase mb-2">
                SUBDOMAINS PORTAL
              </div>
              <div className="grid grid-cols-2 gap-2">
                {subdomains.map((sd) => (
                  <button
                    key={sd.name}
                    onClick={() => {
                      playCyberClick(800);
                      alert(`Navigating to ${sd.url}`);
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded bg-[#111] border border-[#1e1e1e] text-[11px] font-mono text-[#aaa] flex items-center justify-between"
                  >
                    <span>{sd.name}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#E50914]" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
