import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Key, 
  CheckCircle, 
  ShieldCheck, 
  Copy, 
  Check, 
  Terminal, 
  Globe, 
  CreditCard, 
  ArrowRight, 
  Sparkles,
  Server,
  Zap,
  RefreshCw
} from 'lucide-react';
import { PluginItem, LicenseKeyRecord } from '../../types.ts';
import { playCyberClick, playSuccessChime } from '../../utils/audioSynth.ts';

interface PluginCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plugin: PluginItem | null;
  onSuccess?: (license: LicenseKeyRecord) => void;
}

export const PluginCheckoutModal: React.FC<PluginCheckoutModalProps> = ({
  isOpen,
  onClose,
  plugin,
  onSuccess,
}) => {
  const [tier, setTier] = useState<'single' | 'team' | 'enterprise'>('single');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'crypto' | 'qris'>('stripe');
  
  // Checkout & Generated License State
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState<LicenseKeyRecord | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // License Activation Test Sandbox in Dashboard
  const [testDomain, setTestDomain] = useState('creative-studio.vercel.app');
  const [activationMessage, setActivationMessage] = useState<string | null>(null);
  const [apiVerifyResult, setApiVerifyResult] = useState<any | null>(null);
  const [isVerifyingApi, setIsVerifyingApi] = useState(false);

  if (!isOpen || !plugin) return null;

  const getTierPrice = () => {
    if (tier === 'single') return plugin.price;
    if (tier === 'team') return plugin.price * 2.5;
    return plugin.price * 6;
  };

  const getMaxDomains = () => {
    if (tier === 'single') return 1;
    if (tier === 'team') return 5;
    return 999;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail) return;

    playCyberClick(1100);
    setIsProcessing(true);

    setTimeout(() => {
      // Generate formatted License Key: DS-XXXX-XXXX-XXXX
      const randSeg = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const generatedKey = `DS-${randSeg()}-${randSeg()}-${randSeg()}`;

      const newLicense: LicenseKeyRecord = {
        key: generatedKey,
        pluginId: plugin.id,
        pluginName: plugin.name,
        customerEmail: customerEmail,
        customerName: customerName || 'Developer',
        maxDomains: getMaxDomains(),
        activatedDomains: [],
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };

      setGeneratedLicense(newLicense);
      setIsProcessing(false);
      playSuccessChime();

      if (onSuccess) {
        onSuccess(newLicense);
      }
    }, 1400);
  };

  const handleCopyKey = () => {
    if (!generatedLicense) return;
    navigator.clipboard.writeText(generatedLicense.key);
    playCyberClick(1200);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Test Activation on domain
  const handleTestActivate = () => {
    if (!generatedLicense || !testDomain) return;
    playCyberClick(800);

    if (generatedLicense.activatedDomains.includes(testDomain)) {
      setActivationMessage(`Domain ${testDomain} is already activated.`);
      return;
    }

    if (generatedLicense.activatedDomains.length >= generatedLicense.maxDomains) {
      setActivationMessage(`ERROR: Maximum domain activation limit reached (${generatedLicense.maxDomains}).`);
      return;
    }

    const updated = {
      ...generatedLicense,
      activatedDomains: [...generatedLicense.activatedDomains, testDomain],
    };
    setGeneratedLicense(updated);
    setActivationMessage(`Domain ${testDomain} activated successfully! (256-bit signed)`);
  };

  // Test Live Edge API Verify endpoint
  const handleRunApiVerification = () => {
    if (!generatedLicense) return;
    playCyberClick(900);
    setIsVerifyingApi(true);

    setTimeout(() => {
      const isDomainActive = generatedLicense.activatedDomains.includes(testDomain) || testDomain.includes('localhost');
      
      setApiVerifyResult({
        endpoint: 'POST https://plugins.dimsprat.com/api/licenses/verify',
        statusCode: isDomainActive ? 200 : 403,
        cachedAtEdge: true,
        edgeCacheTtlSeconds: 86400,
        response: {
          status: isDomainActive ? 'VALID' : 'UNAUTHORIZED_DOMAIN',
          licenseKey: generatedLicense.key,
          domain: testDomain,
          allowedPackage: plugin.packageNpm,
          version: plugin.version,
          features: plugin.features,
          activations: `${generatedLicense.activatedDomains.length}/${generatedLicense.maxDomains}`,
        }
      });
      setIsVerifyingApi(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0a0a0a] border border-[#222] rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c1c1c] bg-[#101010]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914]">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-white">
                  {generatedLicense ? 'DEVELOPER LICENSE DASHBOARD' : `LICENSE CHECKOUT // ${plugin.name}`}
                </h3>
                <p className="text-[10px] font-mono text-[#888]">
                  PACKAGE: {plugin.packageNpm} ({plugin.version})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#181818] hover:bg-[#222] text-[#888] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {!generatedLicense ? (
              /* STAGE 1: CHECKOUT FORM */
              <form onSubmit={handleCheckout} className="space-y-6 font-mono">
                {/* Tier Selection Radio Cards */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#aaa] mb-2.5">
                    SELECT LICENSE SCOPE
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'single', name: 'SOLO / CLIENT', domains: '1 Domain Activation', mult: 1 },
                      { id: 'team', name: 'AGENCY PRO', domains: '5 Domain Activations', mult: 2.5 },
                      { id: 'enterprise', name: 'ENTERPRISE SAAS', domains: 'Unlimited Activations', mult: 6 },
                    ].map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          playCyberClick(700);
                          setTier(t.id as any);
                        }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          tier === t.id
                            ? 'bg-[#141414] border-[#E50914] shadow-lg shadow-[#E50914]/10'
                            : 'bg-[#0e0e0e] border-[#202020] hover:border-[#333]'
                        }`}
                      >
                        <div className="text-xs font-bold text-white mb-1">{t.name}</div>
                        <div className="text-[10px] text-[#777] mb-3">{t.domains}</div>
                        <div className="text-base font-bold text-[#FF5A09]">
                          ${(plugin.price * t.mult).toFixed(0)} <span className="text-[10px] text-[#666]">USD</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#aaa] mb-1.5">
                      DEVELOPER / COMPANY NAME
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Studio Neon / John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-[#262626] text-white text-xs placeholder-[#555] focus:border-[#E50914] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#aaa] mb-1.5">
                      DELIVERY EMAIL <span className="text-[#E50914]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="dev@agency.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-[#262626] text-white text-xs placeholder-[#555] focus:border-[#E50914] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#aaa] mb-2">
                    PAYMENT GATEWAY
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'stripe', label: 'CREDIT CARD (STRIPE)' },
                      { id: 'qris', label: 'QRIS & VA (INDONESIA)' },
                      { id: 'crypto', label: 'WEB3 (USDC / ETH)' },
                    ].map((pm) => (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => {
                          playCyberClick(700);
                          setPaymentMethod(pm.id as any);
                        }}
                        className={`py-2.5 px-3 rounded-lg border text-[11px] font-mono transition-all text-center cursor-pointer ${
                          paymentMethod === pm.id
                            ? 'bg-[#181818] border-[#E50914] text-white font-bold'
                            : 'bg-[#101010] border-[#222] text-[#888] hover:text-white'
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary & Submit */}
                <div className="p-4 rounded-xl bg-[#0f0f0f] border border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-[#666]">TOTAL DUE TODAY</div>
                    <div className="text-xl font-bold text-white">
                      ${getTierPrice().toFixed(0)}.00 USD
                    </div>
                    <div className="text-[10px] text-[#888]">Instant automated license key provisioning</div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 box-glow-red transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>MINTING LICENSE...</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4" />
                        <span>PAY & GENERATE KEY</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* STAGE 2: LICENSE GENERATED DASHBOARD & VERIFICATION TESTER */
              <div className="space-y-6 font-mono">
                {/* Success Banner */}
                <div className="p-4 rounded-xl bg-[#0d1c10] border border-[#1a4a22] flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">LICENSE KEY PROVISIONED SUCCESSFULLY</h4>
                    <p className="text-xs text-[#88ba92] font-sans">
                      A permanent backup has been dispatched to <strong>{generatedLicense.customerEmail}</strong>.
                    </p>
                  </div>
                </div>

                {/* Key Card */}
                <div className="p-5 rounded-xl bg-[#111] border border-[#2a2a2a] space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#888]">
                    <span>OFFICIAL LICENSE KEY</span>
                    <span className="text-[#22c55e] font-bold">STATUS: {generatedLicense.status}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-black border border-[#222]">
                    <span className="text-base sm:text-lg font-black text-[#FF5A09] tracking-widest font-mono select-all">
                      {generatedLicense.key}
                    </span>
                    <button
                      onClick={handleCopyKey}
                      className="px-3 py-1.5 rounded bg-[#1c1c1c] hover:bg-[#252525] text-xs text-white border border-[#333] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[10px] text-[#777]">
                    <div>PACKAGE: <span className="text-white">{plugin.packageNpm}</span></div>
                    <div>TIER: <span className="text-white">{tier.toUpperCase()}</span></div>
                    <div>MAX DOMAINS: <span className="text-white">{generatedLicense.maxDomains}</span></div>
                    <div>ACTIVATIONS: <span className="text-[#E50914]">{generatedLicense.activatedDomains.length}</span></div>
                  </div>
                </div>

                {/* Interactive Domain Activation & Edge API Test Sandbox */}
                <div className="p-5 rounded-xl bg-[#090909] border border-[#1e1e1e] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-[#E50914]" />
                      <span className="text-xs font-bold text-white uppercase">
                        EDGE API VERIFICATION SIMULATOR
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#161616] text-[#888] border border-[#222]">
                      POST /api/licenses/verify
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative w-full">
                      <Globe className="absolute left-3 top-3 w-3.5 h-3.5 text-[#666]" />
                      <input
                        type="text"
                        placeholder="e.g. clientwebsite.com or localhost:3000"
                        value={testDomain}
                        onChange={(e) => setTestDomain(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#141414] border border-[#282828] text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#E50914]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleTestActivate}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] text-xs text-white shrink-0 cursor-pointer"
                    >
                      + ACTIVATE DOMAIN
                    </button>
                    <button
                      type="button"
                      onClick={handleRunApiVerification}
                      disabled={isVerifyingApi}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#E50914] hover:bg-[#ff1f2a] text-xs text-white shrink-0 font-bold cursor-pointer"
                    >
                      {isVerifyingApi ? 'TESTING...' : 'RUN VERIFY API'}
                    </button>
                  </div>

                  {activationMessage && (
                    <div className="text-[11px] text-[#22c55e] bg-[#121c13] p-2.5 rounded border border-[#1e3d23]">
                      {activationMessage}
                    </div>
                  )}

                  {/* Active Domains List */}
                  {generatedLicense.activatedDomains.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] text-[#777]">ACTIVE DOMAINS:</div>
                      <div className="flex flex-wrap gap-2">
                        {generatedLicense.activatedDomains.map((d) => (
                          <span
                            key={d}
                            className="px-2.5 py-1 rounded bg-[#161616] text-xs text-white border border-[#2a2a2a] flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* API Verification Result Output Box */}
                  {apiVerifyResult && (
                    <div className="p-3 rounded-lg bg-black border border-[#222] space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-[#888]">
                        <span>EDGE RESPONSE [HTTP {apiVerifyResult.statusCode}]</span>
                        <span className="text-[#22c55e]">REDIS CACHE HIT (TTL: 24h)</span>
                      </div>
                      <pre className="text-[11px] text-[#00ff66] font-mono overflow-x-auto p-2 bg-[#050505] rounded">
                        {JSON.stringify(apiVerifyResult.response, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setGeneratedLicense(null);
                      setApiVerifyResult(null);
                    }}
                    className="text-xs text-[#777] hover:text-white underline cursor-pointer"
                  >
                    ← Purchase another license
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg bg-[#222] hover:bg-[#333] text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    CLOSE DASHBOARD
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
