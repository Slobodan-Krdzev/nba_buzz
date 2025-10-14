"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type InitialLoaderProps = {
  minimumMs?: number;
};

export default function InitialLoader({ minimumMs = 2200 }: InitialLoaderProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("__nbabuzz_seen_loader");
      if (!hasSeen) {
        setVisible(true);
        const start = Date.now();
        const onReady = () => {
          const elapsed = Date.now() - start;
          const remaining = Math.max(0, minimumMs - elapsed);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              setVisible(false);
              sessionStorage.setItem("__nbabuzz_seen_loader", "1");
            }, 350);
          }, remaining);
        };
        if (document.readyState === "complete") onReady();
        else window.addEventListener("load", onReady, { once: true });
        return () => window.removeEventListener("load", onReady);
      }
    } catch {
      // Non-blocking: if sessionStorage is unavailable, fail silently
    }
  }, [minimumMs]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[100000] grid place-items-center bg-white transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center">
        <div className="relative w-24 h-24">
          <Image src="/logo.png" alt="Loading" fill sizes="96px" className="object-contain" />
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-black tracking-tighter text-titles">TROJKA.mk</h1>
        <p className="text-sm md:text-base text-gray-600">Clothing for ballers</p>
      </div>
    </div>
  );
}


