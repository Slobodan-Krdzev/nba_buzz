// components/HeroSection.tsx

"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ShopBy from "./ShopBy/ShopBy";
import SocialLinks from "./HeroAnimated/SocialLinks";

type FromDirection = "left" | "right" | "top";

const slogans: { text: string; from: FromDirection }[] = [
  { text: "Basketball Apparell.", from: "left" },
  { text: "Unmatched Style.", from: "right" },
  { text: "NBABUZZ.MK", from: "top" },
];

const HeroSection = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [shrinkToTop, setShrinkToTop] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setCurrentSlogan((prev) => {
        if (prev < slogans.length - 1) return prev + 1;
        clearInterval(sloganInterval);
        setTimeout(() => setShowSubtitle(true), 500);
        return prev;
      });
    }, 1500);
  }, []);

  useEffect(() => {
    if (showSubtitle) {
      setTimeout(() => {
        setShrinkToTop(true);
        setTimeout(() => {
          controls.start({ opacity: 1, y: 0 });
        }, 1000);
      }, 2000);
    }
  }, [showSubtitle]);

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
    <div className="shadow-xl h-[calc(120dvh-74px)] w-full relative bg-inherit text-titles flex flex-col items-center justify-center overflow-hidden px-4">
      <div
        className={`z-10 transition-all duration-1000 ease-in-out 
    ${
      shrinkToTop
        ? "scale-[0.7] translate-y-[-80vw] md:translate-y-[-45vw] lg:translate-y-[-20vw]"
        : "translate-y-[-10vh] md:translate-y-[-15vh] lg:translate-y-[-20vh]"
    }`}
      >
        <AnimatePresence mode="wait">
          <div className="relative inline-block">
            <motion.h1
              key={slogans[currentSlogan].text}
              initial={enterFrom[slogans[currentSlogan].from]}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-center text-accent relative z-10"
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
            className="text-xl md:text-2xl mt-3 lg:mt-6 text-center"
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
        {/* bg-[linear-gradient(to_right,_#f4791f,_#659999)] */}
        {/* bg-[linear-gradient(to_right,_#FFFFFF,_#FFEFBA)] LIGHT */}
        {/* bg-[linear-gradient(to_right,_#a2ab58,_#636363)] zelenkasta */}
        {/* bg-[linear-gradient(to_right,_#ef8e38,_#108dc7)] */}

        {/* TOP 3  */}

        {/* bg-[linear-gradient(to_right,_#ffd452,_#544a7d)] KAKO LAKERS top 3*/}
        {/* bg-[linear-gradient(to_right,_#DECBA4,_#3E5151)] TOP 3 */}
        {/* bg-[linear-gradient(to_right,_#605C3C,_#3C3B3F)] TOP 3 */}
        {/* bg-[linear-gradient(to_right,_#D3CBB8,_#6D6027)] */}

        <div
          className="h-[85vh]  bg-[linear-gradient(to_right,_#ffd452,_#544a7d)]
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
