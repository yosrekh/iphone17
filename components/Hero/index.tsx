import HeroCanvas from "./HeroCanvas";

/**
 * AQUANOVA PREMIUM SCROLLYTELLING HERO
 * 
 * Instructions:
 * 1. Your 195 frames are placed in public/images/
 * 2. It will now lock scrolling explicitly to play the sequences in 5 professional stages!
 */
export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-[#000000] overflow-hidden">
      <HeroCanvas />
    </section>
  );
}
