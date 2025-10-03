"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedSlogansProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export default function AnimatedSlogans({ items, intervalMs = 2400, className = "" }: AnimatedSlogansProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items, intervalMs]);

  const current = items[index] ?? "";

  return (
    <div className={`relative h-[2.8rem] md:h-[3.5rem] flex items-center justify-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-8xl font-black tracking-tighter drop-shadow-lg"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}


