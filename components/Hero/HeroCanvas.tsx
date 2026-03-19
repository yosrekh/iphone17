"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useMotionValueEvent, useTransform, MotionValue } from "framer-motion";

const FRAME_COUNT = 280;
const IMAGES_PATH = "/images/";

// Professional 11-stage animation checkpoints based on custom design
const STOPS = [0, 68, 113, 136, 180, 203, 229, 260, 279];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallbackMode, setFallbackMode] = useState(false);

  const stepRef = useRef(0);
  const targetFrame = useMotionValue(STOPS[0]);

  // High-end spring physics so it smoothly "plays" to the checkpoints
  const smoothFrame = useSpring(targetFrame, {
    stiffness: 5,    // Extremely weak pulling force
    damping: 10,     // High friction so it glides very slowly
    mass: 3,         // Very heavy object
    restDelta: 0.1
  });

  // Fade out intro text on first scroll
  const introOpacity = useTransform(smoothFrame, [0, 50], [1, 0]);
  const introY = useTransform(smoothFrame, [0, 50], [0, -50]);

  // Premium Point Overlays for each step
  const opacity1 = useTransform(smoothFrame, [50, 68, 85], [0, 1, 0]);
  const opacity2 = useTransform(smoothFrame, [90, 113, 125], [0, 1, 0]);
  const opacity3 = useTransform(smoothFrame, [125, 136, 150], [0, 1, 0]);
  const opacity4 = useTransform(smoothFrame, [160, 180, 190], [0, 1, 0]);
  const opacity5 = useTransform(smoothFrame, [190, 203, 215], [0, 1, 0]);
  const opacity6 = useTransform(smoothFrame, [215, 229, 245], [0, 1, 0]);
  const opacity7 = useTransform(smoothFrame, [245, 260, 270], [0, 1, 0]);
  const opacity8 = useTransform(smoothFrame, [270, 279], [0, 1]);

  const yPos = useTransform(smoothFrame, (latest) => 20 - (latest % 20) * 0.2);

  // 1. Preload Logic (Optimized out of React State to avoid re-render lag)
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [initialDrawLoaded, setInitialDrawLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = (index: number) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        const paddedIndex = index.toString().padStart(3, "0");
        img.src = `${IMAGES_PATH}frame_${paddedIndex}_delay-0.125s.webp`;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load frame ${index}`));
      });
    };

    const preloadImages = async () => {
      try {
        const firstFrame = await loadImage(0);
        if (!isMounted) return;
        imagesRef.current[0] = firstFrame;
        setInitialDrawLoaded(true);

        for (let i = 1; i <= 5; i++) {
          imagesRef.current[i] = await loadImage(i);
        }

        // Progressively load the rest into the Mutable Ref silently (no state updates!)
        const loadChildren = async (start: number, end: number) => {
          for (let i = start; i <= end; i++) {
            if (!isMounted) break;
            try {
              imagesRef.current[i] = await loadImage(i);
            } catch (e) {
              // Ignore missing
            }
          }
        };

        const batchSize = 10;
        for (let i = 6; i < FRAME_COUNT; i += batchSize) {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => {
              loadChildren(i, Math.min(i + batchSize - 1, FRAME_COUNT - 1));
            });
          } else {
            setTimeout(() => {
              loadChildren(i, Math.min(i + batchSize - 1, FRAME_COUNT - 1));
            }, 50);
          }
        }
      } catch (err) {
        console.error("Sequence Load Error", err);
        if (isMounted) setFallbackMode(true);
      }
    };

    preloadImages();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Wheel/Scroll Lock & State Machine Logic
  useEffect(() => {
    let lastWheelTime = 0;
    let hasTriggeredScroll = false;
    let touchStartY = 0;

    const advanceStep = (direction: number, preventFn: () => void) => {
      const now = Date.now();
      const step = stepRef.current;

      if (now - lastWheelTime < 1300) {
        if (step < STOPS.length - 1 || direction < 0) {
          preventFn();
        }
        return;
      }

      if (direction > 0) {
        if (step < STOPS.length - 1) {
          preventFn();
          stepRef.current = step + 1;
          targetFrame.set(STOPS[stepRef.current]);
          lastWheelTime = now;
        }
      } else if (direction < 0) {
        if (step > 0 && window.scrollY <= 10) {
          preventFn();
          stepRef.current = step - 1;
          targetFrame.set(STOPS[stepRef.current]);
          lastWheelTime = now;
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 10) return;
      if (!hasTriggeredScroll) {
        hasTriggeredScroll = true;
        window.dispatchEvent(new CustomEvent("first-scroll"));
      }
      advanceStep(e.deltaY, () => e.preventDefault());
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      if (!hasTriggeredScroll) {
        hasTriggeredScroll = true;
        window.dispatchEvent(new CustomEvent("first-scroll"));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 10) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (Math.abs(deltaY) > 30) {
        advanceStep(deltaY, () => {
          if (e.cancelable) e.preventDefault();
        });
        touchStartY = touchY;
      } else {
        if (stepRef.current < STOPS.length - 1) {
          if (e.cancelable) e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [targetFrame]);

  // 3. Canvas Drawing Logic
  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let imgIndex = Math.round(index);
    if (!imagesRef.current[imgIndex]) {
      while (imgIndex > 0 && !imagesRef.current[imgIndex]) imgIndex--;
    }

    const img = imagesRef.current[imgIndex] || imagesRef.current[0];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const canvasRatio = rect.width / rect.height;
    const imgRatio = img.width / img.height;

    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    } else {
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    // Draw centered, covering the canvas
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(smoothFrame, "change", (latest) => {
    requestAnimationFrame(() => drawImage(latest));
  });

  useEffect(() => {
    const handleResize = () => drawImage(smoothFrame.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (initialDrawLoaded) drawImage(smoothFrame.get());
  }, [initialDrawLoaded]);

  if (fallbackMode) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#000000]">
        <img
          src={`${IMAGES_PATH}frame_000_delay-0.125s.webp`}
          alt="iPhone 17"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[#000000] opacity-40 z-10" />
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: introOpacity, y: introY }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
            iPhone 17 Pro Max
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/60 font-medium">
            The power of titanium.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-[#000000] pointer-events-none">
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ width: "100%", height: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4 text-center"
        style={{ opacity: introOpacity, y: introY }}
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
          iPhone 17 Pro Max
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white/60 font-medium">
          The power of titanium.
        </p>
      </motion.div>

      {/* Dynamic Interactive Hotspots (No Box, Brand Colors) */}
      <Pointer opacity={opacity1} title="Titanium Frame" subtitle="Stronger. Lighter. Pro." top="40%" left="10%" color="#FFCC00" />
      <Pointer opacity={opacity2} title="Thin Bezels" subtitle="Our most expansive display." top="20%" right="15%" color="#FFCC00" />
      <Pointer opacity={opacity3} title="Action Button" subtitle="Customizable flow." bottom="45%" left="5%" color="#FFCC00" />
      <Pointer opacity={opacity4} title="A19 Pro Chip" subtitle="Unrivaled performance." bottom="30%" right="15%" color="#FFCC00" />
      <Pointer opacity={opacity5} title="Pro Camera" subtitle="48MP of pure detail." top="15%" right="10%" color="#FFCC00" />
      <Pointer opacity={opacity6} title="ProMotion" subtitle="Fluid 120Hz display." top="30%" left="15%" color="#FFCC00" />
      <Pointer opacity={opacity7} title="USB-C Speed" subtitle="Up to 40Gb/s transfer." bottom="10%" left="40%" color="#FFCC00" />
      <Pointer opacity={opacity8} title="Apple Intelligence" subtitle="The future of AI." bottom="15%" right="15%" color="#FFCC00" />

      {/* Dark vignette blending for luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/30 opacity-70 z-20" />
    </div>
  );
}

function Pointer({ opacity, title, subtitle, top, left, right, bottom, color }: { 
  opacity: MotionValue<number>, title: string, subtitle: string, top?: string, left?: string, right?: string, bottom?: string, color: string
}) {
  const [isHovered, setIsHovered] = useState(false);

  const pointerEvents = useTransform(opacity, (latest: number) => 
    latest > 0.1 ? "auto" : "none"
  );

  return (
    <motion.div
      style={{ opacity, top, left, right, bottom, pointerEvents }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute z-40 flex items-center gap-4 group cursor-pointer"
    >
      {/* Hotspot (Point Style) */}
      <div className="relative flex-shrink-0">
        <motion.div 
          animate={{ scale: isHovered ? 1.5 : 1 }}
          style={{ backgroundColor: color }}
          className="w-4 h-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
        />
        <motion.div 
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ backgroundColor: color }}
          className="absolute inset-0 rounded-full"
        />
      </div>

      {/* Related Text (No Box, Frameless) */}
      <motion.div 
        animate={{ x: isHovered ? 15 : 0, opacity: isHovered ? 1 : 0.8 }}
        className="flex flex-col drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
      >
        <span className="text-white text-2xl md:text-5xl font-extrabold tracking-tighter whitespace-nowrap leading-tight">
          {title}
        </span>
        <span 
          style={{ color }}
          className="text-lg md:text-2xl font-bold tracking-wide uppercase opacity-90 transition-all"
        >
          {subtitle}
        </span>
      </motion.div>
    </motion.div>
  );
}
