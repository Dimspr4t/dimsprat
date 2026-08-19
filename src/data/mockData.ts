import { EventItem, PluginItem, MerchItem, TimelineMilestone, GalleryPhoto } from '../types.ts';

export const FEATURED_EVENT: EventItem = {
  id: 'eps-02',
  episode: 'EPISODE 02',
  title: 'ROCK & METAL NIGHT EPS.2',
  subTitle: 'THE UNDERGROUND RESISTANCE // LIVE HEAVY SONICS & VISUAL EXPERIMENT',
  date: 'SATURDAY, 24 OCTOBER 2026',
  time: '19:00 - LATE (WIB / GMT+7)',
  rawDate: '2026-10-24T19:00:00+07:00',
  venue: 'THE BUNKER VAULT - SECTOR 7',
  location: 'South Jakarta Underground Complex',
  posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
  photographer: 'ALI TIM BR',
  status: 'UPCOMING',
  price: 'IDR 150.000 / $10 USD',
  lineup: [
    'VALKYRIE OVERDRIVE (Sludge / Doom)',
    'SILICON GRAVE (Cyber Industrial)',
    'VOID PULSE (Hardcore / Deathcore)',
    'DIM$PRAT (Live Audio-Visual Set & Modular Havoc)'
  ],
  description: 'The second installment of the chaotic underground gathering uniting heavy metal sonic warfare, custom modular synthesizers, and raw street energy. High sound pressure levels, analog tube distortion, and uncompromising energy.',
  tags: ['LIVE METAL', 'UNDERGROUND', 'MODULAR SYNTH', 'ANALOG SOUND', 'COMMUNITY GATHERING']
};

export const OTHER_EVENTS: EventItem[] = [
  {
    id: 'eps-01',
    episode: 'EPISODE 01',
    title: 'ROCK & METAL NIGHT: GENESIS',
    subTitle: 'THE INITIAL BREACH',
    date: '14 MARCH 2026',
    time: '20:00 - 02:00',
    rawDate: '2026-03-14T20:00:00+07:00',
    venue: 'DISTRICT 9 WAREHOUSE, JKT',
    location: 'Jakarta Underground Area',
    posterUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
    photographer: 'ALI TIM BR',
    status: 'ARCHIVED',
    price: 'SOLD OUT (350+ Souls)',
    lineup: ['DIM$PRAT', 'ACID VEIN', 'CORROSION CORE', 'RUSTED NAIL'],
    description: 'The monumental inaugural night where heavy riffs and digital distortion collided before an electric crowd.',
    tags: ['ARCHIVED', 'SOLD OUT', 'ORIGINAL']
  },
  {
    id: 'eps-03',
    episode: 'EPISODE 03',
    title: 'CYBER-CORE TRANSMISSION',
    subTitle: 'INDUSTRIAL HARSH NOISE & SLUDGE FEST',
    date: '12 DECEMBER 2026',
    time: '21:00 - TILL DAWN',
    rawDate: '2026-12-12T21:00:00+07:00',
    venue: 'UNDERGROUND SUB-STATION B4',
    location: 'Bandung Industrial Hub',
    posterUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1000&auto=format&fit=crop',
    photographer: 'ALI TIM BR',
    status: 'UPCOMING',
    price: 'IDR 175.000',
    lineup: ['DIM$PRAT (B2B HARSH MODULAR)', 'TOXIC PROTOCOL', 'CYBER FLESH'],
    description: 'Upcoming multi-city warehouse takeover with quadraphonic custom audio walls.',
    tags: ['ANNOUNCED', 'BANDUNG', 'QUADRAPHONIC']
  }
];

export const PLUGINS_DATA: PluginItem[] = [
  {
    id: 'neo-halo-ffgl',
    slug: 'neo-halo-ffgl',
    name: 'NEO-HALO FFGL SHADER',
    packageNpm: '@dimsprat/neo-halo-ffgl',
    tagline: 'Raymarched Volumetric Neon Ring & Beat-Synced Tunnel for Resolume 7 & Wire',
    version: 'v3.2.0',
    price: 49,
    rating: 4.98,
    downloads: '118,500+',
    bundleSize: '4K 120FPS GPU Native',
    lighthouseScore: 99,
    frameworks: ['Resolume Arena 7+', 'Resolume Wire', 'Spout2 / NDI', 'FFGL 2.2'],
    category: 'RESOLUME ARENA',
    accentColor: '#E50914',
    badge: 'BESTSELLER // FFGL 2.2',
    visualEngineType: 'glsl-tunnel',
    formats: ['FFGL 2.2 (macOS Metal / Win DirectX 12)', 'Resolume Wire Patch (.wire)', 'Spout2 & NDI 5 Bridge', 'Resolume Arena 7.18+ Deck'],
    compatibleWith: ['Resolume Arena 7+', 'Resolume Wire', 'Ableton Live 11/12 (via Spout)', 'OBS Studio 30+', 'TouchDesigner 099'],
    formatsSupported: ['FFGL 2.2', 'Resolume Wire (.wire)', 'VST3 (Audio-Reactive Sync)', 'Spout2', 'NDI 5.5'],
    archSpecs: {
      bitDepth: '64-bit Floating Point',
      latency: 'Zero Latency (0 Samples)',
      architecture: 'Apple Silicon (M1-M4) & Windows x64',
      osSupport: 'macOS 12+ / Windows 10/11'
    },
    description: 'Hardware-accelerated volumetric neon portal and tunnel generator with audio-reactive beat pulsator, chromatic dispersion, and zero dropped frames.',
    features: [
      'Zero-latency 64-bit FFGL 2.2 C++ GPU compiled shader pipeline',
      'OSC / MIDI audio-reactive beat trigger & transient sensitivity controls',
      'Full Resolume Wire exposed parameter graph with automated dashboard knobs',
      'Tested on dual 4K LED walls at 120 FPS with ultra-low VRAM footprint'
    ],
    defaultPlaygroundProps: {
      color: '#E50914',
      speed: 0.8,
      intensity: 75,
      glitchRate: 20,
      bloom: 85,
      audioReactive: true,
      resolution: '4K UHD'
    }
  },
  {
    id: 'obs-stinger-hud',
    slug: 'obs-stinger-hud',
    name: 'OBS DYNAMIC STINGER & HUD',
    packageNpm: '@dimsprat/obs-stinger-hud',
    tagline: 'C++ Native OBS Plugin with WebSocket Beat Sync, Cyberpunk Reticle & Stream Stinger',
    version: 'v2.1.4',
    price: 29,
    rating: 4.94,
    downloads: '84,200+',
    bundleSize: 'OBS 30+ Plugin (.dll/.dylib)',
    lighthouseScore: 100,
    frameworks: ['OBS Studio 30+', 'OBS WebSocket 5.x', 'StreamElements', 'Browser Dock'],
    category: 'OBS STUDIO',
    accentColor: '#FF5A09',
    badge: 'STREAMER ESSENTIAL',
    visualEngineType: 'stinger-hud',
    formats: ['OBS Studio 30+ Native C++ Plugin', 'Custom Browser Dock HTML5/WebGL', 'Automated Stinger Transition (.mov alpha)'],
    compatibleWith: ['OBS Studio 30+', 'Streamlabs Desktop', 'Ableton Live (MIDI Cues)', 'Elgato Stream Deck', 'vMix 27+'],
    formatsSupported: ['OBS Native C++ (.dll / .so / .dylib)', 'OBS WebSocket 5.x', 'Spout2', 'NDI 5'],
    archSpecs: {
      bitDepth: '64-bit Native C++',
      latency: '<0.2ms Direct Buffer Sync',
      architecture: 'Universal Binary (Apple Silicon & x86_64)',
      osSupport: 'Windows 10/11 & macOS 13+'
    },
    description: 'Real-time interactive tactical HUD overlay with dynamic audio waveform bars, stream status telemetry, and automated alpha-channel stinger scene transitions.',
    features: [
      'Native C++ OBS source filter with direct GPU texture sharing',
      'Automatic microphone / desktop audio spectrum waveform integration',
      'Configurable target crosshair reticle, speedometers, and timestamp telemetry',
      'OBS WebSocket 5.0 event triggers for automated alert stingers'
    ],
    defaultPlaygroundProps: {
      color: '#FF5A09',
      speed: 0.6,
      intensity: 65,
      glitchRate: 35,
      bloom: 70,
      audioReactive: true,
      resolution: '1080p 60fps'
    }
  },
  {
    id: 'cyber-glitch-warp',
    slug: 'cyber-glitch-warp',
    name: 'CYBER-GLITCH WARP FFGL',
    packageNpm: '@dimsprat/cyber-glitch-warp',
    tagline: 'Live Concert RGB Split Displacement, Feedback Echo & Asymmetric Pixel Shifter',
    version: 'v2.4.1 PRO',
    price: 39,
    rating: 4.96,
    downloads: '92,400+',
    bundleSize: 'DirectX 12 / Metal Core',
    lighthouseScore: 98,
    frameworks: ['Resolume Arena 7+', 'Resolume Avenue', 'FFGL 2.2', 'TouchDesigner'],
    category: 'RESOLUME ARENA',
    accentColor: '#E50914',
    badge: 'FLAGSHIP VJ EFFECT',
    visualEngineType: 'rgb-warp',
    formats: ['FFGL 2.2 64-bit Source & Effect Plugin', 'Resolume Clip Deck Presets (.avc)', 'Universal macOS Metal & Windows DX12'],
    compatibleWith: ['Resolume Arena 7.14+', 'Resolume Avenue 7+', 'Ableton Live 11/12', 'TouchDesigner 099', 'MadMapper 5'],
    formatsSupported: ['FFGL 2.2', 'Resolume Deck (.avc)', 'VST3 / CLAP (Audio Modulation)', 'Spout2 / NDI'],
    archSpecs: {
      bitDepth: '64-bit Float Shader Core',
      latency: 'Zero Latency (0 Frames)',
      architecture: 'macOS Metal 3 / Windows DX12 & Vulkan',
      osSupport: 'macOS 12+ / Windows 10/11 64-bit'
    },
    description: 'Heavy industrial digital destruction effect featuring multi-band RGB phase shifting, dynamic scanline tearing, and programmable feedback echoes.',
    features: [
      'Multi-axis RGB displacement with discrete red/cyan channel delay buffers',
      'Dynamic scanline jitter with BPM-synced step frequency multipliers',
      'Integrated feedback decay sculptors with chromatic color drift',
      'MIDI CC mapping tailored for Akai APC40 and MIDI Fighter 3D controllers'
    ],
    defaultPlaygroundProps: {
      color: '#E50914',
      speed: 1.1,
      intensity: 90,
      glitchRate: 75,
      bloom: 60,
      audioReactive: true,
      resolution: '4K UHD'
    }
  },
  {
    id: 'hyper-spectra-tox',
    slug: 'hyper-spectra-tox',
    name: 'HYPER-SPECTRA 3D .TOX',
    packageNpm: '@dimsprat/hyper-spectra-tox',
    tagline: 'Real-Time FFT Frequency 3D Point-Cloud Particle Matrix with Spout2 Zero Latency',
    version: 'v1.9.0',
    price: 45,
    rating: 4.91,
    downloads: '61,300+',
    bundleSize: 'TouchDesigner 099 Component',
    lighthouseScore: 99,
    frameworks: ['TouchDesigner 099', 'Spout2 / NDI 5.5', 'GLSL 4.6', 'Resolume Arena'],
    category: 'TOUCHDESIGNER',
    accentColor: '#FF5A09',
    badge: 'POPULAR .TOX',
    visualEngineType: 'spectra-fft',
    formats: ['TouchDesigner 099 Component (.tox)', 'Custom GLSL Geometry Compute Shader', 'Spout2 Zero-Memory-Copy High Speed Bridge'],
    compatibleWith: ['TouchDesigner 099 (2023+)', 'Ableton Live 11/12 (TDAbleton)', 'Resolume Arena 7+', 'OBS Studio 30+', 'Bitwig Studio 5'],
    formatsSupported: ['TouchDesigner .TOX', 'GLSL 4.6 Compute', 'Spout2', 'NDI 5.5', 'OSC / MIDI'],
    archSpecs: {
      bitDepth: '32/64-bit IEEE Floating Point',
      latency: 'Zero Memory-Copy Latency (Direct GPU Handle)',
      architecture: 'Apple Silicon (Metal) & NVIDIA CUDA / Vulkan',
      osSupport: 'macOS Monterey+ / Windows 10/11'
    },
    description: 'Generative 3D audio-reactive point cloud synthesizer calculating 32-band real-time audio FFT frequencies into millions of fluid GPU particles.',
    features: [
      'GPU instanced 3D particle array driven by raw audio frequency buffers',
      'Seamless Spout2 & NDI 5.5 streaming directly into Resolume Arena or OBS',
      'Python UI panel with preset saving, MIDI mapping, and camera orbit control',
      'High dynamic range (HDR) color mapping with blooming glow shaders'
    ],
    defaultPlaygroundProps: {
      color: '#FF5A09',
      speed: 0.5,
      intensity: 80,
      glitchRate: 15,
      bloom: 90,
      audioReactive: true,
      resolution: '4K 120FPS'
    }
  },
  {
    id: 'neo-broadcast-crt',
    slug: 'neo-broadcast-crt',
    name: 'NEO-BROADCAST CRT & FLARE',
    packageNpm: '@dimsprat/neo-broadcast-crt',
    tagline: 'Hardware-Accelerated Retro-Future Scanline, Chromatic Bleed & Halftone Filter for OBS',
    version: 'v2.0.2',
    price: 24,
    rating: 4.89,
    downloads: '73,100+',
    bundleSize: 'ShaderFX OBS Filter',
    lighthouseScore: 100,
    frameworks: ['OBS Studio 30+', 'Streamlabs Desktop', 'After Effects MOGRT'],
    category: 'OBS STUDIO',
    accentColor: '#E50914',
    visualEngineType: 'scanline-crt',
    formats: ['OBS Studio ShaderFX Filter (.effect)', 'OBS Lua Script Automation', 'After Effects / Premiere FFX Preset'],
    compatibleWith: ['OBS Studio 29/30+', 'Streamlabs Desktop', 'Adobe Premiere Pro 2024', 'After Effects 2024', 'DaVinci Resolve 19'],
    formatsSupported: ['OBS ShaderFX (.effect)', 'FFX Presets', 'OFX Video Plugin', 'Lua Script Automations'],
    archSpecs: {
      bitDepth: '32-bit RGBA High Dynamic Range',
      latency: '<0.1ms GPU Processing',
      architecture: 'Universal GPU (Direct3D 11/12, OpenGL, Metal)',
      osSupport: 'Windows 10/11 & macOS 12+'
    },
    description: 'Transforms clean webcam streams and gameplay footage into authentic cyberpunk CRT monitors with curved phosphors, tape jitter, and anamorphic lens flares.',
    features: [
      'Ultra-efficient GPU pixel shader with <0.5% CPU utilization during live stream',
      'Phosphor mask patterns (Aperture Grille, Shadow Mask, Slot Mask)',
      'Adjustable tape glitch hum bar, rolling sync errors, and barrel distortion',
      'One-click Stream Deck hotkey integration for dynamic glitch triggers'
    ],
    defaultPlaygroundProps: {
      color: '#E50914',
      speed: 0.4,
      intensity: 70,
      glitchRate: 40,
      bloom: 75,
      audioReactive: false,
      resolution: '1080p 60fps'
    }
  },
  {
    id: 'brutalist-stage-led',
    slug: 'brutalist-stage-led',
    name: 'BRUTALIST STAGE LASERS & LED',
    packageNpm: '@dimsprat/brutalist-stage-led',
    tagline: 'High-Energy Festival Stage Visuals, Wire Vector Lasers & DMX Strobe Array',
    version: 'v3.5.0',
    price: 59,
    rating: 4.99,
    downloads: '105,800+',
    bundleSize: '4K ProRes 4444 Alpha + Wire',
    lighthouseScore: 99,
    frameworks: ['Resolume Arena 7+', 'Resolume Wire', 'GrandMA / DMX', 'Spout2'],
    category: 'LIVE VJ & STAGE',
    accentColor: '#E50914',
    badge: 'FESTIVAL READY',
    visualEngineType: 'stage-lasers',
    formats: ['Resolume Arena Composition (.avc)', 'Resolume Wire Source (.wire)', '4K ProRes 4444 Transparent Alpha Clips Pack (25 Loops)'],
    compatibleWith: ['Resolume Arena 7.18+', 'Resolume Wire 7+', 'GrandMA 2/3 (Art-Net/DMX)', 'Ableton Live 11/12 (MIDI/OSC)', 'Avolites Titan'],
    formatsSupported: ['Resolume Deck (.avc)', 'Resolume Wire (.wire)', 'DMX / Art-Net 4', 'ProRes 4444 Alpha', 'Spout2'],
    archSpecs: {
      bitDepth: '12-bit ProRes 4444 & 64-bit Wire Engine',
      latency: 'Zero Latency Hardware Pass-Through',
      architecture: 'Hardware Accelerated H.265 / DXV3 / ProRes',
      osSupport: 'Universal Windows & macOS'
    },
    description: 'Turnkey arena festival stage visual system featuring razor-sharp parametric vector lasers, rapid strobe blinds, and reactive wireframe geometry.',
    features: [
      'Parametric vector beam physics synced to live BPM or Tap Tempo',
      'DMX Art-Net input bridge to synchronize with stage lighting fixtures',
      'Includes 25 seamless 4K 60fps ProRes 4444 Alpha channel loop clips',
      'Pre-configured Resolume Arena layer structure with autopilot auto-triggers'
    ],
    defaultPlaygroundProps: {
      color: '#E50914',
      speed: 1.4,
      intensity: 95,
      glitchRate: 50,
      bloom: 95,
      audioReactive: true,
      resolution: '4K Stage Master'
    }
  }
];

export const MERCH_DATA: MerchItem[] = [
  {
    id: 'hoodie-cyber-grunge-01',
    name: 'DIM$PRAT HEAVYWEIGHT HOODIE',
    code: 'DMS-HD-002',
    price: 85,
    category: 'HOODIE',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=900&auto=format&fit=crop',
    stock: 24,
    isLimited: true,
    specs: [
      '480 GSM 100% French Terry Cotton',
      'Oversized Boxy Dropped-Shoulder Silhouette',
      'Distressed Crimson & Silver Plastisol Screenprint',
      'Laser-Engraved Matte Black Metal Aglets'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'tee-acid-wash-02',
    name: 'ROCK & METAL NIGHT VINTAGE ACID TEE',
    code: 'DMS-TE-019',
    price: 42,
    category: 'TEE',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop',
    stock: 42,
    isLimited: true,
    specs: [
      '260 GSM Heavyweight Combed Cotton',
      'Custom Acid-Washed Charcoal Grey Finish',
      'Raw Distress Ribbed Collar & Hem Stitch',
      'Front & Back Dual-Screen Cyber-Grunge Art'
    ],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'rig-tactical-bag-03',
    name: 'TACTICAL CYBER UTILITY CHEST RIG',
    code: 'DMS-BG-007',
    price: 58,
    category: 'ACCESSORY',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=900&auto=format&fit=crop',
    stock: 15,
    isLimited: true,
    specs: [
      '1000D Waterproof Cordura Ballistic Nylon',
      'Quick-Release Fidlock Magnetic Buckles',
      'Velcro Patch Area with Reflective Red Bar',
      'Concealed Pockets for IEMs & Audio Flash Drives'
    ],
    sizes: ['M', 'L']
  }
];

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: '2022',
    title: 'THE GENESIS & BASEMENT EXPERIMENTS',
    category: 'PLUGIN SUITE',
    description: 'Started engineering custom C++ audio and GPU visual algorithms to recreate brutal saturation and stage visuals inside creative workstations.',
    stats: '1st Plugin Released: Warp-X',
    location: 'Jakarta Underground'
  },
  {
    year: '2023',
    title: 'FIRST LIVE METAL WORKSHOP & SOUND R&D',
    category: 'EVENT',
    description: 'Curated DIY sound and visual workshops for independent rock and metal bands, integrating live modular FX with analog tube rigs.',
    stats: '8 Indie Bands Equipped',
    location: 'Bandung & JKT'
  },
  {
    year: '2024',
    title: 'LAUNCH OF GRUNGE-CORE SUITE & 50K COMMUNITY',
    category: 'PLUGIN SUITE',
    description: 'Released the landmark Grunge-Core visual & audio engine to international acclaim across metal producers and VJ stage artists.',
    stats: '50,000+ Downloads Worldwide'
  },
  {
    year: '2025',
    title: 'CYBER-STREETWEAR DROP & ROCK & METAL EPS.1',
    category: 'MERCH DROP',
    description: 'Merged visual fashion with sonic identity. Episode 1 gathered 350+ attendees in a packed industrial underground warehouse.',
    stats: 'Sold Out within 48 Hours',
    location: 'Warehouse District 9'
  },
  {
    year: '2026',
    title: 'ROCK & METAL NIGHT EPS.2 & MONOREPO SUITE',
    category: 'EVENT',
    description: 'Expanding the ecosystem into unified subdomains (events, plugins, merch) and staging Episode 2: The Resistance.',
    stats: 'Current Live Operations',
    location: 'The Bunker Vault'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'ph-1',
    caption: 'Moshpit eruption during Valkyrie Overdrive breakdown',
    band: 'VALKYRIE OVERDRIVE',
    photographer: 'ALI TIM BR',
    timestamp: 'EPS.1 // 23:42 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop',
    aspectRatio: 'landscape'
  },
  {
    id: 'ph-2',
    caption: 'Front stage crowd surge under strobe lighting',
    band: 'SILICON GRAVE',
    photographer: 'ALI TIM BR',
    timestamp: 'EPS.1 // 22:15 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop',
    aspectRatio: 'portrait'
  },
  {
    id: 'ph-3',
    caption: 'DIM$PRAT tweaking modular distortion parameters live on stage',
    band: 'DIM$PRAT LIVE SET',
    photographer: 'ALI TIM BR',
    timestamp: 'EPS.1 // 01:05 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=900&auto=format&fit=crop',
    aspectRatio: 'landscape'
  },
  {
    id: 'ph-4',
    caption: 'Distorted bass amplifier cabinet pushed to redline limit',
    band: 'VOID PULSE',
    photographer: 'ALI TIM BR',
    timestamp: 'EPS.1 // 21:50 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=900&auto=format&fit=crop',
    aspectRatio: 'square'
  },
  {
    id: 'ph-5',
    caption: 'Underground crowd showing horns in the dense haze',
    band: 'THE PIT',
    photographer: 'ALI TIM BR',
    timestamp: 'EPS.1 // 00:30 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=900&auto=format&fit=crop',
    aspectRatio: 'portrait'
  },
  {
    id: 'ph-6',
    caption: 'Aftermath: Drum sticks shattered and exhausted smiles',
    band: 'FINAL ENCORE',
    photographer: 'ALI TIM BR',
    timestamp: 'EPS.1 // 02:20 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop',
    aspectRatio: 'landscape'
  }
];
