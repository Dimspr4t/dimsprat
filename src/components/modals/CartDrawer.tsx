import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../../types.ts';
import { playCyberClick, playSuccessChime } from '../../utils/audioSynth.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    playCyberClick(1200);

    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      playSuccessChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E50914', '#FF5A09', '#ffffff'],
      });
      onClearCart();
    }, 1200);
  };

  const handleResetCheckout = () => {
    setCheckoutSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#0a0a0a] border-l border-[#222222] shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#1c1c1c] bg-[#070707] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#E50914] uppercase">
                      UNIFIED MERCH VAULT
                    </span>
                    <h3 className="text-lg font-bold font-heading text-white">
                      YOUR BAG ({totalItemsCount})
                    </h3>
                  </div>
                </div>

                <button
                  id="close-cart-drawer-btn"
                  onClick={() => {
                    playCyberClick(500);
                    onClose();
                  }}
                  className="p-2 rounded-lg text-[#777] hover:text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {checkoutSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#161616] text-[#FF5A09] border border-[#2a2a2a]">
                        TRANSACTION CONFIRMED // DMS-ORDER-882
                      </span>
                      <h4 className="text-xl font-bold font-heading text-white uppercase">
                        STREETWEAR DISPATCH READY
                      </h4>
                      <p className="text-xs text-[#888] font-mono max-w-xs mx-auto">
                        Your limited-edition order has been queued at our underground logistics center. Tracking telemetry sent to your email.
                      </p>
                    </div>
                    <button
                      onClick={handleResetCheckout}
                      className="px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#ff1e29] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-colors cursor-pointer"
                    >
                      RETURN TO MERCH HUB
                    </button>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                    <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#222] flex items-center justify-center text-[#555]">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div className="text-white font-bold font-heading text-lg">YOUR BAG IS EMPTY</div>
                    <p className="text-xs text-[#777] font-mono max-w-xs">
                      Explore our limited streetwear drops including Heavyweight 480 GSM Hoodies and Tactical Rigs.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((cartItem) => (
                      <div
                        key={`${cartItem.item.id}-${cartItem.selectedSize}`}
                        className="p-3.5 rounded-lg bg-[#111] border border-[#202020] flex gap-3 items-center"
                      >
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-16 h-16 object-cover rounded bg-[#0a0a0a] border border-[#262626] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate font-heading tracking-wide">
                            {cartItem.item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] text-[#FF5A09] font-bold border border-[#2a2a2a]">
                              SIZE: {cartItem.selectedSize}
                            </span>
                            <span className="text-xs font-mono font-bold text-white">
                              ${cartItem.item.price}
                            </span>
                          </div>

                          {/* Quantity control */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center rounded border border-[#2c2c2c] bg-[#0c0c0c]">
                              <button
                                onClick={() => {
                                  playCyberClick(700);
                                  onUpdateQuantity(cartItem.item.id, cartItem.selectedSize, -1);
                                }}
                                className="p-1 text-[#888] hover:text-white transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-mono text-white font-bold">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => {
                                  playCyberClick(900);
                                  onUpdateQuantity(cartItem.item.id, cartItem.selectedSize, 1);
                                }}
                                className="p-1 text-[#888] hover:text-white transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                playCyberClick(500);
                                onRemoveItem(cartItem.item.id, cartItem.selectedSize);
                              }}
                              className="p-1 text-[#666] hover:text-[#E50914] transition-colors ml-auto cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {cartItems.length > 0 && !checkoutSuccess && (
                <div className="p-6 border-t border-[#1c1c1c] bg-[#080808] space-y-4">
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[#888]">
                      <span>SUBTOTAL</span>
                      <span className="text-white font-bold">${subtotal} USD</span>
                    </div>
                    <div className="flex justify-between text-[#888]">
                      <span>SHIPPING</span>
                      <span className="text-emerald-400 font-bold">WORLDWIDE FREE</span>
                    </div>
                    <div className="flex justify-between text-white text-sm font-bold pt-2 border-t border-[#1c1c1c]">
                      <span>TOTAL DUE</span>
                      <span className="text-[#E50914]">${subtotal} USD</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 rounded-lg bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.99] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      'AUTHORIZING SECURE TRANSACTION...'
                    ) : (
                      <>
                        <span>PROCEED TO ENCRYPTED CHECKOUT</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#666]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-BIT ENCRYPTED UNDERGROUND COMMERCE</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
