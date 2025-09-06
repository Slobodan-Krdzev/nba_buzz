"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { HeroSlideItemType } from "@/app/Types/Types";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
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
    title: "Luka goes to Holywood Collection",
    subtitle:
      "Discover The Wonderboy Collection — NBA T-shirts and Hoodies with Exclusive Designs Inspired by Luka Dončić",
    img: "/common/heroSection2.jpg",
    link: "/products",
  },
];

const SwiperComp = () => {

 const [activeIndex, setActiveIndex] = useState(0);

// const handleAutoplayTimeLeft = (
//     progress: number
//   ): number => {
    // Update visual progress bar
    // if (progressRef.current) {
    //   progressRef.current.style.transform = `scaleX(${1 - progress})`;
    // }

    // // Calculate percentage based on time left vs autoplay delay
    // const percentage = Math.round(((AUTOPLAY_DELAY - timeLeft) / AUTOPLAY_DELAY) * 100);
    // setProgressPercentage(percentage);

    //   const percentage = Math.round((1 - progress) * 100);
//   console.log(`${percentage}%`)

//      return percentage
//   };


  return (
  
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={false}
      
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    //   onAutoplayTimeLeft={handleAutoplayTimeLeft}
    >
      {swiperSlides.map((s, idx )=> <SwiperSlide key={s.id}><SwiperItem  slide={s} isActive={idx === activeIndex }/></SwiperSlide>)}
    </Swiper>
  );
};

export default SwiperComp;
