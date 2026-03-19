"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface InfoSectionProps {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

export default function InfoSection({ 
  id, subtitle, title, description, imageSrc, reverse = false 
}: InfoSectionProps) {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const opacity = useTransform(scrollYProgress, (latest) => (latest > 0.05 ? 1 : 0));

  return (
    <section 
      id={id}
      className={`relative min-h-screen py-24 flex items-center justify-center overflow-hidden bg-black text-white ${reverse ? 'bg-[#050505]' : 'bg-black'}`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
          
          {/* Image Column */}
          <div className="flex-1 w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={imageSrc}
                alt={title}
                width={800}
                height={800}
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                priority={false}
              />
            </motion.div>
          </div>

          {/* Text Column */}
          <div className="flex-1 flex flex-col items-start gap-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#999999] text-sm md:text-md uppercase font-bold tracking-[0.2em]"
            >
              {subtitle}
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight"
            >
              {title}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-[#999999] max-w-lg leading-relaxed mt-4 font-medium"
            >
              {description}
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
