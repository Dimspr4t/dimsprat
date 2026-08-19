import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Code, 
  BookOpen, 
  Play, 
  Square, 
  Copy, 
  Check, 
  Zap, 
  Shield, 
  Cpu, 
  Sliders, 
  ExternalLink,
  Terminal,
  Volume2,
  Key,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Tv,
  Eye,
  Radio,
  Download,
  Settings,
  Layers
} from 'lucide-react';
import { PluginItem } from '../../types.ts';
import { playCyberClick, playSuccessChime } from '../../utils/audioSynth.ts';

interface PluginDetailPlaygroundProps {
  plugin: PluginItem;
  initialTab?: 'overview' | 'playground' | 'docs';
  onBack: () => void;
  onOpenCheckout: (plugin: PluginItem) => void;
}

export const PluginDetailPlayground: React.FC<PluginDetailPlaygroundProps> = ({
  plugin,
  initialTab = 'playground',
  onBack,
  onOpenCheckout,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'playground' | 'docs'>(initialTab);

  // Visual Playground Controls State
  const [accentColor, setAccentColor] = useState(plugin.defaultPlaygroundProps?.color || plugin.accentColor);
  const [speed, setSpeed] = useState(plugin.defaultPlaygroundProps?.speed || 0.8);
  const [intensity, setIntensity] = useState(plugin.defaultPlaygroundProps?.intensity || 75);
  const [glitchRate, setGlitchRate] = useState(plugin.defaultPlaygroundProps?.glitchRate || 25);
  const [bloom, setBloom] = useState(plugin.defaultPlaygroundProps?.bloom || 80);
  const [isAudioReactive, setIsAudioReactive] = useState(plugin.defaultPlaygroundProps?.audioReactive ?? true);
  const [targetFps, setTargetFps] = useState<60 | 120>(60);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeExportFormat, setActiveExportFormat] = useState<'resolume' | 'obs' | 'touchdesigner' | 'glsl'>('resolume');

  // Interactive Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  // Clipboard status
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  // Docs Active Section
  const [activeDocSection, setActiveDocSection] = useState('installation');

  // Handle Preset Selection
  const applyPreset = (name: string) => {
    playCyberClick(900);
    switch (name) {
      case 'STAGE CONCERT':
        setAccentColor('#E50914');
        setSpeed(1.4);
        setIntensity(95);
        setGlitchRate(60);
        setBloom(95);
        setIsAudioReactive(true);
        break;
      case 'CYBER STREAMER':
        setAccentColor('#00F0FF');
        setSpeed(0.6);
        setIntensity(65);
        setGlitchRate(20);
        setBloom(75);
        setIsAudioReactive(true);
        break;
      case 'DARK INDUSTRIAL':
        setAccentColor('#FF5A09');
        setSpeed(0.9);
        setIntensity(85);
        setGlitchRate(75);
        setBloom(60);
        setIsAudioReactive(true);
        break;
      case 'ACID GLITCH':
        setAccentColor('#00FF66');
        setSpeed(1.2);
        setIntensity(90);
        setGlitchRate(90);
        setBloom(85);
        setIsAudioReactive(true);
        break;
    }
  };

  // Real-Time HTML5 Canvas Visual Engine Simulator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let beatPhase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const time = (Date.now() - startTimeRef.current) * 0.001 * speed;

      // Simulated Audio Reactivity Beat
      beatPhase += 0.05 * speed;
      const beatPulse = isAudioReactive ? Math.pow(Math.sin(beatPhase * 3), 4) * (intensity / 100) : 0.2;

      // Clear with dark trail / persistence
      ctx.fillStyle = `rgba(5, 5, 5, ${0.15 + (100 - bloom) * 0.002})`;
      ctx.fillRect(0, 0, width, height);

      const mx = mousePosRef.current.x * width;
      const my = mousePosRef.current.y * height;
      const cx = width / 2;
      const cy = height / 2;

      // ENGINE TYPE 1: GLSL VOLUMETRIC TUNNEL (Resolume / FFGL)
      if (plugin.visualEngineType === 'glsl-tunnel') {
        const rings = 18;
        for (let i = 0; i < rings; i++) {
          const ringProgress = ((time * 0.8 + i / rings) % 1);
          const radius = Math.pow(ringProgress, 2.5) * Math.max(width, height) * 0.8;
          const currentAlpha = Math.sin(ringProgress * Math.PI) * (bloom / 100);

          ctx.save();
          ctx.translate(cx + (mx - cx) * 0.2 * (1 - ringProgress), cy + (my - cy) * 0.2 * (1 - ringProgress));
          ctx.rotate(time * 0.2 + i * 0.1);

          // Outer Glow Ring
          ctx.beginPath();
          const segments = 6;
          for (let s = 0; s <= segments; s++) {
            const angle = (s / segments) * Math.PI * 2;
            const r = radius * (1 + (Math.random() - 0.5) * (glitchRate / 500));
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (s === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();

          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = currentAlpha;
          ctx.lineWidth = 1 + ringProgress * (intensity / 20) + beatPulse * 4;
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = (bloom / 100) * 25 * ringProgress;
          ctx.stroke();

          // Inner crosshairs
          if (i % 3 === 0) {
            ctx.beginPath();
            ctx.moveTo(-radius * 0.3, 0);
            ctx.lineTo(radius * 0.3, 0);
            ctx.moveTo(0, -radius * 0.3);
            ctx.lineTo(0, radius * 0.3);
            ctx.strokeStyle = '#ffffff';
            ctx.globalAlpha = currentAlpha * 0.6;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      // ENGINE TYPE 2: OBS DYNAMIC STINGER & HUD
      else if (plugin.visualEngineType === 'stinger-hud') {
        // Tactical grid background
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Live Audio Waveform Bars (OBS Live Source)
        const barCount = 36;
        const barWidth = (width * 0.7) / barCount;
        const startX = width * 0.15;
        const bottomY = height * 0.85;

        for (let b = 0; b < barCount; b++) {
          const freq = Math.sin(time * 4 + b * 0.3) * 0.5 + 0.5;
          const barHeight = (freq * 80 + beatPulse * 60) * (intensity / 100);

          ctx.fillStyle = b % 2 === 0 ? accentColor : '#ffffff';
          ctx.globalAlpha = 0.8;
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 10;
          ctx.fillRect(startX + b * barWidth, bottomY - barHeight, barWidth - 3, barHeight);
        }

        // Dynamic Targeting Reticle following mouse
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(time);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 35 + beatPulse * 15, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, Math.PI * 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 50, Math.PI, Math.PI * 1.5);
        ctx.stroke();
        ctx.restore();

        // Telemetry Data Overlay
        ctx.font = '10px monospace';
        ctx.fillStyle = accentColor;
        ctx.fillText(`OBS LIVE STREAM // FPS: ${targetFps} // BITRATE: 12,000 KBPS`, 20, 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`STATUS: REC [ON AIR] | AUDIO REACTION: ${isAudioReactive ? 'ACTIVE' : 'OFF'}`, 20, 50);
      }

      // ENGINE TYPE 3: CYBER-GLITCH WARP (RGB Split & Displacement)
      else if (plugin.visualEngineType === 'rgb-warp') {
        const offset = (glitchRate / 20) * (1 + beatPulse * 2);

        // Draw animated central cyber shape
        ctx.save();
        ctx.translate(cx, cy);

        // Red Channel Offset
        ctx.fillStyle = 'rgba(229, 9, 20, 0.7)';
        ctx.beginPath();
        ctx.rect(-100 - offset, -80, 200, 160);
        ctx.fill();

        // Cyan Channel Offset
        ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
        ctx.beginPath();
        ctx.rect(-100 + offset, -80 + offset * 0.5, 200, 160);
        ctx.fill();

        // White Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.rect(-95, -75, 190, 150);
        ctx.fill();

        // Displaced Scanlines
        ctx.fillStyle = '#000000';
        for (let s = -75; s < 75; s += 8) {
          ctx.fillRect(-95, s, 190, 2);
        }

        ctx.restore();

        // Screen Glitch Jitter Blocks
        if (Math.random() < glitchRate / 100) {
          ctx.fillStyle = accentColor;
          ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 180 + 40, Math.random() * 20 + 2);
        }
      }

      // ENGINE TYPE 4: TOUCHDESIGNER 3D POINT CLOUD PARTICLES
      else if (plugin.visualEngineType === 'spectra-fft') {
        const particleCount = 140;
        for (let p = 0; p < particleCount; p++) {
          const angle = (p / particleCount) * Math.PI * 2 + time * 0.3;
          const dist = 60 + Math.sin(p * 0.5 + time * 2) * 50 + beatPulse * 80;
          const px = cx + Math.cos(angle) * dist * (width / 500);
          const py = cy + Math.sin(angle) * dist * (height / 500);

          ctx.fillStyle = p % 3 === 0 ? accentColor : '#ffffff';
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(px, py, 1.5 + (p % 4) * 0.8 + beatPulse * 2, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby particles
          if (p > 0 && p % 4 === 0) {
            ctx.strokeStyle = `rgba(255, 90, 9, 0.25)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(cx, cy);
            ctx.stroke();
          }
        }
      }

      // ENGINE TYPE 5: STAGE LASERS & LED WALL
      else if (plugin.visualEngineType === 'stage-lasers') {
        const laserCount = 12;
        for (let l = 0; l < laserCount; l++) {
          const sweepAngle = Math.sin(time * 2 + l * 0.4) * 1.2;
          const originX = (l / laserCount) * width;
          const originY = 0;

          const targetX = cx + Math.tan(sweepAngle) * height;
          const targetY = height;

          ctx.strokeStyle = l % 2 === 0 ? accentColor : '#ffffff';
          ctx.lineWidth = 2 + beatPulse * 4;
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.moveTo(originX, originY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();
        }

        // Bass Strobe Flash
        if (beatPulse > 0.6) {
          ctx.fillStyle = `rgba(229, 9, 20, ${beatPulse * 0.25})`;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // ENGINE TYPE 6: RETRO CRT SCANLINES & ANAMORPHIC FLARE
      else {
        // CRT Curved Scanline Bar
        for (let y = 0; y < height; y += 4) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
          ctx.fillRect(0, y, width, 1.5);
        }

        // Rolling Hum Bar
        const humY = (time * 120) % height;
        ctx.fillStyle = `rgba(229, 9, 20, 0.15)`;
        ctx.fillRect(0, humY, width, 30);

        // Anamorphic horizontal flare
        const flareY = cy + Math.sin(time) * 40;
        const grad = ctx.createLinearGradient(0, flareY, width, flareY);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, accentColor);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, flareY - 2, width, 4 + beatPulse * 8);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [plugin.visualEngineType, accentColor, speed, intensity, glitchRate, bloom, isAudioReactive, targetFps]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mousePosRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    playCyberClick(1200);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Generate Integration Code / Export Snippet
  const getGeneratedConfig = () => {
    if (activeExportFormat === 'resolume') {
      return `// RESOLUME ARENA 7 & WIRE OSC/FFGL CONFIGURATION
// Plugin: ${plugin.name} (${plugin.version})
{
  "effect_name": "${plugin.name}",
  "ffgl_version": "2.2.0",
  "gpu_pipeline": "DirectX12 / Metal 64-bit",
  "parameters": {
    "/composition/layers/1/clips/1/video/effects/${plugin.id}/color": "${accentColor}",
    "/composition/layers/1/clips/1/video/effects/${plugin.id}/speed": ${speed},
    "/composition/layers/1/clips/1/video/effects/${plugin.id}/intensity": ${intensity / 100},
    "/composition/layers/1/clips/1/video/effects/${plugin.id}/glitch_rate": ${glitchRate / 100},
    "/composition/layers/1/clips/1/video/effects/${plugin.id}/bloom_gain": ${bloom / 100},
    "/composition/layers/1/clips/1/video/effects/${plugin.id}/bpm_sync": ${isAudioReactive ? 1 : 0}
  }
}`;
    } else if (activeExportFormat === 'obs') {
      return `// OBS STUDIO 30+ SHADERFX / WEBSOCKET OVERLAY
// Filter: ${plugin.packageNpm}
{
  "source_name": "Game Capture / Camera 1",
  "filter_type": "dimsprat_shaderfx_filter",
  "settings": {
    "accent_hex": "${accentColor}",
    "render_scale": "3840x2160",
    "animation_speed": ${speed},
    "distortion_depth": ${intensity},
    "scanline_frequency": 240,
    "audio_source": "Desktop Audio (WASAPI)",
    "reactive_decay": 0.85
  }
}`;
    } else if (activeExportFormat === 'touchdesigner') {
      return `# TOUCHDESIGNER 099 PYTHON OPERATOR BINDINGS
# Component: ${plugin.name}.tox
op('${plugin.id}').par.Colorr = ${(parseInt(accentColor.slice(1, 3), 16) / 255).toFixed(3)}
op('${plugin.id}').par.Colorg = ${(parseInt(accentColor.slice(3, 5), 16) / 255).toFixed(3)}
op('${plugin.id}').par.Colorb = ${(parseInt(accentColor.slice(5, 7), 16) / 255).toFixed(3)}
op('${plugin.id}').par.Speed = ${speed}
op('${plugin.id}').par.Intensity = ${(intensity / 100).toFixed(2)}
op('${plugin.id}').par.Spoutoutput = 1 # Spout2 4K 120FPS Active`;
    } else {
      return `// GLSL FRAGMENT SHADER (4K 120FPS GPU Pipeline)
#version 450 core
layout(location = 0) out vec4 FragColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_accent_color; // ${accentColor}
uniform float u_intensity;    // ${intensity}%

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    float pulse = sin(u_time * ${speed} * 3.0) * ${(intensity / 100).toFixed(2)};
    vec3 color = u_accent_color * (1.0 / length(uv)) * pulse;
    FragColor = vec4(color, 1.0);
}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono pt-20 pb-32">
        {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-[#1c1c1c]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playCyberClick(700);
                onBack();
              }}
              className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#262626] text-xs text-[#aaa] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>CATALOG</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-heading">{plugin.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#1c1c1c] text-[#E50914] font-bold border border-[#2a2a2a]">
                {plugin.category}
              </span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#111] border border-[#222]">
            {[
              { id: 'playground', label: 'LIVE SHADER SANDBOX', icon: Eye },
              { id: 'overview', label: 'PLUGIN OVERVIEW & SPECS', icon: Sparkles },
              { id: 'docs', label: 'INSTALLATION GUIDE', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playCyberClick(800);
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#E50914] text-white font-bold shadow-lg shadow-[#E50914]/20'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Technical Specs Highlight Bar */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#0a0a0a] border border-[#202020] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#aaa]">
            <span className="text-[#E50914] font-bold text-[11px] uppercase tracking-wider">COMPATIBLE WITH:</span>
            <span className="text-white">
              {plugin.compatibleWith?.join(' • ') || 'Ableton Live, Resolume Arena, OBS Studio, TouchDesigner, FL Studio'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#aaa]">
            <span className="text-[#FF5A09] font-bold text-[11px] uppercase tracking-wider">FORMAT SUPPORT:</span>
            <span className="text-white">
              {plugin.formatsSupported?.join(' / ') || 'VST3 / AU / CLAP / FFGL 2.2 / OBS C++ / Spout2 / NDI'}
            </span>
          </div>
        </div>

        {/* TAB 1: LIVE SHADER SANDBOX */}
        {activeTab === 'playground' && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (5 Cols): Interactive Configurator Controls */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#090909] border border-[#1f1f1f] space-y-5">
                <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#E50914]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      VISUAL SHADER CONTROLS
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#22c55e] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    GPU ACCELERATED
                  </span>
                </div>

                {/* Preset Fast-Select Buttons */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-[#777] uppercase">QUICK PRESETS</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['STAGE CONCERT', 'CYBER STREAMER', 'DARK INDUSTRIAL', 'ACID GLITCH'].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => applyPreset(preset)}
                        className="py-1.5 px-2.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-[10px] text-[#bbb] hover:text-white border border-[#262626] hover:border-[#E50914] transition-colors cursor-pointer text-left truncate"
                      >
                        ⚡ {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glow Color Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#aaa]">NEON GLOW COLOR</span>
                    <span className="text-white font-mono">{accentColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[
                      { name: 'Crimson', val: '#E50914' },
                      { name: 'Cyber Amber', val: '#FF5A09' },
                      { name: 'Cyan Laser', val: '#00F0FF' },
                      { name: 'Acid Green', val: '#00FF66' },
                      { name: 'Hyper Violet', val: '#9D00FF' },
                    ].map((c) => (
                      <button
                        key={c.val}
                        onClick={() => {
                          playCyberClick(700);
                          setAccentColor(c.val);
                        }}
                        style={{ backgroundColor: c.val }}
                        className={`w-7 h-7 rounded-lg transition-transform ${
                          accentColor === c.val ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-70 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Speed & BPM Multiplier Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#aaa]">ANIMATION SPEED</span>
                    <span className="text-white font-mono">{speed.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.5"
                    step="0.05"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full accent-[#E50914] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Shader Intensity & Displacement Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#aaa]">DISPLACEMENT INTENSITY</span>
                    <span className="text-white font-mono">{intensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="w-full accent-[#E50914] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Glitch & RGB Split Offset */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#aaa]">GLITCH & RGB SPLIT</span>
                    <span className="text-white font-mono">{glitchRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={glitchRate}
                    onChange={(e) => setGlitchRate(Number(e.target.value))}
                    className="w-full accent-[#FF5A09] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Volumetric Bloom Gain */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#aaa]">BLOOM RADIUS & GAIN</span>
                    <span className="text-white font-mono">{bloom}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={bloom}
                    onChange={(e) => setBloom(Number(e.target.value))}
                    className="w-full accent-[#E50914] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Audio-Reactive Beat Toggle */}
                <div className="pt-2 border-t border-[#1c1c1c] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white font-bold">AUDIO REACTIVE (BPM SYNC)</div>
                    <div className="text-[10px] text-[#666]">Pulsates with transient audio signals</div>
                  </div>
                  <button
                    onClick={() => {
                      playCyberClick(900);
                      setIsAudioReactive(!isAudioReactive);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      isAudioReactive ? 'bg-[#E50914] text-white' : 'bg-[#181818] text-[#777] border border-[#2a2a2a]'
                    }`}
                  >
                    {isAudioReactive ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>

              {/* Right Column (7 Cols): Real-time Canvas Viewport & Export Tab */}
              <div className="lg:col-span-7 space-y-4">
                {/* Visual Canvas Viewport */}
                <div className="relative rounded-2xl bg-[#060606] border border-[#242424] overflow-hidden group shadow-2xl">
                  {/* Top Canvas Bar */}
                  <div className="p-3 bg-[#0d0d0d] border-b border-[#1c1c1c] flex items-center justify-between text-[11px] text-[#888]">
                    <div className="flex items-center gap-2">
                      <Tv className="w-3.5 h-3.5 text-[#E50914]" />
                      <span className="text-white font-bold">{plugin.name}</span>
                      <span className="text-[10px] text-[#555]">| GPU 4K SHADER VIEWPORT</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#22c55e]">● 60-120 FPS</span>
                      <button
                        onClick={() => {
                          playCyberClick(700);
                          setIsFullscreen(!isFullscreen);
                        }}
                        className="p-1 rounded hover:bg-[#1c1c1c] text-[#888] hover:text-white transition-colors cursor-pointer"
                        title="Toggle Fullscreen Canvas"
                      >
                        {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* HTML5 Canvas Viewport */}
                  <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={450}
                      onMouseMove={handleCanvasMouseMove}
                      className="w-full h-full object-cover cursor-crosshair"
                    />

                    {/* Interactive Overlay Badge */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#333] text-[10px] text-[#aaa]">
                      Move cursor to interact with shader displacement
                    </div>
                  </div>
                </div>

                {/* Configuration Exporter Card */}
                <div className="p-5 rounded-2xl bg-[#090909] border border-[#1f1f1f] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1c1c] pb-3">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#FF5A09]" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        INTEGRATION PRESET & CODE EXPORT
                      </span>
                    </div>

                    {/* Format Selector Pills */}
                    <div className="flex items-center gap-1">
                      {[
                        { id: 'resolume', label: 'RESOLUME / WIRE' },
                        { id: 'obs', label: 'OBS SHADERFX' },
                        { id: 'touchdesigner', label: 'TOUCHDESIGNER' },
                        { id: 'glsl', label: 'GLSL SHADER' },
                      ].map((fmt) => (
                        <button
                          key={fmt.id}
                          onClick={() => {
                            playCyberClick(600);
                            setActiveExportFormat(fmt.id as any);
                          }}
                          className={`px-2 py-1 rounded text-[10px] transition-colors cursor-pointer ${
                            activeExportFormat === fmt.id
                              ? 'bg-[#E50914] text-white font-bold'
                              : 'bg-[#141414] text-[#777] hover:text-white'
                          }`}
                        >
                          {fmt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="relative rounded-xl bg-black border border-[#1f1f1f] p-4 text-xs font-mono text-[#00ff66] overflow-x-auto max-h-48 scrollbar-thin">
                    <button
                      onClick={() => handleCopyCode(getGeneratedConfig())}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#262626] text-white flex items-center gap-1 text-[10px] transition-colors cursor-pointer border border-[#333]"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'COPIED' : 'COPY CONFIG'}</span>
                    </button>
                    <pre className="whitespace-pre">{getGeneratedConfig()}</pre>
                  </div>
                </div>

                {/* Instant Purchase CTA */}
                <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#222] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#888]">FULL COMMERCIAL VJ & BROADCAST LICENSE</div>
                    <div className="text-xl font-black text-white font-heading">${plugin.price}.00 USD</div>
                  </div>
                  <button
                    onClick={() => {
                      playCyberClick(1100);
                      onOpenCheckout(plugin);
                    }}
                    className="py-3 px-6 rounded-lg bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 box-glow-red transition-all cursor-pointer"
                  >
                    <Key className="w-4 h-4" />
                    <span>GET INSTANT LICENSE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Specs & Features (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="p-8 rounded-2xl bg-[#090909] border border-[#1f1f1f] space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#E50914]/15 border border-[#E50914]/40 text-[#E50914] text-[10px] font-bold uppercase">
                      {plugin.category}
                    </span>
                    <span className="text-[10px] text-[#777]">{plugin.version}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                    {plugin.name}
                  </h2>
                  <p className="text-sm font-mono text-[#E50914] font-bold">
                    {plugin.tagline}
                  </p>
                  <p className="text-sm text-[#aaa] font-sans leading-relaxed">
                    {plugin.description}
                  </p>

                  {/* Formats Strip */}
                  <div className="pt-3 border-t border-[#1a1a1a] space-y-2">
                    <div className="text-xs uppercase tracking-wider text-[#777]">INCLUDED FORMATS & PLATFORMS</div>
                    <div className="flex flex-wrap gap-2">
                      {plugin.formats.map((fmt) => (
                        <span key={fmt} className="px-3 py-1 rounded-lg bg-[#141414] border border-[#242424] text-xs text-white">
                          ⚡ {fmt}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Professional Audio & Visual Specifications Matrix */}
                  <div className="pt-4 border-t border-[#1a1a1a] space-y-3">
                    <div className="text-xs uppercase tracking-wider text-[#E50914] font-bold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>PROFESSIONAL TECHNICAL SPECIFICATIONS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#222] space-y-1">
                        <div className="text-[10px] text-[#777] uppercase font-bold">COMPATIBLE HOSTS & DAWs</div>
                        <div className="text-white font-medium text-[11px] leading-relaxed">
                          {plugin.compatibleWith?.join(', ') || 'Ableton Live 11/12, Resolume Arena 7+, OBS Studio 30+, TouchDesigner 099, FL Studio, Reaper'}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#222] space-y-1">
                        <div className="text-[10px] text-[#777] uppercase font-bold">FORMAT STANDARDS SUPPORTED</div>
                        <div className="text-white font-medium text-[11px] leading-relaxed">
                          {plugin.formatsSupported?.join(' • ') || 'VST3, AU, CLAP, FFGL 2.2, OBS Native C++, Spout2, NDI 5.5'}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#222] space-y-1">
                        <div className="text-[10px] text-[#777] uppercase font-bold">GPU & SHADER LATENCY</div>
                        <div className="text-[#22c55e] font-medium text-[11px]">
                          {plugin.archSpecs?.latency || 'Zero Latency (0-Sample Buffer Pass-Through)'}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#222] space-y-1">
                        <div className="text-[10px] text-[#777] uppercase font-bold">ARCHITECTURE & PLATFORMS</div>
                        <div className="text-[#FF5A09] font-medium text-[11px]">
                          {plugin.archSpecs?.architecture || 'Apple Silicon (M1-M4 Metal) & Windows x64 DirectX 12'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-4 border-t border-[#1a1a1a]">
                    <div className="text-xs uppercase tracking-wider text-[#777]">CORE ARCHITECTURE FEATURES</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {plugin.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#ccc] font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compatibility Benchmarks */}
                <div className="p-6 rounded-2xl bg-[#090909] border border-[#1f1f1f] space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#FF5A09]" />
                    GPU PERFORMANCE & SYSTEM REQUIREMENTS
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-[#121212] border border-[#222]">
                      <div className="text-[10px] text-[#777]">TARGET RES</div>
                      <div className="text-sm font-bold text-white mt-0.5">{plugin.bundleSize}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#121212] border border-[#222]">
                      <div className="text-[10px] text-[#777]">GPU SCORE</div>
                      <div className="text-sm font-bold text-[#22c55e] mt-0.5">{plugin.lighthouseScore}/100</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#121212] border border-[#222]">
                      <div className="text-[10px] text-[#777]">ACTIVE VJS</div>
                      <div className="text-sm font-bold text-[#FF5A09] mt-0.5">{plugin.downloads}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#121212] border border-[#222]">
                      <div className="text-[10px] text-[#777]">SPOUT / NDI</div>
                      <div className="text-sm font-bold text-white mt-0.5">Zero-Latency</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: License Card (4 Cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#242424] space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#888]">COMMERCIAL LICENSE</span>
                    <span className="text-2xl font-black text-white font-heading">${plugin.price}.00</span>
                  </div>

                  <button
                    onClick={() => {
                      playCyberClick(1100);
                      onOpenCheckout(plugin);
                    }}
                    className="w-full py-4 px-4 rounded-xl bg-[#E50914] hover:bg-[#ff1f2a] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 box-glow-red transition-all cursor-pointer"
                  >
                    <Key className="w-4 h-4" />
                    <span>GET LICENSE KEY</span>
                  </button>

                  <div className="space-y-2 text-[11px] text-[#777] border-t border-[#1c1c1c] pt-4">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>Instant License Pass (DS-XXXX-XXXX-XXXX)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#FF5A09]" />
                      <span>Unlimited Commercial VJ Stages & Broadcasts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>Lifetime Updates & Wire Patches</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTATION */}
        {activeTab === 'docs' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Nav (3 Cols) */}
            <div className="lg:col-span-3 space-y-1">
              {[
                { id: 'installation', label: 'Quick Installation' },
                { id: 'daw-setup', label: 'Ableton Live & DAWs (VST3/AU/CLAP)' },
                { id: 'resolume-setup', label: 'Resolume Arena & Wire' },
                { id: 'obs-setup', label: 'OBS Studio & ShaderFX' },
                { id: 'touchdesigner-setup', label: 'TouchDesigner .TOX' },
                { id: 'midi-osc', label: 'MIDI & OSC Mapping' },
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    playCyberClick(600);
                    setActiveDocSection(sec.id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeDocSection === sec.id
                      ? 'bg-[#181818] text-[#E50914] font-bold border-l-2 border-[#E50914]'
                      : 'text-[#888] hover:text-white hover:bg-[#101010]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Right Content (9 Cols) */}
            <div className="lg:col-span-9 p-8 rounded-2xl bg-[#090909] border border-[#1f1f1f] space-y-6 text-xs text-[#bbb] font-sans leading-relaxed">
              {activeDocSection === 'installation' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white font-heading">
                    QUICK INSTALLATION GUIDE
                  </h3>
                  <p>
                    All DIM$PRAT plugins include pre-compiled 64-bit binaries for both Windows (DirectX 12 / Vulkan) and macOS (Metal Apple Silicon M1/M2/M3/M4 & Intel).
                  </p>
                  <div className="p-4 rounded-xl bg-black border border-[#222] font-mono text-[11px] text-[#00ff66]">
                    <div># 1. Download and extract your plugin archive</div>
                    <div># 2. Copy .vst3 / .component / .ffgl / .dll into your host plugins directory</div>
                    <div># 3. Enter your generated license key on first run</div>
                  </div>
                </div>
              )}

              {activeDocSection === 'daw-setup' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white font-heading">
                    ABLETON LIVE & DAW INTEGRATION (VST3 / AU / CLAP)
                  </h3>
                  <p>
                    Install the VST3 or AU plugin into your standard system plugin folder:
                  </p>
                  <div className="p-3 rounded-lg bg-black border border-[#222] font-mono text-[11px] text-[#FF5A09] space-y-1">
                    <div>macOS: /Library/Audio/Plug-Ins/VST3/ or /Components/ (AU)</div>
                    <div>Windows: C:\Program Files\Common Files\VST3\</div>
                  </div>
                  <p>
                    In Ableton Live, FL Studio, or Reaper, insert the plugin onto an Audio or Return Track. Enable Spout2 / NDI video stream output to transmit real-time GPU visuals straight to Resolume Arena or OBS with zero latency.
                  </p>
                </div>
              )}

              {activeDocSection === 'resolume-setup' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white font-heading">
                    RESOLUME ARENA 7 & WIRE SETUP
                  </h3>
                  <p>
                    Place the <code>.bundle</code> (macOS) or <code>.dll</code> (Windows) into:
                  </p>
                  <div className="p-3 rounded-lg bg-black border border-[#222] font-mono text-[11px] text-[#FF5A09]">
                    Documents/Resolume Arena/Extra Effects/
                  </div>
                  <p>
                    Restart Resolume Arena. The plugin will appear in your <strong>Sources</strong> or <strong>Effects</strong> panel under <code>DIM$PRAT</code>.
                  </p>
                </div>
              )}

              {activeDocSection === 'obs-setup' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white font-heading">
                    OBS STUDIO 30+ SHADERFX INTEGRATION
                  </h3>
                  <p>
                    To add as a filter to any Video Capture Device or Game Capture source:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Right-click your source in OBS and select <strong>Filters</strong>.</li>
                    <li>Under Effect Filters, click <strong>+</strong> and choose <strong>User-defined Shader (ShaderFX)</strong>.</li>
                    <li>Browse and select the provided <code>.effect</code> shader file.</li>
                  </ol>
                </div>
              )}

              {activeDocSection === 'touchdesigner-setup' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white font-heading">
                    TOUCHDESIGNER .TOX SETUP
                  </h3>
                  <p>
                    Drag and drop the <code>{plugin.id}.tox</code> directly into your TouchDesigner network editor. Connect your Audio Device In CHOP to the audio frequency input to activate instant real-time FFT reaction.
                  </p>
                </div>
              )}

              {activeDocSection === 'midi-osc' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white font-heading">
                    MIDI & OSC CC AUTOMATION
                  </h3>
                  <p>
                    All parameters (Color, Speed, Intensity, Glitch, Bloom) expose standard OSC endpoints (e.g., <code>/dimsprat/{plugin.id}/intensity</code>) for hardware control surfaces like APC40, Launchpad, and MIDI Fighter Twister.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
