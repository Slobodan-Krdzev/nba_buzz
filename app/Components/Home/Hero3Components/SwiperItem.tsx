"use client";
import { HeroSlideItemType } from "@/app/Types/Types";
import { motion } from "motion/react";

interface SwiperItemProps {
  slide: HeroSlideItemType;
  isActive: boolean
}

const SwiperItem = ({ slide, isActive }: SwiperItemProps) => {


  return (
      <section style={{
        backgroundImage: `url(${slide.img})`
      }} className={` bg-cover min-h-[50dvh] sm:min-h-[70dvh] bg-center lg:min-h-[100dvh] w-full`}>
        <div className="w-full  min-h-[50dvh] sm:min-h-[70dvh] lg:min-h-[100dvh] bg-black/55 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-[95%] md:w-[70%] lg:w-[50%]">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-3 lg:mb-6 text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white tracking-tighter relative z-10 w-[80%]"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-center text-xs md:text-sm lg:text-xl w-[80%] lg:w-[70%] font-semibold tracking-tighter"
            >
              {slide.subtitle}
            </motion.p>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              href={"/products"}
              className="rounded mt-3 lg:mt-6 block w-[40%] lg:w-[20%] text-center font-bold tracking-tighter bg-[linear-gradient(to_right,_#ffd452,_#544a7d)]
             bg-[length:200%_200%]
             animate-gradientMove text-white hover:text-titles py-2 px-6 hover:bg-accentLight transition text-sm lg:text-xl"
            >
              Details
            </motion.a>
          </div>
        </div>
      </section>
  );
};

export default SwiperItem;
