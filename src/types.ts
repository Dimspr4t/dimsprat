export interface EventItem {
  id: string;
  episode: string;
  title: string;
  subTitle: string;
  date: string;
  time: string;
  rawDate: string; // ISO date for countdown
  venue: string;
  location: string;
  posterUrl: string;
  photographer: string;
  status: 'UPCOMING' | 'SOLD_OUT' | 'ARCHIVED';
  price: string;
  lineup: string[];
  description: string;
  tags: string[];
}

export interface PluginItem {
  id: string;
  slug: string;
  name: string;
  packageNpm: string;
  tagline: string;
  version: string;
  price: number;
  rating: number;
  downloads: string;
  bundleSize: string; // e.g. "4K 60-120FPS GPU Ready"
  lighthouseScore: number; // e.g. 99 (GPU Benchmark Score)
  frameworks: string[]; // e.g. ['Resolume Arena 7+', 'OBS Studio 30+', 'TouchDesigner', 'FFGL / Wire', 'Spout2 / NDI']
  category: 'RESOLUME ARENA' | 'OBS STUDIO' | 'TOUCHDESIGNER' | 'LIVE VJ & STAGE';
  accentColor: string;
  badge?: string;
  description: string;
  features: string[];
  formats: string[]; // e.g. ['FFGL 2.2', 'Resolume Wire .wire', 'OBS Plugin (.dll / .dylib)', 'TouchDesigner .TOX', 'Spout2 Bridge']
  compatibleWith: string[]; // e.g. ['Ableton Live', 'Resolume Arena 7+', 'OBS Studio 30+', 'TouchDesigner 099', 'FL Studio', 'Reaper']
  formatsSupported: string[]; // e.g. ['VST3', 'AU', 'CLAP', 'FFGL 2.2', 'OBS Native C++', 'Spout2', 'NDI 5', 'Wire']
  archSpecs?: {
    bitDepth: string;
    latency: string;
    architecture: string;
    osSupport: string;
  };
  visualEngineType: 'glsl-tunnel' | 'rgb-warp' | 'spectra-fft' | 'stinger-hud' | 'stage-lasers' | 'scanline-crt';
  defaultPlaygroundProps?: {
    color?: string;
    speed?: number;
    intensity?: number;
    glitchRate?: number;
    bloom?: number;
    audioReactive?: boolean;
    resolution?: string;
  };
}

export interface MerchItem {
  id: string;
  name: string;
  code: string;
  price: number;
  category: 'HOODIE' | 'TEE' | 'ACCESSORY' | 'HEADWEAR';
  image: string;
  secondaryImage?: string;
  stock: number;
  isLimited: boolean;
  specs: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
}

export interface CartItem {
  item: MerchItem;
  selectedSize: string;
  quantity: number;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  category: 'EVENT' | 'PLUGIN SUITE' | 'MERCH DROP' | 'RECOGNITION';
  description: string;
  stats?: string;
  location?: string;
}

export interface GalleryPhoto {
  id: string;
  caption: string;
  band: string;
  photographer: string;
  timestamp: string;
  imageUrl: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export interface TalentApplication {
  talentName: string;
  genre: string;
  contactEmail: string;
  phone: string;
  city: string;
  socialLink: string;
  audioDemoUrl: string;
  techRiderNotes: string;
}

export interface EventRequestProposal {
  proposerName: string;
  email: string;
  targetCity: string;
  proposedVenue: string;
  estimatedAttendees: string;
  preferredMonth: string;
  proposedLineupIdeas: string;
}

export interface LicenseKeyRecord {
  key: string;
  pluginId: string;
  pluginName: string;
  customerEmail: string;
  customerName: string;
  maxDomains: number;
  activatedDomains: string[];
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  createdAt: string;
}
