import React, { useState, useEffect } from 'react';
import { NoiseOverlay } from './components/NoiseOverlay.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { NextEpisode } from './components/NextEpisode.tsx';
import { DualPromo } from './components/DualPromo.tsx';
import { TimelineSection } from './components/TimelineSection.tsx';
import { Footer } from './components/Footer.tsx';

// Dedicated Events Hub components
import { EventPortal } from './components/events/EventPortal.tsx';
import { EventDetailView } from './components/events/EventDetailView.tsx';
import { EventCheckoutModal } from './components/events/EventCheckoutModal.tsx';

// Dedicated Plugin Store components
import { PluginStorePortal } from './components/plugins/PluginStorePortal.tsx';
import { PluginDetailPlayground } from './components/plugins/PluginDetailPlayground.tsx';
import { PluginCheckoutModal } from './components/plugins/PluginCheckoutModal.tsx';
import { CmdKSearchModal } from './components/plugins/CmdKSearchModal.tsx';

// Modals
import { PhotoGalleryModal } from './components/modals/PhotoGalleryModal.tsx';
import { TalentModal } from './components/modals/TalentModal.tsx';
import { RequestEventModal } from './components/modals/RequestEventModal.tsx';
import { TicketPassModal } from './components/modals/TicketPassModal.tsx';
import { CartDrawer } from './components/modals/CartDrawer.tsx';

import { PluginItem, MerchItem, CartItem, EventItem, LicenseKeyRecord } from './types.ts';
import { FEATURED_EVENT, PLUGINS_DATA } from './data/mockData.ts';
import { playCyberClick } from './utils/audioSynth.ts';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Multi-view navigation router
  const [currentView, setCurrentView] = useState<'main' | 'events-hub' | 'event-detail' | 'plugins-hub' | 'plugin-detail'>('main');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedPlugin, setSelectedPlugin] = useState<PluginItem | null>(null);
  const [selectedPluginTab, setSelectedPluginTab] = useState<'overview' | 'playground' | 'docs'>('playground');

  // Shopping Bag Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals States
  const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);
  const [isRequestEventModalOpen, setIsRequestEventModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Event Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutEvent, setCheckoutEvent] = useState<EventItem | null>(null);
  const [checkoutInitialTier, setCheckoutInitialTier] = useState<string>('presale-1');

  // Plugin Checkout Modal & CMD+K State
  const [isPluginCheckoutOpen, setIsPluginCheckoutOpen] = useState(false);
  const [pluginForCheckout, setPluginForCheckout] = useState<PluginItem | null>(null);
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keyboard shortcut listener for CMD+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playCyberClick(800);
        setIsCmdKOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (item: MerchItem, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id && ci.selectedSize === size);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id && ci.selectedSize === size
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      } else {
        return [...prev, { item, selectedSize: size, quantity: 1 }];
      }
    });
    showToast(`Added ${item.name} (${size}) to your bag`);
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id && ci.selectedSize === size) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string, size: string) => {
    setCartItems((prev) => prev.filter((ci) => !(ci.item.id === id && ci.selectedSize === size)));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Scroll navigation helper
  const scrollTo = (id: string) => {
    if (id === 'plugins') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentView('plugins-hub');
      return;
    }
    if (id === 'events') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentView('events-hub');
      return;
    }

    if (currentView !== 'main') {
      setCurrentView('main');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Checkout Flows
  const handleOpenCheckout = (event: EventItem, initialTier?: string) => {
    setCheckoutEvent(event);
    setCheckoutInitialTier(initialTier || 'presale-1');
    setIsCheckoutOpen(true);
  };

  const handleOpenPluginCheckout = (plugin: PluginItem) => {
    setPluginForCheckout(plugin);
    setIsPluginCheckoutOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#E50914] selection:text-white font-sans">
      {/* Procedural Grain Noise & Scanline Overlay */}
      <NoiseOverlay intensity="medium" showScanlines={true} />

      {/* Global Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentView={currentView}
        onSwitchToEventsHub={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentView('events-hub');
        }}
        onSwitchToPluginsHub={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentView('plugins-hub');
        }}
        onSwitchToMainHub={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentView('main');
        }}
      />

      {/* VIEW 1: DEDICATED EVENTS HUB (events.dimsprat.com) */}
      {currentView === 'events-hub' && (
        <EventPortal
          onSelectEvent={(ev) => {
            setSelectedEvent(ev);
            setCurrentView('event-detail');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenGallery={() => setIsPhotoGalleryOpen(true)}
          onOpenTalentModal={() => setIsTalentModalOpen(true)}
          onOpenRequestEventModal={() => setIsRequestEventModalOpen(true)}
          onReturnToMainHub={() => {
            setCurrentView('main');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* VIEW 2: DEDICATED EVENT DETAIL VIEW (/events/[slug]) */}
      {currentView === 'event-detail' && selectedEvent && (
        <EventDetailView
          event={selectedEvent}
          onBack={() => {
            setCurrentView('events-hub');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCheckout={(ev, tier) => handleOpenCheckout(ev, tier)}
          onOpenGallery={() => setIsPhotoGalleryOpen(true)}
          onOpenTalentModal={() => setIsTalentModalOpen(true)}
          onOpenRequestEventModal={() => setIsRequestEventModalOpen(true)}
        />
      )}

      {/* VIEW 3: DEDICATED PLUGIN STORE HUB (plugins.dimsprat.com) */}
      {currentView === 'plugins-hub' && (
        <PluginStorePortal
          onSelectPlugin={(plugin, tab) => {
            setSelectedPlugin(plugin);
            setSelectedPluginTab(tab || 'playground');
            setCurrentView('plugin-detail');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCheckout={(plugin) => handleOpenPluginCheckout(plugin)}
          onOpenCmdK={() => setIsCmdKOpen(true)}
          onReturnToMainHub={() => {
            setCurrentView('main');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* VIEW 4: DEDICATED PLUGIN DETAIL & LIVE PLAYGROUND (/plugins/[slug]) */}
      {currentView === 'plugin-detail' && selectedPlugin && (
        <PluginDetailPlayground
          plugin={selectedPlugin}
          initialTab={selectedPluginTab}
          onBack={() => {
            setCurrentView('plugins-hub');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCheckout={(plugin) => handleOpenPluginCheckout(plugin)}
        />
      )}

      {/* VIEW 5: MAIN PORTAL (dimsprat.com) */}
      {currentView === 'main' && (
        <main>
          {/* 1. Hero Section */}
          <Hero
            onExploreEvents={() => scrollTo('events')}
            onExplorePlugins={() => scrollTo('plugins')}
          />

          {/* 2. Highlight Section: Next Episode (Fokus Utama) */}
          <NextEpisode
            onOpenPhotoGallery={() => setIsPhotoGalleryOpen(true)}
            onOpenTalentModal={() => setIsTalentModalOpen(true)}
            onOpenRequestEventModal={() => setIsRequestEventModalOpen(true)}
            onOpenTicketModal={() => handleOpenCheckout(FEATURED_EVENT, 'presale-1')}
            onOpenEventDetail={(ev) => {
              setSelectedEvent(ev);
              setCurrentView('event-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* 3. Dual Promo Section (Plugins 60% : Merch 40%) */}
          <DualPromo
            onOpenPluginDemo={(plugin) => {
              setSelectedPlugin(plugin);
              setSelectedPluginTab('playground');
              setCurrentView('plugin-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
          />

          {/* 4. Portfolio & Timeline (About DIM$PRAT) */}
          <TimelineSection />
        </main>
      )}

      {/* Clean Global Footer (Shown across all views) */}
      <Footer
        onOpenTalentModal={() => setIsTalentModalOpen(true)}
        onOpenRequestEventModal={() => setIsRequestEventModalOpen(true)}
      />

      {/* Interactive Modals */}
      <PhotoGalleryModal
        isOpen={isPhotoGalleryOpen}
        onClose={() => setIsPhotoGalleryOpen(false)}
      />

      <TalentModal
        isOpen={isTalentModalOpen}
        onClose={() => setIsTalentModalOpen(false)}
        onSuccess={(data) => showToast(`Talent application registered for ${data.talentName}!`)}
      />

      <RequestEventModal
        isOpen={isRequestEventModalOpen}
        onClose={() => setIsRequestEventModalOpen(false)}
        onSuccess={(data) => showToast(`Event proposal for ${data.targetCity} dispatched!`)}
      />

      <TicketPassModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      <EventCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        event={checkoutEvent}
        initialTier={checkoutInitialTier}
      />

      {/* Plugin License Checkout & Dashboard Modal */}
      <PluginCheckoutModal
        isOpen={isPluginCheckoutOpen}
        onClose={() => setIsPluginCheckoutOpen(false)}
        plugin={pluginForCheckout}
        onSuccess={(license: LicenseKeyRecord) => {
          showToast(`License key generated: ${license.key}`);
        }}
      />

      {/* CMD+K Fast Search Modal */}
      <CmdKSearchModal
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
        onSelectPlugin={(plugin, tab) => {
          setSelectedPlugin(plugin);
          setSelectedPluginTab(tab || 'playground');
          setCurrentView('plugin-detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-[#0e0e0e] border border-[#E50914] text-white text-xs font-mono shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#E50914]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
