import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for fluid movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate percentage string or width
  const scaleX = smoothProgress;
  const shadowOpacity = useTransform(smoothProgress, [0, 0.05, 1], [0, 1, 1]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Background Track */}
      <div className="w-full h-[2px] bg-black/50 backdrop-blur-sm" />

      {/* Glowing Neon Cyber Red to Amber Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#E50914] via-[#FF5A09] to-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.8)]"
        style={{
          scaleX,
          opacity: shadowOpacity,
        }}
      />
    </div>
  );
};
