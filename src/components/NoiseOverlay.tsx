import React from 'react';

interface NoiseOverlayProps {
  intensity?: 'light' | 'medium' | 'heavy';
  showScanlines?: boolean;
}

export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  intensity = 'medium',
  showScanlines = true,
}) => {
  const opacityClass =
    intensity === 'light'
      ? 'opacity-[0.03]'
      : intensity === 'heavy'
      ? 'opacity-[0.09]'
      : 'opacity-[0.05]';

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none" aria-hidden="true">
      {/* SVG Procedural Grain Noise Overlay */}
      <svg
        className={`absolute inset-0 w-full h-full ${opacityClass} mix-blend-overlay`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* CRT Scanline Effect */}
      {showScanlines && (
        <div className="absolute inset-0 scanline-effect opacity-35 pointer-events-none" />
      )}

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
    </div>
  );
};
