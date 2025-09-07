"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { HeroSlideItemType } from "@/app/Types/Types";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import SwiperItem from "./SwiperItem";

const swiperSlides: HeroSlideItemType[] = [
  {
    id: 0,
    title: "The Joker Collection",
    subtitle:
      "Discover The Joker Collection — T-shirts and Hoodies with Exclusive Designs Inspired by Nikola Jokić.",
    img: "/common/heroSection3.png",
    link: "/products",
  },
  {
    id: 1,
    title: "Luka goes to Hollywood Collection",
    subtitle:
      "Discover The Wonderboy Collection — NBA T-shirts and Hoodies with Exclusive Designs Inspired by Luka Dončić",
    img: "/common/heroSection2.jpg",
    link: "/products",
  },
];

const AUTOPLAY_DELAY = 6000; // ms
const SLIDE_TRANSITION = 200; // ms

const SwiperComp = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
    setProgress(0); // Reset instantly on slide change

    // Ensure progress stays at 0 during transition
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      setProgress(0);
    }, SLIDE_TRANSITION);
  };

  return (
    <div className="relative w-full">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="w-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-[#c39f3f] transition-[width] duration-75 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <Swiper
        centeredSlides
        autoplay={{
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
        }}
        speed={SLIDE_TRANSITION}
        pagination={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
        onAutoplayTimeLeft={(_, timeLeft) => {
          // Only start progress after transition is done
          if (timeLeft > AUTOPLAY_DELAY - SLIDE_TRANSITION) {
            setProgress(0);
            return;
          }
          const corrected =
            Math.min(
              1,
              Math.max(0, 1 - (timeLeft - SLIDE_TRANSITION) / AUTOPLAY_DELAY)
            );
          setProgress(corrected);
        }}
      >
        {swiperSlides.map((s, idx) => (
          <SwiperSlide key={s.id}>
            <SwiperItem slide={s} isActive={idx === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComp;