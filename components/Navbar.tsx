"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Background Music State
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Background Music state tracking
  const audioStarted = useRef(false);

  // Autoplay music softly on the first user interaction (scroll, click, touch)
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const startAudio = (e?: any) => {
      if (audioStarted.current) return;

      // If triggered by a real user interaction, start the track
      audio.volume = 0.1;
      audio.play().then(() => {
        setIsPlaying(true);
        audioStarted.current = true;
      }).catch((e) => {
        console.log("Audio play blocked by browser. Retrying on interaction.");
      });

      // Remove triggers
      window.removeEventListener("first-scroll", startAudio);
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };

    // Listen for the custom event from HeroCanvas + standard triggers
    window.addEventListener("first-scroll", startAudio);
    window.addEventListener("click", startAudio);
    window.addEventListener("touchstart", startAudio);

    // Initial silent attempt
    startAudio();

    // Handle visibility change (pause on tab switch/minimize)
    const handleVisibility = () => {
      if (!audioRef.current) return;
      const audio = audioRef.current;
      if (!audio.paused && document.hidden) {
        audio.pause();
        setIsPlaying(false);
      } else if (audioStarted.current && !document.hidden) {
        audio.play().then(() => setIsPlaying(true)).catch(() => { });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("first-scroll", startAudio);
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the window-level 'startAudio' from firing
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioStarted.current = false; // Prevent auto-resume if manually paused
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        audioStarted.current = true;
      }).catch(() => { });
    }
  };

  return (
    <>
      <audio ref={audioRef} loop={true} preload="auto" src="/background_music/m.mp3" />

      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${inter.className}`}>
        <motion.header
          className={`w-full pointer-events-auto flex items-center justify-between transition-all duration-500 border-b ${scrolled
            ? "bg-black/70 backdrop-blur-xl border-white/5 shadow-sm px-6 py-3"
            : "bg-transparent border-transparent px-6 py-4"
            }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="flex items-center gap-2 group focus:outline-none">
            <span className="text-[21px] font-semibold tracking-tight text-white mb-0">
              IPHONE 17 PRO MAX
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[12px] font-medium tracking-wide text-white/80">
            <a href="#modes" className="hover:text-white transition-colors">Design</a>
            <a href="#specs" className="hover:text-white transition-colors">A19 Pro Chip</a>
            <a href="#camera" className="hover:text-white transition-colors">Camera</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleMusic}
              className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50 ${isPlaying
                ? "text-[#FF8A00]"
                : "text-white/60 hover:text-white"
                }`}
              aria-label={isPlaying ? "Pause background music" : "Play background music"}
              title="Ambient Music"
            >
              {isPlaying ? (
                // Animated sound bars (Lucide style)
                <motion.svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <motion.rect x="4" y="8" width="4" height="8" rx="1"
                    animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} />
                  <motion.rect x="12" y="4" width="4" height="16" rx="1"
                    animate={{ height: [16, 8, 16] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }} />
                  <motion.rect x="20" y="8" width="4" height="8" rx="1"
                    animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }} />
                </motion.svg>
              ) : (
                // Music Note Icon
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              )}
            </button>

            <a
              href="#buy"
              className="hidden sm:inline-block px-4 py-1.5 rounded-full text-[12px] font-medium bg-white text-black hover:bg-gray-200 transition-colors focus:outline-none"
              role="button"
              tabIndex={0}
            >
              Buy
            </a>
          </div>
        </motion.header>
      </div>
    </>
  );
}
