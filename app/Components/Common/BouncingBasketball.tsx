"use client";
import { motion } from "framer-motion";

interface BouncingBasketballProps {
  className?: string;
  size?: number; // px
}

export default function BouncingBasketball({ className = "", size = 36 }: BouncingBasketballProps) {
  return (
    <div className={`pointer-events-none absolute z-20 bottom-6 left-1/2 -translate-x-1/2 ${className}`}>
      <motion.div
        initial={{ y: 0, scaleX: 1, scaleY: 1 }}
        animate={{ y: [0, -14, 0], scaleX: [1.06, 1, 1.06], scaleY: [0.9, 1, 0.9] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
        className="drop-shadow-lg"
        style={{ transformOrigin: "center bottom" }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d="M2 32h60" stroke="#ffffff" strokeWidth="3" />
          <path d="M32 2v60" stroke="#ffffff" strokeWidth="3" />
          <path d="M12 12c12 10 28 10 40 0" stroke="#ffffff" strokeWidth="3" fill="none" />
          <path d="M12 52c12-10 28-10 40 0" stroke="#ffffff" strokeWidth="3" fill="none" />
        </svg>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0.8, opacity: 0.25 }}
        animate={{ scaleX: [1.1, 0.6, 1.1], opacity: [0.35, 0.15, 0.35] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
        style={{
          width: size * 0.9,
          height: Math.max(4, Math.round(size * 0.18)),
          borderRadius: 9999,
          border: "1px solid rgba(255,255,255,0.5)",
          margin: "6px auto 0",
          backgroundColor: 'white'
        }}
      />
    </div>
  );
}


