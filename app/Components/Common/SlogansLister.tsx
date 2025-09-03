"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  interval?: number; // default 2000ms
  className?: string; // optional styling
}

export function RotatingText({ texts, interval = 2000, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className={` ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
           className="
            text-6xl lg:text-8xl text-center font-bold tracking-tighter text-[#f7f5ea] uppercase
            drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]
            drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]
          "
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
