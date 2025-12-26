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
      img: "/common/jokerHeroNew.jpg",
      link: "/theJoker",
    },
    {
      id: 1,
      title: t("luka.title"),
      subtitle: t("luka.subtitle"),
      img: "/lukaSlider.jpg",
      link: "/luka",
    },
    {
      id: 2,
      title: t("antic.title"),
      subtitle: t("antic.subtitle"),
      img: "/anticeHeroFinal.JPG",
      link: "/antic",
    },
    {
      id: 3,
      title: t("meHim.title"),
      subtitle: t("meHim.subtitle"),
      img: "/meHim.jpg",
      link: "/meHim",
    },
  ];
}

const AUTOPLAY_DELAY = 2000; // ms
const SLIDE_TRANSITION = 200; // ms

const SwiperComp = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProgress, setActiveProgress] = useState(0);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
  const slides = useSlides();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
    setActiveProgress(0); // Reset instantly on slide change

    // Ensure progress stays at 0 during transition
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      setActiveProgress(0);
    }, SLIDE_TRANSITION);
  };

  return (
    <div className="relative w-full">
      {/* Single full-width progress bar under navbar (per slide) */}
      <div className="absolute top-1.5 left-0 right-0 z-[99998] pointer-events-none">
        <div className="w-full h-[6px] bg-white/30 overflow-hidden">
          <div
            className="h-full bg-[#EE7507] transition-[width] duration-100 ease-linear "
            style={{ width: `${Math.round(activeProgress * 100)}%` }}
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
        onAutoplayTimeLeft={(_, __, percentage) => {
          const p = Math.min(1, Math.max(0, 1 - (percentage ?? 0)));
          setActiveProgress(p);
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