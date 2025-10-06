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
import { useTranslations } from "next-intl";

function useSlides(): HeroSlideItemType[] {
  const t = useTranslations("home.hero");
  return [
    {
      id: 0,
      title: t("joker.title"),
      subtitle: t("joker.subtitle"),
      img: "/common/heroSection3.png",
      link: "/theJoker",
    },
    {
      id: 1,
      title: t("luka.title"),
      subtitle: t("luka.subtitle"),
      img: "/common/heroSection.png",
      link: "/luka",
    },
    {
      id: 2,
      title: t("antic.title"),
      subtitle: t("antic.subtitle"),
      img: "/common/heroSection2.jpg",
      link: "/antic",
    },
  ];
}

const AUTOPLAY_DELAY = 6000; // ms
const SLIDE_TRANSITION = 200; // ms

const SwiperComp = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
  const slides = useSlides();

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
        {slides.map((s, idx) => (
          <SwiperSlide key={s.id}>
            <SwiperItem slide={s} isActive={idx === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComp;