"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section id="buy" className="min-h-screen flex items-center justify-center bg-black px-6 py-24">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <motion.h2 
          className="text-6xl md:text-8xl font-bold text-white tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Titanium. Strong. <br/> <span className="text-white/40">Light. Pro.</span>
        </motion.h2>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button className="px-10 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 shadow-xl hover:shadow-white/10">
            Buy Now
          </button>
          <a 
            href="/specs" 
            className="px-10 py-4 bg-transparent text-white text-lg font-semibold rounded-full border border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
          >
            Learn More
          </a>
        </motion.div>
        
        <motion.p 
          className="text-white/40 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Available starting at $999. Special trade-in offers available.
        </motion.p>
      </div>
    </section>
  );
}
