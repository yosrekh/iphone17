"use client";

import { motion } from "framer-motion";

const specs = [
  { label: "Finish", value: "Black Titanium, White Titanium, Blue Titanium, Natural Titanium" },
  { label: "Capacity", value: "256GB, 512GB, 1TB" },
  { label: "Display", value: "6.7-inch Super Retina XDR display with ProMotion" },
  { label: "Chip", value: "A19 Pro chip, 6‑core CPU, 6‑core GPU, 16‑core Neural Engine" },
  { label: "Camera", value: "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP 5x Telephoto" },
  { label: "Video", value: "4K video recording at 24 fps, 25 fps, 30 fps, or 60 fps" },
  { label: "Power", value: "MagSafe wireless charging up to 15W, Fast-charge capable" },
];

export default function SpecsGrid() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technical Specifications
        </motion.h2>
        
        <div className="space-y-0">
          {specs.map((spec, index) => (
            <motion.div 
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 py-10 border-t border-white/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-white font-semibold text-lg mb-2 md:mb-0">
                {spec.label}
              </div>
              <div className="md:col-span-2 text-white/60 text-lg leading-relaxed">
                {spec.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
