"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "600", "800"] });

export default function HeroTextOverlays() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  const shouldReduceMotion = useReducedMotion();

  // Phase 1 (0.0 to 0.28): Main Title
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.28], [1, 1, 0, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.28], [0, -150]);
  const titleScale = useTransform(scrollYProgress, [0, 0.28], [1, 1.05]);

  // Phase 2 (0.28 to 0.58): Subtitle
  const subOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.55, 0.58], [0, 1, 1, 0]);
  const subY = useTransform(scrollYProgress, [0.25, 0.4, 0.58], [100, 0, -100]);

  // Phase 3 (0.58 to 0.82): Microcopy
  const microOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.8, 0.82], [0, 1, 1, 0]);
  const microY = useTransform(scrollYProgress, [0.55, 0.65, 0.82], [100, 0, -100]);

  // Phase 4 (0.82 to 1.0): CTA Area remains pinned at the end
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.85, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.8, 0.9], [100, 0]);

  // Ensure absolute position components do not block clicks if hidden
  const ctaPointerEvents = useTransform(scrollYProgress, (latest) => (latest > 0.75 ? "auto" : "none"));

  return (
    <div className={`absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden ${outfit.className}`}>
      <div className="relative flex flex-col items-center justify-center w-full h-full text-white px-6 text-center">
        
        {/* Title Phase */}
        <motion.div 
          style={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: titleOpacity, y: titleY, scale: titleScale, position: shouldReduceMotion ? 'relative' : 'absolute' }}
          className={`inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-4`}
        >
          <h1 className="text-5xl sm:text-7xl md:text-[84px] lg:text-[100px] font-extrabold tracking-tight drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)] leading-tight max-w-6xl">
            AquaNova. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#00E5FF]">
              Your voyage, reimagined.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle Phase */}
        <motion.div 
          style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: subOpacity, y: subY, position: shouldReduceMotion ? 'relative' : 'absolute' }}
          className={`inset-x-0 flex flex-col items-center justify-center px-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-4xl leading-snug text-white/95">
            Hybrid-electric catamaran. <br className="hidden sm:block" />
            <span className="text-[#00E5FF]">AI energy orchestration.</span> <br className="hidden sm:block" />
            Silent, zero-odour journeys.
          </h2>
        </motion.div>

        {/* Microcopy Phase */}
        <motion.div 
          style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: microOpacity, y: microY, position: shouldReduceMotion ? 'relative' : 'absolute' }}
          className={`inset-x-0 flex justify-center px-4`}
        >
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <p className="text-2xl sm:text-3xl font-medium text-white/90 tracking-wide">
              Discover the future of cruising — <br className="sm:hidden" />
              <span className="text-white font-bold">efficient, silent, beautiful.</span>
            </p>
          </div>
        </motion.div>

        {/* CTA Phase */}
        <motion.div 
          style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointerEvents, position: shouldReduceMotion ? 'relative' : 'absolute' }}
          className={`inset-x-0 mt-32 md:mt-48 flex flex-col sm:flex-row items-center justify-center gap-6`}
        >
          <a
            href="#modes"
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#00E5FF] to-[#005f73] hover:from-[#00FFD1] hover:to-[#00E5FF] text-[#001827] rounded-full text-xl font-extrabold shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_50px_rgba(0,229,255,0.8)] transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#00E5FF]/50"
            role="button"
            tabIndex={0}
          >
            Discover Modes
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/20 hover:border-[#00E5FF] text-white rounded-full text-xl font-bold hover:bg-white/10 backdrop-blur-md transition-all focus:outline-none focus:ring-4 focus:ring-white/50"
            role="button"
            tabIndex={0}
          >
            Request Info
          </a>
        </motion.div>

      </div>
    </div>
  );
}
