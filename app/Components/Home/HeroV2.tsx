"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ShopBy from "./ShopBy/ShopBy";
import SocialLinks from "./HeroAnimated/SocialLinks";

type FromDirection = "left" | "right" | "top";

export const slogans: { text: string; from: FromDirection }[] = [
  { text: "Basketball Apparell.", from: "left" },
  { text: "Unmatched Style.", from: "right" },
  { text: "NBABUZZ.MK", from: "top" },
];

const HeroSection = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [shrinkToTop, setShrinkToTop] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Check if animation has already played this session
    const hasPlayed = sessionStorage.getItem("heroAnimationPlayed");

    if (!hasPlayed) {
      setPlayAnimation(true);
      sessionStorage.setItem("heroAnimationPlayed", "true");
    } else {
      // Skip straight to final state
      setCurrentSlogan(slogans.length - 1);
      setShowSubtitle(true);
      setShrinkToTop(true);
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls]);

  useEffect(() => {
    if (!playAnimation) return;

    const sloganInterval = setInterval(() => {
      setCurrentSlogan((prev) => {
        if (prev < slogans.length - 1) return prev + 1;
        clearInterval(sloganInterval);
        setTimeout(() => setShowSubtitle(true), 500);
        return prev;
      });
    }, 1500);

    return () => clearInterval(sloganInterval);
  }, [playAnimation]);

  useEffect(() => {
    if (playAnimation && showSubtitle) {
      setTimeout(() => {
        setShrinkToTop(true);
        setTimeout(() => {
          controls.start({ opacity: 1, y: 0 });
        }, 1000);
      }, 2000);
    }
  }, [playAnimation, showSubtitle, controls]);

  const enterFrom = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    top: { y: -100, opacity: 0 },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <div className="shadow-xl h-[calc(120dvh)] w-full relative bg-inherit text-titles flex flex-col items-center justify-center overflow-hidden px-4">
      <div
        className={`z-[99] transition-all duration-1000 ease-in-out 
    ${
      shrinkToTop
        ? "scale-[0.7] translate-y-[-40vh] md:translate-y-[-45vw] lg:translate-y-[-22.5vw]"
        : "translate-y-[-10vh] md:translate-y-[-15vh] lg:translate-y-[-20vh]"
    }`}
      >
        <AnimatePresence mode="wait">
          <div className="relative inline-block">
            <motion.h1
              key={slogans[currentSlogan].text}
              initial={playAnimation ? enterFrom[slogans[currentSlogan].from] : { opacity: 1 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-bold text-center text-accent relative z-10"
            >
              {slogans[currentSlogan].text}
            </motion.h1>
            <span
              aria-hidden
              className="absolute inset-0 text-5xl md:text-7xl font-bold text-accentLight blur-[8px] opacity-90 animate-pulse"
            >
              {slogans[currentSlogan].text}
            </span>
          </div>
        </AnimatePresence>

        {showSubtitle && (
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
            transition={{ duration: 1.2 }}
            className="text-xl md:text-2xl mt-2 text-center"
          >
            For those who want to stand out.
          </motion.h2>
        )}
      </div>

      {/* Bottom Section */}
      <motion.div
        className="w-full absolute bottom-0 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        <div
          className="h-[95dvh] bg-[linear-gradient(to_right,_#ffd452,_#544a7d)]
             bg-[length:200%_200%]
             animate-gradientMove flex items-center justify-center "
        >
          <ShopBy />
          <SocialLinks />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
